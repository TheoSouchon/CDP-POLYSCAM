import {Person} from "../person/person.model";
import {Announce} from "../announce/announce.model";

export class Purchase {
  id?: number;
  cost: number;
  dateOrder: Date;
  state: string;
  person : Person | null;
  announce: Announce | null;


  constructor(cost: number, dateOrder: Date, state: string, person: Person | null, announce: Announce | null) {
    this.cost = cost;
    this.dateOrder = dateOrder;
    this.state = state;
    this.person = person;
    this.announce = announce;
  }
}
