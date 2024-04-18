import filterValue from "./filterValue";

export default (v: any) => filterValue(new Date(v), (v) => !isNaN(v.getTime()));
