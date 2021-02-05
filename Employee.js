class Employee{
    constructor(firstName, lastName, position){
        this.firstName = firstName;
        this.lastName = lastName;
        this.position = position;
        this.salary = Number;
        this.id = 1;
        this.email = `${this.firstName}.${this.lastName}@true.corp`;
    }
}
module.exports = Employee;