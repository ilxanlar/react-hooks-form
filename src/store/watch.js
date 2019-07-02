export default function createListeners() {
  const listeners = {};

  return {
    notifyWatchers(name, payload) {
      if (name in listeners && listeners[name].length > 0) {
        for (let i = 0; i < listeners[name].length; i++) {
          listeners[name][i](payload);
        }
      }
    },

    watch(name, listener) {
      if (!(name in listeners)) {
        listeners[name] = [];
      }

      if (typeof listener !== 'function') {
        throw new Error('Expected listener to be a function.');
      }

      listeners[name].push(listener);

      return () => {
        listeners[name].splice(listeners[name].indexOf(listener), 1);
      };
    }
  };
}
