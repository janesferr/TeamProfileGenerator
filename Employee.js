const fs = require("fs");

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
// FUNCTIONS
const renderPage = () => {
    // get the page template
    let page = fs.readFileSync("./templates/page.html", "utf8");
  
  
    const renderedTodos = todos.map(todo => {
       if (todo.complete) {
         let todoTemplate = fs.readFileSync("./templates/todo-completed.html", "utf8");
         //todoTemplate = todoTemplate.replace("{{ text }}", todo.text)
         todoTemplate = `<li style="color: red">${todo.text}</li>`;
         return todoTemplate
       } else {
        let todoTemplate = fs.readFileSync("./templates/todo.html", "utf8");
         todoTemplate = todoTemplate.replace("{{ text }}", todo.text)
         return todoTemplate
       }
       
    })
    console.log(renderedTodos.join(""));
  
    page = page.replace("{{ todos }}", renderedTodos.join(""));
    // write the page template to the output folder
    fs.writeFileSync("./output/page.html", page);
  
  }
  
  // USER INTERACTIONS
  renderPage();
module.exports = Employee;