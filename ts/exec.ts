import { spawn } from "child_process";
import { writeFile } from "fs/promises";
import { PassThrough, pipeline, Readable } from "stream";
import ExecError from "./ExecError";
import isReadable from "./isReadable";

type TextEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2";

type Exec<Encoding extends string | Buffer> = {
  additionalEnv(entries: Map<string, string | number>): Exec<Encoding>;
  additionalEnv(entries: { [name: string]: string | number }): Exec<Encoding>;
  env(name: string, value: string | number): Exec<Encoding>;
  killOnStderr(shouldKill?: boolean | NodeJS.Signals): Exec<Encoding>;
  onStderr(onData: (chunk: Encoding) => void): Exec<Encoding>;
  onStdout(onData: (chunk: Encoding) => void): Exec<Encoding>;
  pidFile(path: string): Exec<Encoding>;
  print(shouldPrintStdoutOrStderr: false): Exec<Encoding>;
  print(shouldPrintStdout: boolean, shouldPrintStderr: boolean): Exec<Encoding>;
  printStderr(shouldPrint?: boolean): Exec<Encoding>;
  printStdout(shouldPrint?: boolean): Exec<Encoding>;
  stdin(data: ArrayBuffer | Readable | string | Uint8Array): Exec<Encoding>;
  text(encoding?: TextEncoding): Exec<string>;
  throwOnBadStatus(shouldThrow?: boolean): Exec<Encoding>;
  timeout(ms: number): Exec<Encoding>;
  workingDir(dir: string): Exec<Encoding>;

  output(withStderr?: boolean): Promise<Encoding>;
  status(): Promise<number>;
  stream(withStderr?: boolean): Promise<number> & Readable;
};

export default (cmd: string, ...args: (string | number)[]): Exec<Buffer> => {
  const env: { [name: string]: string } = Object.create(null);
  Object.assign(env, process.env);
  let cwd: string | undefined;
  let encoding: TextEncoding | undefined;
  let killOnStderr: NodeJS.Signals | undefined;
  let onStderr: Function | undefined;
  let onStdout: Function | undefined;
  let pidFile: string | undefined;
  // print* are undefined by default to allow adaptive implicit config
  // depending on run method and onStd*.
  let printStderr: boolean | undefined;
  let printStdout: boolean | undefined;
  let stdin: ArrayBuffer | Readable | number | string | Uint8Array | undefined;
  // This is ignored if result type is status.
  let throwOnBadStatus = true;
  let timeout: number | undefined;

  const run = (
    resultType: "status" | "data" | "stream",
    resultStderr: boolean
  ) => {
    const proc = spawn(cmd, args.map(String), {
      cwd,
      env,
      stdio: "pipe",
      timeout,
    });
    if (pidFile !== undefined) {
      // Attempt to write to file, but don't care if it fails.
      writeFile(pidFile, proc.pid.toString()).catch(() => void 0);
    }
    if (encoding != undefined) {
      proc.stdout.setEncoding(encoding);
      proc.stderr.setEncoding(encoding);
    }
    const resultStream = resultType == "stream" ? new PassThrough() : undefined;
    const promise = new Promise((resolve, reject) => {
      if (stdin != undefined) {
        if (isReadable(stdin)) {
          pipeline(stdin, proc.stdin, (err) => {
            if (err) {
              // TODO Is any additional cleanup needed?
              reject(err);
            }
          });
        } else {
          proc.stdin.write(stdin);
          proc.stdin.end();
        }
      } else {
        proc.stdin.end();
      }

      const resultData = resultType == "data" ? Array<any>() : undefined;
      proc.stderr.on("data", (chunk) => {
        if (printStderr) {
          process.stderr.write(chunk);
        }
        onStderr?.(chunk);
        if (killOnStderr != undefined) {
          proc.kill(killOnStderr);
        }
        if (resultStderr) {
          resultStream?.write(chunk);
          resultData?.push(chunk);
        }
      });
      proc.stdout.on("data", (chunk) => {
        if (printStdout) {
          process.stdout.write(chunk);
        }
        onStdout?.(chunk);
        resultStream?.write(chunk);
        resultData?.push(chunk);
      });

      proc.on("error", reject);
      proc.on("exit", (code, signal) => {
        resultStream?.end();
        if (resultType != "status" && throwOnBadStatus && (code || signal)) {
          reject(new ExecError(code ?? undefined, signal ?? undefined));
        } else {
          if (resultData) {
            resolve(encoding ? resultData.join("") : Buffer.concat(resultData));
          } else {
            resolve(code ?? -1);
          }
        }
      });
    });
    if (resultStream) {
      return Object.assign(resultStream, {
        then: Promise.prototype.then.bind(promise),
        catch: Promise.prototype.catch.bind(promise),
        finally: Promise.prototype.finally.bind(promise),
      }) as any;
    }
    return promise as any;
  };

  return {
    additionalEnv(entries) {
      for (const [k, v] of entries instanceof Map
        ? entries
        : Object.entries(entries)) {
        env[k] = v.toString();
      }
      return this;
    },
    env(name, value) {
      env[name] = value.toString();
      return this;
    },
    killOnStderr(signal = "SIGTERM") {
      killOnStderr =
        signal === false ? undefined : signal === true ? "SIGTERM" : signal;
      return this;
    },
    onStderr(onData) {
      onStderr = onData;
      printStderr ??= false;
      return this;
    },
    onStdout(onData) {
      onStdout = onData;
      printStdout ??= false;
      return this;
    },
    pidFile(path) {
      pidFile = path;
      return this;
    },
    print() {
      if (arguments.length == 1) {
        printStdout = printStderr = false;
      } else {
        [printStdout, printStderr] = arguments;
      }
      return this;
    },
    printStderr(shouldPrint = true) {
      printStderr = shouldPrint;
      return this;
    },
    printStdout(shouldPrint = true) {
      printStdout = shouldPrint;
      return this;
    },
    stdin(data) {
      stdin = data;
      return this;
    },
    text(e = "utf-8") {
      encoding = e;
      return this as any;
    },
    throwOnBadStatus(shouldThrow = true) {
      throwOnBadStatus = shouldThrow;
      return this;
    },
    timeout(ms) {
      timeout = ms;
      return this;
    },
    workingDir(dir) {
      cwd = dir;
      return this;
    },

    output(withStderr = false) {
      printStdout ??= false;
      printStderr ??= !withStderr;
      return run("data", withStderr);
    },
    status() {
      printStdout ??= true;
      printStderr ??= true;
      return run("status", false);
    },
    stream(withStderr = false) {
      printStdout ??= false;
      printStderr ??= !withStderr;
      return run("stream", withStderr);
    },
  };
};
