export default function* <T> (length: number, producer: () => T) {
  for (let i = 0; i < length; i++) {
    yield producer();
  }
}
