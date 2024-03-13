export async function tryToCatch<T>(
  fn: (...args: T[]) => Promise<T>,
  ...args: T[]
) {
  try {
    return [null, await fn(...args)];
  } catch (err) {
    return [err, null];
  }
}
