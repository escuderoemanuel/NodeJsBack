class Counter {
  #value = 0;

  increment() {
    this.#value++;
  }
  incrementQuantity(q) {
    this.#value += q;
  }

  decrement() {
    this.#value--;
  }
  decrementQuantity(q) {
    this.#value -= q;
  }

  getValue() {
    return this.#value;
  }
}

const counter = new Counter();
//counter.increment();
//counter.increment();
//counter.increment();
//counter.decrement();
//counter.decrement();
//counter.decrement();
//counter.decrement();
counter.incrementQuantity(15);
counter.decrementQuantity(5);
console.log(counter.getValue());
