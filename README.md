# ui-login-testing

## Installation
### Steps
#### Visual Studio Code
- Download and isntall the latest version of Visual Studio Code https://code.visualstudio.com/download
#### NodeJs
- Download the latest LTS version of Node.Js from https://nodejs.org/en/download
- - recommended: v24.15.0
- Install it onto your local computer
- Execute command in terminal to validate the NodeJs: `node -v`
#### PNPM
- Execute command in power shell: `Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression`
- Set environment variable https://dev.to/adiatiayu/
how-to-install-pnpm-with-npm-on-windows-11-5gbn
- Restart Visual Studio Code
#### Install dependencies
- Execute in terminal: `pnpm install`
#### .env is added to repository
- it is anti pattern but I wanted to avoid to share in different ways
#### Execute all tests
- Execute this command in Terminal: `pnpm exec playwright test`