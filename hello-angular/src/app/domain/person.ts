export class Person {
  id:number;
  firstName: string;
  lastName: string;
  age: number;
  
  constructor(id: number,firstName: string, lastName: string, age: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
  
  public showName(): string {
    return this.firstName + ", " + this.lastName;
  }
  
  public isAdult(): boolean {
    return this.age >= 18;
  }
}