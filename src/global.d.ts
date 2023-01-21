/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line spaced-comment
/// <reference no-default-lib="true"/>

import type { Event as __Event } from './event';

import {} from 'events'; // Make this an ambient declaration

declare global {
  type EventInit = {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  };

  type EventListener = {
    (evt: Event): void;
  };

  type EventListenerObject = {
    handleEvent(object: Event): void;
  };

  type EventListenerOrEventListenerObject = EventListener | EventListenerObject;

  type EventListenerOptions = {
    capture?: boolean;
  };

  type AddEventListenerOptions = EventListenerOptions & {
    once?: boolean;
    passive?: boolean;
    // signal?: AbortSignal;
  };

  type EventTarget = typeof globalThis extends { onmessage: any; EventTarget: infer T }
    ? T
    : {
        addEventListener(
          type: string,
          callback: EventListenerOrEventListenerObject | null,
          options?: AddEventListenerOptions | boolean
        ): void;
        dispatchEvent(event: Event): boolean;
        removeEventListener(
          type: string,
          callback: EventListenerOrEventListenerObject | null,
          options?: EventListenerOptions | boolean
        ): void;
      };

  type AbortSignal = typeof globalThis extends { onmessage: any; AbortSignal: infer T }
    ? T
    : EventTarget & {
        readonly aborted: boolean;
      };

  interface Event extends __Event {}
  // eslint-disable-next-line no-var
  var Event: typeof globalThis extends { onmessage: any; Event: infer T }
    ? T
    : {
        prototype: __Event;
        new (type: string, eventInitDict?: EventInit): __Event;
        readonly AT_TARGET: number;
        readonly BUBBLING_PHASE: number;
        readonly CAPTURING_PHASE: number;
        readonly NONE: number;
      };
}
