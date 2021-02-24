export function createPostMessageListener({ getOrigin, payloads, hooks }) {
  const state = {
    observers: [],
  };

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function notifyAll(command) {
    for (let observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  const eventData = event => {
    const { origin, data } = event;
    const { hook, payload } = data;

    if (origin !== getOrigin()) return;
    payloads = payload;
    hooks = hook;
    notifyAll(hook);
  };

  globalThis.addEventListener('message', eventData);

  const cleanUp = () => {
    globalThis.removeEventListener('message', eventData);
  };

  return {
    subscribe,
    cleanUp,
  };
}
