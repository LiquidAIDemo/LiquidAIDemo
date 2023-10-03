# LiquidAIDemo

This is a project for Autumn 2023 implementation of Software Engineering Project 1 & 2 course in Tampere University.

## Instructions for use

### Prerequisites

You have Node and Git installed locally on your computer.

### Cloning the project

Cloning with SSH is recommended. See instructions for adding SSH key to your GitHub account: https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account

After adding an SSH key, or if you already have one, you can clone the project to your local directory with the following command: 
- git clone git@github.com:LiquidAIDemo/LiquidAIDemo.git

### Running the frontend (React app created with Vite)

On your command line terminal (where you cloned the project), navigate to the frontend folder:
- cd frontend

Then, run the command:
- npm install

This will install all the necessary dependencies locally. This should be done every time after pulling new code from the repository.

Then, start the program by running the command:
- npm run dev

On the terminal you will see in which port the program is running. (By default it's port 5173). Open your browser on http://localhost:5173/ (or replace 5173 with whatever port number your terminal says). Now you should be able to use the current version of the demo.
