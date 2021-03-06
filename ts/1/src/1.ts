class Student {
  fullName: string;
  constructor(public firstName:string, public middleInitial: string, public lastName: string) {
    this.fullName = `${firstName} ${middleInitial} ${lastName}`
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function gretter(person: Person) {
  return `Helllo ${person.firstName} ${person.lastName}`;
}

let user = new Student('jane', 'M.', 'User');

console.log(user)