const fs = require('fs');
const inquirer = require('inquirer');

const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');

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

const promptTeam = () => {
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
            return managerData
        }
    })
} 




promptManager().then(promptTeam);