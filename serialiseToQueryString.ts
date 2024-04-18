import serialiseToUrlEncoded, {
  UrlEncodedParams,
} from "./serialiseToUrlEncoded";

export default (params: UrlEncodedParams) => {
  const encoded = serialiseToUrlEncoded(params);
  return encoded && `?${encoded}`;
};
