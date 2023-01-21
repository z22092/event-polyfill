declare const window: unknown;
declare const self: unknown;
declare const global: unknown;

function defineGlobal(): typeof globalThis {
  if (typeof global !== 'undefined') {
    return global as typeof globalThis;
  }
  if (typeof window !== 'undefined') {
    return window as typeof globalThis;
  }

  if (typeof self !== 'undefined') {
    return self as typeof globalThis;
  }

  throw new Error('Unable to define global variable');
}

export const Global = defineGlobal();
