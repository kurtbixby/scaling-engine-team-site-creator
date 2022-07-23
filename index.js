import inquirer from 'inquirer';
import fs from 'fs/promises';
import Manager from './lib/Manager.cjs';
import Engineer from './lib/Engineer.cjs';
import Intern from './lib/Intern.cjs';

const MANAGER_QUESTIONS = [
    {
        type: 'input',
        message: 'Enter the team manager\'s name: ',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Enter the team manager\'s employee ID: ',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Enter the team manager\'s email address: ',
        name: 'email'
    },
    {
        type: 'input',
        message: 'Enter the team manager\'s office number: ',
        name: 'officeNumber'
    }
];
const ENGINEER_QUESTIONS = [
    {
        type: 'input',
        message: 'Enter the engineer\'s name: ',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Enter the engineer\'s employee ID: ',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Enter the engineer\'s email address: ',
        name: 'email'
    },
    {
        type: 'input',
        message: 'Enter the engineer\'s GitHub: ',
        name: 'github'
    }
];
const INTERN_QUESTIONS = [
    {
        type: 'input',
        message: 'Enter the intern\'s name: ',
        name: 'name'
    },
    {
        type: 'input',
        message: 'Enter the intern\'s employee ID: ',
        name: 'id'
    },
    {
        type: 'input',
        message: 'Enter the intern\'s email address: ',
        name: 'email'
    },
    {
        type: 'input',
        message: 'Enter the intern\'s school: ',
        name: 'school'
    }
];

const MENU_PROMPT = [
    {
        type: 'list',
        message: 'Would you like to add an engineer or an intern?',
        name: 'role',
        choices: ['Engineer', 'Intern', 'End']
    }
];

async function main() {
    // Get Manager input
    let employees = [];
    employees.push(new Manager(await inquirer.prompt(MANAGER_QUESTIONS)));

    // Menu for 3 options
    let exit = false;
    do {
        let response = await inquirer.prompt(MENU_PROMPT);
        if (response.role === 'Engineer') {
            employees.push(new Engineer(await inquirer.prompt(ENGINEER_QUESTIONS)));
            exit = false;
        } else if (response.role === 'Intern') {
            employees.push(new Intern(await inquirer.prompt(INTERN_QUESTIONS)));
            exit = false;
        } else {
            exit = true;
        }
    } while(exit != true);

    // Append HTMLs
    let cardsHtml = (await Promise.all(employees.map(e => e.createHtmlCard()))).join('\n');

    // Build whole HTML
    let template = await fs.readFile('./src/mainTemplate.html');
    let filledTemplate = eval('`'+template+'`');

    await writeToFile('./output', 'index.html', filledTemplate);
}

async function writeToFile(outputDir, outputFile, text) {
    try {
        // Try to write to a file
        await fs.writeFile(`${outputDir}/${outputFile}`, text);
    } catch {
        // If unable, make a directory then write to a file
        await fs.mkdir(outputDir);
        await fs.writeFile(`${outputDir}/${outputFile}`, text);
    }
}

main();