class Counter {
  #value = 0;

  increment() {
    this.#value++;
  }
  decrement() {
    this.#value--;
  }
  getValue() {
    return this.#value;
  }

}

const counter = new Counter();
counter.increment();
counter.increment();
counter.increment();
counter.decrement();
counter.decrement();
counter.decrement();
counter.decrement();
console.log(counter.getValue());
