# OrderedMap

Map data structure that remembers the order keys/values are set. Allows for easy access of first and last keys/values and iteration in order of insertion. Comes with type declarations for TypeScript and extends native Map class.

## npm

```bash
npm i --save ordered-map
```

## yarn

```bash
yarn add ordered-map
```

## Usage

```typescript
import {OrderedMap} from "ordered-map";

const map = new OrderedMap();

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

For full API reference, see [OrderedMap.ts](src/main/ts/OrderedMap.ts).

## Testing

Run `npm run test`.

## Building

Run `npm run build`. The built files will be in `dist`.
