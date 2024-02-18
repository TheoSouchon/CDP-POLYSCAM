import {Person} from "../person/person.model";

export class Announce {
  id?: number;
  name: string;
  price: number;
  description: string;
  person : Person | null;


  constructor(id: number, name: string, price: number, description: string, person: Person | null) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.person = person;
  }
}
