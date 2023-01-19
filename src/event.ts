import { AT_TARGET, BUBBLING_PHASE, CAPTURING_PHASE, NONE } from './constants';

/**
 * @file Event
 * @author Z22092
 *
 * @description
 * This file provides a polyfill for the Event class for older browsers that do not have native support.
 * This allows your code to continue working on older browsers without having to change your code or use different code paths.
 */

/**
 * @typedef {EventInternalData} EventInternalData
 * @property {string} type - The type of event.
 * @property {boolean} bubbles - Indicates if the event bubbles.
 * @property {boolean} cancelable - Indicates if the event is cancelable.
 * @property {boolean} composed - Indicates if the event can cross the shadow boundary.
 * @property {number} timeStamp - The time when the event was created.
 * @property {EventTarget|null} target - The target of the event.
 * @property {EventTarget|null} currentTarget - The current target of the event.
 * @property {boolean} stopPropagationFlag - Indicates if the event propagation is stopped.
 * @property {boolean} stopImmediatePropagationFlag - Indicates if the event immediate propagation is stopped.
 * @property {boolean} canceledFlag - Indicates if the event is canceled.
 * @property {boolean} inPassiveListenerFlag - Indicates if the event is in a passive listener.
 * @property {boolean} dispatchFlag - Indicates if the event is being dispatched.
 */
type EventInternalData = {
  readonly type: string;
  readonly bubbles: boolean;
  readonly cancelable: boolean;
  readonly composed: boolean;
  readonly timeStamp: number;
  target: EventTarget | null;
  currentTarget: EventTarget | null;
  stopPropagationFlag: boolean;
  stopImmediatePropagationFlag: boolean;
  canceledFlag: boolean;
  inPassiveListenerFlag: boolean;
  dispatchFlag: boolean;
};

/**
 * @class Event
 * @classdesc This class is a polyfill for the Event class for older browsers that do not have native support.
 */

export class Event {
  /**
   * @static
   * @property {number} NONE - The NONE constant.
   **/
  static readonly NONE = NONE;

  /**
   * @static
   * @property {number} CAPTURING_PHASE - The CAPTURING_PHASE constant.
   **/
  static readonly CAPTURING_PHASE = CAPTURING_PHASE;

  /**
   * @static
   * @property {number} AT_TARGET - The AT_TARGET constant.
   **/
  static readonly AT_TARGET = AT_TARGET;

  /**
   * @static
   * @property {number} BUBBLING_PHASE - The BUBBLING_PHASE constant.
   **/
  static readonly BUBBLING_PHASE = BUBBLING_PHASE;

  /**
   * @property {number} NONE - The NONE constant.
   **/

  readonly NONE = NONE;
  /**
   * @property {number} CAPTURING_PHASE - The CAPTURING_PHASE constant.
   **/
  readonly CAPTURING_PHASE = CAPTURING_PHASE;

  /**
   * @property {number} AT_TARGET - The AT_TARGET constant.
   **/

  readonly AT_TARGET = AT_TARGET;

  /**
   * @property {number} BUBBLING_PHASE - The BUBBLING_PHASE constant.
   **/
  readonly BUBBLING_PHASE = BUBBLING_PHASE;

  /**
   * @property {EventInternalData} #internalData - The internal data of the event.
   **/
  #internalData: EventInternalData;

  /**
   * @constructor
   * @param {string} type - The type of event.
   * @param {EventInit} [eventInitDict] - The event initialization options.
   **/
  constructor(type: string, eventInitDict?: EventInit) {
    Object.defineProperty(this, 'isTrusted', {
      value: false,
      enumerable: true
    });

    this.#internalData = {
      type: String(type),
      bubbles: Boolean(eventInitDict?.bubbles),
      cancelable: Boolean(eventInitDict?.cancelable),
      composed: Boolean(eventInitDict?.composed),
      target: null,
      currentTarget: null,
      stopPropagationFlag: false,
      stopImmediatePropagationFlag: false,
      canceledFlag: false,
      inPassiveListenerFlag: false,
      dispatchFlag: false,
      timeStamp: Date.now(),
      ...(eventInitDict || {})
    };
  }

  /**
   * Returns the type of the event
   * @returns {string}
   */
  get type(): string {
    return this.#internalData.type;
  }

  /**
   * Returns the target of the event
   * @returns {EventTarget|null}
   */
  get target(): EventTarget | null {
    return this.#internalData.target;
  }

  /**
   * Returns the srcElement of the event
   * @returns {EventTarget|null}
   * @deprecated
   */
  get srcElement(): EventTarget | null {
    return this.#internalData.target;
  }

  /**
   * Returns the currentTarget of the event
   * @returns {EventTarget|null}
   */
  get currentTarget(): EventTarget | null {
    return this.#internalData.currentTarget;
  }

  /**
   * Returns the composed path of the event
   * @returns {EventTarget[]}
   */
  composedPath(): EventTarget[] {
    const currentTarget = this.#internalData.currentTarget;
    if (currentTarget) {
      return [currentTarget];
    }
    return [];
  }

  /**
   * Returns the event phase of the event
   * @returns {0|2}
   */
  get eventPhase(): 0 | 2 {
    return this.#internalData.dispatchFlag ? 2 : 0;
  }

  /**
   * Stops the propagation of the event
   * @returns {void}
   */
  stopPropagation(): void {
    this.#internalData.stopPropagationFlag = true;
  }

  /**
   * Sets the cancelBubble property of the event
   * @param {boolean} value - the value to set
   */
  set cancelBubble(value: boolean) {
    this.#internalData.stopPropagationFlag = value;
  }

  /**
   * Returns the cancelBubble property of the event
   * @returns {boolean}
   */
  get cancelBubble(): boolean {
    return this.#internalData.stopPropagationFlag;
  }

  /**
   * Stops the immediate propagation of the event
   * @returns {void}
   */
  stopImmediatePropagation(): void {
    const data = this.#internalData;
    data.stopPropagationFlag = data.stopImmediatePropagationFlag = true;
  }

  /**
   * Returns a boolean indicating whether the event bubbles up through the DOM or not
   * @returns {boolean}
   */
  get bubbles(): boolean {
    return this.#internalData.bubbles;
  }

  /**
   * Returns a boolean indicating whether the event is cancelable or not
   * @returns {boolean}
   */
  get cancelable(): boolean {
    return this.#internalData.cancelable;
  }

  /**
   * Returns a boolean indicating whether the event's default action can be prevented or not
   * @returns {boolean}
   */
  get returnValue(): boolean {
    return !this.#internalData.canceledFlag;
  }

  /**
   * Sets the returnValue property of the event
   * @param {boolean} value - the value to set
   */
  set returnValue(value: boolean) {
    if (!value) {
      setCancelFlag(this.#internalData);
    }
  }

  /**
   * Prevents the event's default action
   * @returns {void}
   */
  preventDefault(): void {
    setCancelFlag(this.#internalData);
  }

  /**
   * Returns a boolean indicating whether the event's default action has been prevented or not
   * @returns {boolean}
   */
  get defaultPrevented(): boolean {
    return this.#internalData.canceledFlag;
  }

  /**
   * Returns a boolean indicating whether the event is composed or not
   * @returns {boolean}
   */
  get composed(): boolean {
    return this.#internalData.composed;
  }

  /**
   * Returns a boolean indicating whether the event is trusted or not
   * @returns {boolean}
   */
  get isTrusted(): boolean {
    return false;
  }

  /**
   * Returns the time stamp of the event
   * @returns {number}
   */
  get timeStamp(): number {
    return this.#internalData.timeStamp;
  }

  /**
   * Initializes the event
   * @param {string} type - the type of the event
   * @param {boolean} bubbles - a boolean indicating whether the event bubbles up through the DOM or not
   * @param {boolean} cancelable - a boolean indicating whether the event is cancelable or not
   * @deprecated
   */
  initEvent(type: string, bubbles: boolean = false, cancelable: boolean = false) {
    const data = this.#internalData;
    if (data.dispatchFlag) {
      return;
    }

    const init = {
      type: String(type),
      bubbles: Boolean(bubbles),
      cancelable: Boolean(cancelable),
      target: null,
      currentTarget: null,
      stopPropagationFlag: false,
      stopImmediatePropagationFlag: false,
      canceledFlag: false
    };

    Object.assign(this, new Event(init.type, init));
  }
}

/**
 * setCancelFlag is a helper function that sets the canceledFlag property of the EventInternalData object to true.
 * @ignore
 * @function
 * @param {EventInternalData} data - the EventInternalData object
 * @returns {void}
 */
function setCancelFlag(data: EventInternalData): void {
  if (data.inPassiveListenerFlag) {
    return;
  }
  if (!data.cancelable) {
    return;
  }

  data.canceledFlag = true;
}
