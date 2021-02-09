// DEPENDENCIES
const fs = require("fs");
const inquirer = require("inquirer");
var page;

// const path = './index.html'

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

const renderPage = ({ name, id, email, office_number, team_member, e_name, E_email, E_github, page}) => {
    // get the page template
    page = fs.readFileSync("./inputFile/page.html", "utf8");
    var infoTemplate = `<header>
    <h3 id="name">${name}</h3><i class="fa fa-coffee"></i>
    <h3 id="position">Manager</h3>
</header>

<ul class="list-group">
    <li class="list-group-item">ID: ${id}</li>
    <li class="list-group-item">Email: ${email}</li>
    <li class="list-group-item">Office number: ${office_number}</li>
    
</ul>`;

page = page.replace("{{ template }}", infoTemplate);

     // write the page template to the output folder
    fs.writeFileSync("index.html", page);
    // return infoTemplate;
  
  }



// const getManagerinf = () => {


inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: `What is your team manager's name? `,
      validate: (value) => { if (value) { return true } else { return " I need a value to continue" } },

    },
    {
        type: 'input',
        message: `What is the team manager's id?`,
        name: 'id',
        validate: (value) => { if (value) { return true } else { return " I need a value to continue" } }

    },
    {
        type: 'input',
        message: "What is the team manager's email?",
        name: "email",
        validate: (value) => { if (value) { return true } else { return " I need a value to continue" } }

    },
    {
        type: 'input',
        message: "What is the team manager's office number?",
        name: "office_number",
        validate: (value) => { if (value) { return true } else { return " I need a value to continue" } }

    },
    {
        type: 'list',
        message: "Which type of team member would you like to add?",
        name: 'team_member',
        choices: ["Engineer", "intern", "finish building my team"],
        validate: (value) => { if (value) { return true } else { return " I need a value to continue" } },
    },
   {
    type: 'input',
    message: "What is your engineer's name? ",
    name: 'e_name',
    validate: (value) => { if (value) { return true } else { return " I need a value to continue" } },
     when: (answers) => answers.team_member === 'Engineer'
  },
    {
        type: 'input',
        message: "What is your engineer's id? ",
        name: 'eid',
        validate: (value) => { if (value) { return true } else { return " I need a value to continue" } },
    },
    {
      type: 'input',
      message: "What is your engineer's email? ",
      name: 'E_email',
      validate: (value) => { if (value) { return true } else { return " I need a value to continue" } },
    },
    //Features If your project has a lot of features, consider adding a heading called "Features" and listing them there.
    {
        type: 'input',
        message: "What is your engineer's Github info? ",
        name: 'E_github',
        validate: (value) => { if (value) { return true } else { return " I need a value to continue" } },
    }, 
    
  ])
  .then(response => {
    renderPage(response);
    
  
  });
  // const getPetCount = () => {
  //   inquirer
  //     .prompt([
  //       {
  //         name: "pet_count",
  //         type: "number",
  //         message: "How many pets do you own?",
  //       },
  //     ])
  //     .then((answer) => {
  //       if (!answer.pet_count) {
  //         console.log("That wasn't a number!");
  //         getPetCount();
  //       } else {
  //         console.log("You own", answer.pet_count, "pets");
  //     });
  // };
  // getPetCount();
  
