// DEPENDENCIES
const fs = require("fs");
const inquirer = require("inquirer");
// const emoji = require("emoj");
const Engineer = require("./lib/Engineer");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee")

const employee = [];


// Register the prompt with inquirer:

// inquirer.registerPrompt('emoji', require('inquirer-emoji'))
// Call the prompt:

// const Emoji = () => {
//   return inquirer.prompt([
//     {
//       type: 'emoji',
//       name: 'spirit_animal',
//       message: 'Find your spirit animal emoji:'
//     }
//   ]);
// }

// const path = './dist/index.html'

// // TODO: Create a function to initialize app
// function init() {
//     try {
//         fs.unlinkSync(path)
//         //file removed
//     } catch (err) {
//         console.error(err)
//     }

// }

// // Function call to initialize app
// init();


function getMembers() {
  inquirer
    .prompt([
      {
        type: 'list',
        message: "Which type of team member would you like to add?",
        name: 'role',
        choices: ["Manager", "Engineer", "Intern", "I'm finish building my team."],
         validate: (value) => { if (value) { return true } else { return " I need a value to continue" } },
        
      }, 
      {
        type: "input",
        name: "name",
        message: `What is your team's name? `,
        validate: (value) => { if (value) { return true } else { return " I need a value to continue" } },

      },
      {
        type: 'input',
        message: `What is the team's id?`,
        name: 'id',
        validate: (value) => { if (value) { return true } else { return " I need a value to continue" } },
      },
      {
        type: 'input',
        message: "What is the team's email?",
        name: "email",
        validate: (value) => { if (value) { return true } else { return " I need a value to continue" } },

      }])
      .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "school name";
        } else {
            roleInfo = "office phone number";
        }
        inquirer.prompt([{
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Would you like to add more team members?",
            choices: [
                "yes",
                "no"
            ],
            name: "moreMembers"
        }])
    .then(function ({ roleInfo, moreMembers }) {
      let newMember;
      if (role === "Manager") {
        newMember = new Manager(name, id, email, roleInfo);
      }
      else if (role === "Engineer") {
        newMember = new Engineer(name, id, email, roleInfo);
      }
      else if (role === "Intern") {   
        newMember = new Intern(name, id, email, roleInfo);
        roleInfo = "School name";
      }
      else if (role === "I'm finish building my team.") {
        console.log("We are finish building your team.");
      }
      else {
        console.log("I don't understand you!!!");
      }
      if (moreMembers === "yes") {
        getMembers();
        employee.push(newMember);
        // console.log("This is my employee dump" + employee);
        renderPage(newMember)
      }
      else {
        console.log("Thank you for building your team.");
      }
      employee.push(newMember);
      renderPage(newMember)

    });
});
}

function startingHtml(){
  const page = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
        integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
    <script src='https://kit.fontawesome.com/a076d05399.js'></script>
    <title>My Team Generator</title>
</head>

<body>
    <h1 class="title">My Team</h1>
    <div class="container">
        <div class="row row-cols-1 row-cols-md-3">`
        fs.writeFileSync("./dist/index.html", page);
}
startingHtml();

function renderPage(member) {
  return new Promise(function () {
    const name = member.getName();
    const role = member.getRole();
    const id = member.getId();
    const email = member.getEmail();
    let page = "";

    if (role === "Manager") {
      const office_number = member.getOfficeNumber();
      page = `
      <div class="col-6">
      <div class="card mx-auto mb-3" style="width: 18rem">
      <h5 class="card-header">${name}<br /><br />${role}</h5>
      <ul class="list-group list-group-flush">
      <li class="list-group-item">ID: ${id}</li>
      <li class="list-group-item">Email: ${email}</li>
      <li class="list-group-item">Office number: ${office_number}</li>
      
  </ul>
  </div>
  </div>`;

    }
    else if (role === "Engineer") {
      const gitHub = member.getGithub();
      page = `<div class="col-6">
      <div class="card mx-auto mb-3" style="width: 18rem">
      <h5 class="card-header">${name}<br /><br />${role}</h5>
      <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email Address: ${email}</li>
          <li class="list-group-item">GitHub: ${gitHub}</li>
      </ul>
      </div>
  </div>`;
      // engineerPage = page.replace("{Engineer Template}", engineerTemplate);
      // fs.writeFileSync("./dist/index.html", engineerPage)
    }
    else if (role === "Intern") {
      const school = member.getSchool();
      page = `
      <div class="col-6">
      <div class="card mx-auto mb-3" style="width: 18rem">
      <h5 class="card-header">${name}<br /><br />${role}</h5>
      <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email Address: ${email}</li>
          <li class="list-group-item">School: ${school}</li>
      </ul>
      </div>
  </div>`;
    }
    else if(role === "I'm finish building my team.") {
      page = `</div> </div></body>
      </html>`;

    }
    else{
      console.log("No teams added");
    }
    fs.appendFileSync("./dist/index.html", page)
  });
}
getMembers();
