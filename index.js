
const fs = require('fs');
const inquirer = require('inquirer');
const generatePage = require('./src/generatePage');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

// Function to accept input for our manager
const promptManager = () => {
   
     return inquirer.prompt([
        { 
            type: 'input',
            name: 'name',
            message: "What is the manager's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the manager's ID?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the manager's email?"
        },
        {
            type: 'input',
            name: 'officenumber',
            message: "What is the manager's office number?"
        }     
    
    ]).then(managerData => {
        const {name, id, email, officenumber} = managerData
        employee = new Manager(name, id, email, officenumber)
        let role = {role: 'Manager'}
        return {...managerData, ...role}
    })
};

// Function to accept input for the rest of the team
const promptTeam = managerData => {
    if (!managerData.engineers) {
        managerData.engineers = [];
    }
    if (!managerData.interns) {
        managerData.interns = [];
    }  
    
    return inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Would you like to add an engineer, an intern, or finish building your team?",
            choices: ['Engineer', 'Intern', 'Finished']
        }
    ]).then(({ role }) => {
        if (role === "Engineer") {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is the engineer's name?"
                },
                {
                    type: "input",
                    name: "id",
                    message: "What is the engineer's ID number?"
                },
                {
                    type: "input",
                    name: "email",
                    message: "What is the engineer's email?",
                },
                {
                    type: "input",
                    name: "github",
                    message: "What is the engeineer's GitHub username?"
                }
            ]).then(employeeData => {
               employee = new Engineer(employeeData.name, employeeData.id, employeeData.email, employeeData.github)
               let role = {role: "Engineer"}
               managerData.engineers.push({...employeeData, ...role})
               return promptTeam(managerData)
            })
        } else if (role === "Intern") {
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What is the intern's name?"
                },
                {
                    type: "input",
                    name: "id",
                    message: "What is the intern's ID number?"
                },
                {
                    type: "input",
                    name: "email",
                    message: "What is the intern's email?",
                },
                {
                    type: "input",
                    name: "school",
                    message: "Which school does the intern attend?"
                }
            ]).then(employeeData => {
                employee = new Intern(employeeData.name, employeeData.id, employeeData.email, employeeData.school)
                let role = {role: "Intern"}
                managerData.interns.push({...employeeData, ...role})
                return promptTeam(managerData)
             })
        } else {
            console.log('Team data inputted, building page!')
            return managerData
        }
    })
} 

// Function to write our index.html to ./dist/
function writeToFile (pageHTML) {
    return new Promise((success, failure) => {
        fs.writeFile('./dist/index.html', pageHTML, err => {
            if (err) {
                failure(err);
                return;
              };
              success({
                  ok: true,
                  message: 'Successfully generated your team page at ./dist/index.html !!!!!'
            });
        });
    });
};

// Function to copy our CSS from src to dist
const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
              };
              resolve({
                  ok: true,
                  message: 'Styling successfully copied to ./dist/style.css !!!!!'
              });
        });
    });
};

// Runs our manager function > team function > write HTML > copy CSS
promptManager()
    .then(promptTeam)
    .then(managerData => {
        return generatePage(managerData)      
    })
    .then(pageHTML => {
        return writeToFile(pageHTML);
    })
    .then(writefileResponse => {
        console.log(writefileResponse.message)
    })
    .then(copyFile)
    .then(copyfileResponse => {
        console.log(copyfileResponse.message)
    })
    .catch(err => {
        console.log(err);
    });