/* eslint-disable spaced-comment */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference  path="./global.d.ts" />

import { Event } from './event';
import { Global } from './globalthis';

if (typeof Global !== 'undefined' && typeof Global.Event === 'undefined') {
  Global.Event = Event;
}

export {};
