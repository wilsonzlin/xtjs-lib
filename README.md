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
