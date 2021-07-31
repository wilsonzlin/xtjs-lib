import { spawn } from "child_process";
import { writeFile } from "fs/promises";
import { PassThrough, pipeline, Readable } from "stream";
import ExecError from "./ExecError";
import isReadable from "./isReadable";

type TextEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2";

type Exec<Encoding extends string | Buffer> = {
  additionalEnv(entries: Map<string, string | number>): Exec<Encoding>;
  additionalEnv(entries: { [name: string]: string | number }): Exec<Encoding>;
  binary(): Exec<Buffer>;
  env(name: string, value: string | number): Exec<Encoding>;
  killOnStderr(shouldKill?: boolean | NodeJS.Signals): Exec<Encoding>;
  onStderr(onData: (chunk: Encoding) => void): Exec<Encoding>;
  onStdout(onData: (chunk: Encoding) => void): Exec<Encoding>;
  pidFile(path: string): Exec<Encoding>;
  print(shouldPrintStdoutOrStderr: false): Exec<Encoding>;
  print(shouldPrintStdout: boolean, shouldPrintStderr: boolean): Exec<Encoding>;
  printCmdline(shouldPrintCmdline?: boolean): Exec<Encoding>;
  printStderr(shouldPrint?: boolean): Exec<Encoding>;
  printStdout(shouldPrint?: boolean): Exec<Encoding>;
  stdin(data: ArrayBuffer | Readable | string | Uint8Array): Exec<Encoding>;
  text(encoding?: TextEncoding): Exec<string>;
  throwOnBadStatus(shouldThrow?: boolean): Exec<Encoding>;
  throwOnSignal(shouldThrow?: boolean): Exec<Encoding>;
  timeout(ms: number): Exec<Encoding>;
  workingDir(dir: string): Exec<Encoding>;

  output(withStderr?: boolean): Promise<Encoding>;
  run(): Promise<void>;
  status(): Promise<number>;
  stream(withStderr?: boolean): { promise: Promise<number>; stream: Readable };
};

export default (cmd: string, ...args: (string | number)[]): Exec<string> => {
  const env: { [name: string]: string } = Object.create(null);
  Object.assign(env, process.env);
  let cwd: string | undefined;
  let encoding: TextEncoding | undefined = "utf8";
  let killOnStderr: NodeJS.Signals | undefined;
  let onStderr: Function | undefined;
  let onStdout: Function | undefined;
  let pidFile: string | undefined;
  let printCmdline = false;
  // printStd* are undefined by default to allow adaptive implicit config
  // depending on run method and onStd*.
  let printStderr: boolean | undefined;
  let printStdout: boolean | undefined;
  let stdin: ArrayBuffer | Readable | number | string | Uint8Array | undefined;
  // This is ignored if result type is status.
  let throwOnBadStatus = true;
  let throwOnSignal = true;
  let timeout: number | undefined;

  const run = (
    resultType: "none" | "status" | "data" | "stream",
    resultStderr: boolean
  ) => {
    if (printCmdline) {
      console.debug("+", ...args);
    }
    const proc = spawn(cmd, args.map(String), {
      cwd,
      env,
      stdio: "pipe",
      timeout,
    });
    proc.once("spawn", () => {
      if (pidFile != undefined && proc.pid !== undefined) {
        // Attempt to write to file, but don't care if it fails.
        writeFile(pidFile, proc.pid.toString()).catch(() => void 0);
      }
    });
    if (encoding != undefined) {
      proc.stdout.setEncoding(encoding);
      proc.stderr.setEncoding(encoding);
    }
    const resultStream = resultType == "stream" ? new PassThrough() : undefined;
    const promise = new Promise((resolve, reject) => {
      if (isReadable(stdin)) {
        pipeline(stdin, proc.stdin, (err) => {
          if (err) {
            // TODO Is any additional cleanup needed?
            reject(err);
          }
        });
      } else {
        if (stdin) {
          proc.stdin.write(stdin);
        }
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
      // WARNING: Listen to "close", not "exit". "exit" can be emitted before
      // stdio streams are closed, causing hard-to-debug race conditions where
      // stdout/stderr data is missing.
      proc.on("close", (code, signal) => {
        resultStream?.end();
        if (throwOnSignal && signal) {
          reject(new ExecError(cmd, code ?? undefined, signal));
        } else if (resultType != "status" && throwOnBadStatus && code) {
          reject(new ExecError(cmd, code, signal ?? undefined));
        } else if (resultData) {
          resolve(encoding ? resultData.join("") : Buffer.concat(resultData));
        } else {
          resolve(resultType != "none" ? code ?? -1 : undefined);
        }
      });
    });
    if (resultStream) {
      return {
        stream: resultStream,
        promise,
      };
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
    binary() {
      encoding = undefined;
      return this as any;
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
    printCmdline(shouldPrintCmdline = true) {
      printCmdline = shouldPrintCmdline;
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
    throwOnSignal(shouldThrow = true) {
      throwOnSignal = shouldThrow;
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
    run() {
      printStdout ??= true;
      printStderr ??= true;
      return run("none", false);
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
