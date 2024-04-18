export default (
  { width, height }: { width: number; height: number },
  container: number
) => ({
  height:
    height >= width ? container : Math.floor(container * (width / height)),
  width: height <= width ? container : Math.floor(container * (height / width)),
});
