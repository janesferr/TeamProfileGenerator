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

// // // TODO: Create a function to initialize app
// function init() {
//     try {
//         fs.unlinkSync(path)
//         //file removed
//     } catch (err) {
//         console.error(err)
//     }

// }

// // // Function call to initialize app
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

      },
      {
        type: "list",
        message: "Would you like to add more team members:",
        choices: [
          "yes",
          "no"
        ],
        name: "moreMembers",
      }

    ])
    .then(function ({ role, name, id, email, moreMembers }) {
      let roleInfo = "";
      let newMember;
        if (role === "Manager") {
          roleInfo = "office_number";
          newMember = new Manager(name, id, email, roleInfo);
        }
        else if (role === "Engineer") {
          roleInfo = "Github username";
          newMember = new Engineer(name, id, email, roleInfo);
        }
        else if (role === "Intern") {
          roleInfo = "School name";
          newMember = new Intern(name, id, email, roleInfo);
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
};

function renderPage(member) {
  return new Promise(function ()  {
    const name = member.getName();
    const role = member.getRole();
    const id = member.getId();
    const email = member.getEmail();
    var page = "";
    // get the page template
    page = fs.readFileSync("./inputFile/page.html", "utf8");
    if (role === "Manager") {
      const office_number = member.getOfficeNumber();
      const infoTemplate = `<header>
      <h3 id="name">${name}</h3><i class="fa fa-coffee"></i>
      <h3 id="position">${role}</h3>
  </header>
  
  <ul class="list-group">
      <li class="list-group-item">ID: ${id}</li>
      <li class="list-group-item">Email: ${email}</li>
      <li class="list-group-item">Office number: ${office_number}</li>
      
  </ul>`;
      page = page.replace("{{ template }}", infoTemplate);
      fs.writeFileSync("./dist/index.html", page);
    }
    else if (role === "Engineer") {
      const gitHub = member.getGithub();
      engineerTemplate = `<div class="col-6">
      <div class="card mx-auto mb-3" style="width: 18rem">
      <h5 class="card-header">${name}<br /><br />${role}</h5>
      <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email Address: ${email}</li>
          <li class="list-group-item">GitHub: ${gitHub}</li>
      </ul>
      </div>
  </div>`;
      page = page.replace("{Engineer Template}", engineerTemplate);
      fs.writeFileSync("./dist/index.html", page)
    }
    else if (role === "Intern") {
      const school = member.getSchool();
      internTemplate = `
      <h5 class="card-header">${name}<br /><br />${role}</h5>
      <ul class="list-group list-group-flush">
          <li class="list-group-item">ID: ${id}</li>
          <li class="list-group-item">Email Address: ${email}</li>
          <li class="list-group-item">School: ${school}</li>
      </ul>
      </div>
  </div>`;
      page = page.replace("{ RenderIntern }", internTemplate);
      fs.writeFileSync("./dist/index.html", page)
    }
    else{
      console.log("No teams added");
      // getMembers();
      
    }
    fs.writeFileSync("./dist/index.html", page)
    
  //   , function (err) {
  //     if (err) {
  //         return reject(err);
  //     };
  //     return resolve();
  // });
  //   // console.log("Thank you for building your team with us.");
  // });
});
}
getMembers();
