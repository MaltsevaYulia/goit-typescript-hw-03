//Після реалізації всіх класів створіть об'єкти для кожного класу та спробуйте відтворити сценарій,
//в якому людина приходить додому.

class Key {
  private signature: number = Math.random();

  public getSignature(): number {
    return this.signature;
  }
}
//Людина (Person): Створіть клас Person. Конструктор цього класу приймає об'єкт класу
//Key і зберігає їх у приватному властивості key.Клас Person повинен мати метод getKey,
//    який повертає збережений ключ.

class Person {
  // private key: Key;

  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

//Дім (House): Створіть абстрактний клас House. Цей клас має дві властивості: door,
//яка може бути відкрита(true), або закрита(false), і key, яка зберігає об'єкт класу Key.
//У цьому класі також повинен бути метод comeIn, який додає об'єкт класу Person у масив tenants,
//якщо door відкрита.Ваш абстрактний клас House також повинен мати абстрактний метод OpenDoor,
//який приймає об'єкт класу Key.

abstract class House {
  protected door: boolean = false;
  protected tenants: Person[] = [];

  constructor(protected key: Key) {}

  public comeIn(person: Person): void {
    if (this.door) this.tenants.push(person);
  }
  public abstract openDoor(personKey: Key): void;
}
//Мій будинок (MyHouse): Створіть клас MyHouse, який успадковується від абстрактного класу House.
//Реалізуйте метод openDoor у цьому класі.Якщо ключ, переданий цьому методу, збігається з ключем, з
//береженим як key, то двері відчиняються.

class MyHouse extends House {
  public openDoor(personKey: Key): void {
    this.door =
      personKey.getSignature() === this.key.getSignature() ? true : false;
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};
