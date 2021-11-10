import { requestCachingDecorator } from ".";
import { TRequest } from "../types";

export const request: TRequest = async (url) => {
  const result = await fetch(url);
  const json = result.json();

  return json;
};

const cachedRequest = requestCachingDecorator(request);

export default cachedRequest;
