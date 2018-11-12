var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function gretter(person) {
    return "Helllo " + person.firstName + " " + person.lastName;
}
var user = new Student('jane', 'M.', 'User');
console.log(user);
