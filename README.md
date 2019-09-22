# crng

Generate random values from a cryptographicaly-secure random number generator in Node.js. Uses the `crypto` module.

## Generators

### `cryptoRandom01`

Generate a value between 0 (inclusive) and 1 (exclusive).

```typescript
import {cryptoRandom01} from "crng";
// const {cryptoRandom01} = require("crng");

let val: number = cryptoRandom01();
```

### `cryptoRandomDouble`

Generate a number that is not infinite and not `NaN`.

```typescript
import {cryptoRandomDouble} from "crng";
// const {cryptoRandomDouble} = require("crng");

let val: number = cryptoRandomDouble();
```

### `cryptoRandomHex`

Generate a string containing hexadecimal characters with `n` bytes of entropy (defaults to `8`).

Note that the length of the resulting value is double the entropy amount.

```typescript
import {cryptoRandomHex} from "crng";
// const {cryptoRandomHex} = require("crng");

let val: string = cryptoRandomHex(8);
console.assert(val.length === 16);
```

# OrdMap

Map data structure that remembers the order keys/values are set. Allows for easy access of first and last keys/values and iteration in order of insertion. Comes with type declarations for TypeScript and extends native Map class.

## npm

```bash
npm i --save ord-map
```

## yarn

```bash
yarn add ord-map
```

## Usage

```typescript
import {OrdMap} from "ord-map";

const map = new OrdMap();

// The order of keys set are remembered
map.set("b", 3);
map.set("_", 0.1);
map.set("a", 1);
console.assert(map.firstKey === "b");
console.assert(map.firstValue === 3);
console.assert(map.lastKey === "a");
console.assert(map.lastValue === 1);

// Supports any key and value that built-in map supports
map.set(true, Number);

// Setting existing keys will not change their position
map.set("b", 4);
console.assert(map.firstKey === "b");

// Iterating will iterate values in the order they were set
for (const [key, value] of map.entries()) {
  console.log(key, value);
}
```

For full API reference, see [OrdMap.ts](src/main/ts/OrdMap.ts).

## Testing

Run `npm run test`.

## Building

Run `npm run build`. The built files will be in `dist`.
