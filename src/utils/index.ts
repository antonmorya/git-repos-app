export function requestCachingDecorator(requestFunc: Function) {
  let cache = new Map();

  return async function (url: string) {
    if (cache.has(url)) {
      return cache.get(url);
    }

    let result = await requestFunc(url);

    cache.set(url, result);

    return result;
  };
}

export const isEmpty = (obj: any) =>
  [Object, Array].includes((obj || {}).constructor) &&
  !Object.entries(obj || {}).length;
