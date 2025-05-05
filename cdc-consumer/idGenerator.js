export class IdGenerator {
  #counter;

  constructor() {
    this.#counter = 1;
  }

  newId() {
    return this.#counter++;
  }
}
