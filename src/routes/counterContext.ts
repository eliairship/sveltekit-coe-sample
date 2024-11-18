import { setContext, getContext } from 'svelte';

type Counter = {
  count: number;
}
const counterContextKey = Symbol('counter');

export function setCounterContext(newCount: Counter) {
  setContext(counterContextKey, newCount);
}

export function getCounterContext(): Counter {
  return getContext(counterContextKey) as Counter;
}

