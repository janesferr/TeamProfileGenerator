const Employee = require("../Employee.js");

describe("Employee", () => {
    describe("Initialize", () => {
    //should have a first name & a last name
    it("should have a first name & a last name", () => {
        //arrange /act
        const employee = new Employee("Jim", "Haynes");
        //assert
        expect("firstName" in employee).toEqual(true);
        expect("lastName" in employee).toEqual(true);
        expect("position" in employee).toEqual(true);
        expect("salary" in employee).toEqual(true);
        expect("id" in employee).toEqual(true);
        expect("email" in employee).toEqual(true);
    });
    
    it("should have an id assigned when they are created", () => {
        const employee = new Employee("Jim", "Haynes", "Manager");
    });
    it("should have an id assigned when they are created", () => {
        const employee = new Employee("Jim", "Haynes", "Manager", "100000", "1", "Jim.Haynes@true.corp");
    });

    });
});
