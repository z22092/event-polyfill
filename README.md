# @z22092/event-polyfill
---

This library is a polyfill for the Event class for older browsers that do not have native support. This allows your code to continue working on older browsers without having to change your code or use different code paths.

## Installation

To install this library, you can use npm or yarn package managers.

```sh
npm install @z22092/event-polyfill
```

```sh
yarn add @z22092/event-polyfill
```

## Usage

Importing the library at the beginning of your code is all you need to do to start using the polyfill.

```typescript
import '@z22092/event-polyfill';
```

This polyfill is designed to work as a drop-in replacement for the native Event class, so you can use it just like you would use the native Event class.
Please note that it is always recommended to test your code on different browsers and versions to ensure that it works as expected, as polyfills may have some limitations compared to the native implementation.

## Documentation

For more information, please visit the documentation website: https://z22092.github.io/event-polyfill/

## License

MIT
