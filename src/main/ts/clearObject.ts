export default (obj: object) => {
  for (const key of Object.keys(obj)) {
    delete obj[key];
  }
}
