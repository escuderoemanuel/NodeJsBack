class Person {
  static id = 0;

  constructor(name) {
    this.name = name;
    Person.id++;
    this.id = Person.id;
  }

  getInfo() {
    console.log(`Hi, my name is ${this.name} and mi number id is '${this.id}'`)
  }
}

let person1 = new Person('Emanuel')
let person2 = new Person('Paloma')
let person3 = new Person('Karina')

person1.getInfo()
person2.getInfo()
person3.getInfo()