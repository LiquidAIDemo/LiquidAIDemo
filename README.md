# LiquidAIDemo

This is a project for Autumn 2023 implementation of Software Engineering Project 1 & 2 course in Tampere University.

## Instructions for use

### Prerequisites

You have Node and Git installed locally on your computer.

### Cloning the project

Cloning with SSH is recommended. See instructions for adding SSH key to your GitHub account: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account

After adding an SSH key, or if you already have one, you can clone the project to your local directory with the following command: 
- git clone git@github.com:LiquidAIDemo/LiquidAIDemo.git

### Starting the application

On your command line terminal, in the root directory of the project, run the following command:
- npm start

This command executes all of the following: cd frontend, npm install, npm run dev, cd backend & npm run dev. It navigates to the frontend folder and runs the npm start script that's specified in the package.json file there. It starts the frontend and backend at the same time and installs all the necessary dependencies to both of these folders. 

On the console output you can see in which ports the frontend and backend are running (on default, frontend runs in port 5173 and backend in 3001). The number in square brackets in the beginning of each line of the console output tells if it's refering to frontend or backend: lines with 0 refer to frontend and 1 to backend.

Open your browser on localhost:5173 (or if your terminal says it opened in another port, use that one) and you should be able to use the current version of the demo.

### Running frontend and backend separately

Frontend and backend can also be run separately. Depending on which one you want to run, navigate to the frontend or backend folder and run the following commands:
- npm install (this should be done every time after pulling new code from the repository, if you do not use the npm start command)
- npm run dev

### Running unit tests for frontend

Navigate to the frontend folder and run the following commands:
- npm install
- npm test

