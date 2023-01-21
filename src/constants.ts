export const EVENT_PHASES_ENUM = {
  NONE: 0,
  CAPTURING: 1,
  AT_TARGET: 2,
  BUBBLING: 3
} as const;

export type EVENT_PHASES_ENUM<T = typeof EVENT_PHASES_ENUM> = T[keyof T];
