/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import './index';

describe("'Event' class", () => {
  it('constructor should return an Event object', () => {
    expect(new Event('')).toBeInstanceOf(Event);
  });

  it("'type' property should be the value of the constructor's first argument", () => {
    const event = new Event('foo');
    expect(event.type).toBe('foo');
  });

  it("'type' property should be the string representation of the constructor's first argument", () => {
    expect(new (Event as any)(undefined).type).toBe('undefined');
    expect(new (Event as any)(null).type).toBe('null');
    expect(new (Event as any)(1e3).type).toBe('1000');
  });

  it('"type" property should be readonly', () => {
    const event = new Event('foo');
    expect(() => {
      (event as any).type = 'bar';
    }).toThrow(TypeError);
  });

  it('"target" property should be null', () => {
    const event = new Event('foo');
    expect(event.target).toBeNull();
  });

  it('"target" property should be readonly', () => {
    const event = new Event('foo');
    expect(() => {
      (event as any).target = null;
    }).toThrow(TypeError);
  });

  it('"target" property should be null', () => {
    const event = new Event('foo');
    expect(event.target).toBeNull();
  });
});
