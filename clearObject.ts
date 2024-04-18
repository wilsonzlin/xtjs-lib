export default (obj: any) => {
  for (const key of Object.keys(obj)) {
    delete obj[key];
  }
};
