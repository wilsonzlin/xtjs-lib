type ConditionalClasses = {
  [className: string]: boolean
};

export default (...classes: (ConditionalClasses | string | string[] | false | null | undefined)[]) => {
  const classNames: string[] = [];
  for (const unit of classes) {
    if (typeof unit == 'string') {
      classNames.push(unit);
    } else if (Array.isArray(unit)) {
      classNames.push(...unit);
    } else if (unit === false || unit == undefined) {
      // Do nothing
    } else {
      for (const className of Object.keys(unit)) {
        if (unit[className]) {
          classNames.push(className);
        }
      }
    }
  }
  return classNames.join(' ');
};
