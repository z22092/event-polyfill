declare const window: typeof globalThis;
declare const self: typeof globalThis;
declare const global: typeof globalThis;

export let Global: typeof globalThis;

if (typeof globalThis !== 'undefined') {
  Global = globalThis;
}

if (typeof window !== 'undefined') {
  Global = window;
}

if (typeof self !== 'undefined') {
  Global = self;
}

if (typeof global !== 'undefined') {
  Global = global;
}

