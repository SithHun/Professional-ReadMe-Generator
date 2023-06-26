const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown')

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter the title of your project:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter a description about the project:',
  },
  {
    type: 'input',
    name: 'descriptionitems',
    message: 'Enter description items (separated by commas for bullet points):',
    filter: (value) => value.split(',').map((item) => item.trim()),
  },
  {
    type: 'input',
    name: 'installationItems',
    message: 'Enter installation items (description: code, separated by commas for next line):',
    filter: (value) => {
      const items = value.split(',');
      return items.map((item) => {
        const [description, code] = item.split(':').map((part) => part.trim());
        return { description, code };
      });
    },
  },
  {
    type: 'input',
    name: 'usageItems',
    message: 'Enter usage (will be a paragraph):',
    filter: (value) => value.split(',').map((item) => item.trim()),
  },
  {
    type: 'input',
    name: 'screenshots',
    message: 'Enter the screenshot links or video URL (separated by commas):',
    filter: (value) => value.split(',').map((item) => item.trim()),
  },
  {
    type: 'input',
    name: 'contributors',
    message: 'Enter contributors (separated by commas for bullet points):',
    filter: (value) => value.split(',').map((item) => item.trim()),
  },
  {
    type: 'input',
    name: 'thirdPartyApps',
    message: 'Enter third-party application names (separated by commas for bullet points):',
    filter: (value) => value.split(',').map((item) => ({ name: item.trim() })),
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: ['MIT', 'Apache 2.0', 'None'],
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'Enter your GitHub username:',
  },
  {
    type: 'input',
    name: 'githubLink',
    message: 'Enter the link to your GitHub profile:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
  },
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`README file '${fileName}' has been generated successfully.`);
    }
  });
}

function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      const markdown = generateMarkdown(answers);
      writeToFile('README.md', markdown);
    })
    .catch((err) => {
      console.error(err);
    });
}

// Function call to initialize app
init();