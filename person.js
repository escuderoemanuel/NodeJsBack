class Person {

  constructor(name, age) {
    this.name = name;
    this.age = age
  }

  //It belongs to the whole class
  static specie = 'Homo Sapiens';

  //Methods
  sayHi() {
    console.log(`Hi, my name is ${this.name} and I am ${this.age} years old`);
  }

  getSpecie() {
    console.log(`I'm a ${Person.specie}`)
  }
}

const person1 = new Person("John", 30);

person1.sayHi();
person1.getSpecie();