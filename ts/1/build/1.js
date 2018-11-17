class Student {
    constructor(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = `${firstName} ${middleInitial} ${lastName}`;
    }
}
function gretter(person) {
    return `Helllo ${person.firstName} ${person.lastName}`;
}
let user = new Student('jane', 'M.', 'User');
console.log(user);
