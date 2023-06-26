function renderLicenseBadge(license) {
  switch (license) {
    case 'MIT':
      return '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)';
    case 'Apache 2.0':
      return '[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)';
    default:
      return '';
  }
}

function renderLicenseLink(license) {
  switch (license) {
    case 'MIT':
      return 'https://opensource.org/licenses/MIT';
    case 'Apache 2.0':
      return 'https://opensource.org/licenses/Apache-2.0';
    default:
      return '';
  }
}

function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license);

  let environmentTestingSection = '';
  let tableOfContentsEntry = '';

  if (data.environmentTesting) {
    environmentTestingSection = `
## Environment Testing
${data.environmentTesting}

<br>`;
    tableOfContentsEntry = `- [Environment Testing](#environment-testing)\n`;
  }

  let screenshotsSection = '';

  if (data.screenshots && data.screenshots.length > 0) {
    screenshotsSection = `
## Screenshot/Video

${data.screenshots
      .map((screenshot, index) => `- [alt ${index + 1}](${screenshot})`)
      .join('\n')}
`;
  }

  return `# ${data.title}

${licenseBadge}

<br>

${data.description}

<br>

## Description
${data.descriptionitems.map((item) => `* ${item}`).join('\n')}

<br>

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
${tableOfContentsEntry}
- [Screenshot/Video](#screenshotvideo)
- [Deployed APP](#deployed-application)
- [Contributing](#contributing)
- [License](#license)
- [Questions](#questions)

<br>

## Installation
${data.installationItems
    .map(
      (item) => `* _${item.description}_:
> ${item.code}`
    )
    .join('\n\n')}

<br>

## Usage
${data.usageItems.join(' ')}

<br>

${screenshotsSection}

<br>

## Deployed Application


<br>

## Contributing
A list of contributors on this project includes:

${data.contributors.map((contributor) => `* ${contributor}`).join('\n')}

<br>

Third-party applications used to create this project:
${data.thirdPartyApps
    .map((app) => `* [${app.name}](#${app.name.toLowerCase().replace(/ /g, '-')})`)
    .join('\n')}

<br>

## License
This project is licensed under the ${data.license}.

<br>

${environmentTestingSection}

<br>

## Questions
If you have any questions, you can reach out to me via GitHub: [@${data.githubUsername}](${data.githubLink})

Feel free to contact me via email: ${data.email}`;
}

module.exports = generateMarkdown;
