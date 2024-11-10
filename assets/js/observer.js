export class Observer {
  observers = []

  register(observable) {
    this.observers.push(observable);
  }

  notify(event) {
    const observables = this.observers.filter((observable) => observable.event === event);
    observables.forEach((observable) => observable.callback());
  }

  unregister(event) {
    this.observers = this.observers.filter((observable) => observable.event !== event);
  }

  unregisterAll() {
    this.observers = []
  }
}