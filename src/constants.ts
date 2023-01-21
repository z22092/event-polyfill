/**
 * Enum containing the different phases of an event.
 * @enum {number}
 */
export const EVENT_PHASES_ENUM = {
  /** No phase is currently active. */
  NONE: 0,
  /** Capturing phase is currently active. */
  CAPTURING: 1,
  /** At target phase is currently active. */
  AT_TARGET: 2,
  /** Bubbling phase is currently active. */
  BUBBLING: 3
} as const;

export type EVENT_PHASES_ENUM<T = typeof EVENT_PHASES_ENUM> = T[keyof T];
