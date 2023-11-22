# Energy Optimizer Demo

The purpose of this demo is to show how energy consumption can be optimized in a single-family house.

This is a project for Autumn 2023 implementation of Software Engineering Project 1 & 2 courses in Tampere University.

## Installation

### Prerequisites

Make sure that you have Node and Git installed locally on your computer. We recommend using Node.js version 16 or higher.

### Clone the Project

Cloning with SSH is recommended. If you haven't already, follow the instructions to add an SSH key to your GitHub account: [Adding a New SSH Key to Your GitHub Account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

After adding an SSH key, or if you already have one, clone the project to your local directory with the following command:

```
git clone git@github.com:LiquidAIDemo/LiquidAIDemo.git
```

## Run the Demo

1. Open your command line terminal in the root directory of the project.
2. Run the following command:

   ```
   npm start
   ```

   This command installs dependencies and starts both frontend and backend.

   Check the console output to determine the ports on which the frontend and backend are running. By default, the frontend runs on `port 5173`, and the backend runs on `port 3001`.

   The number in square brackets in the beginning of each line of the console output tells if it's referring to frontend (0) or backend (1).

3. Open your browser and navigate to `localhost:5173` (or use the port mentioned in your terminal) to access the current version of the demo.

### Run Frontend and Backend Separately

Frontend and backend can also be run separately. Depending on which one you want to run, navigate to the frontend or backend folder and execute the following commands:

```
npm install
npm run dev
```

Remember to run `npm install` every time after pulling new code from the repository if you do not use the npm start command.

## Run Tests

In the root directory of the project, run the following command to execute unit tests and print the test coverage:

```
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Developers

- Tuomas Ahvenus, tuomas.ahvenus@tuni.fi
- Helmi Ikonen, helmi.ikonen@tuni.fi
- Sara Lehtinen, sara.h.lehtinen@tuni.fi
- Tuomas Mäkinen, tuomas.2.makinen@tuni.fi
- Milla Valio, milla.valio@tuni.fi
- Julia Varjamo, julia.varjamo@tuni.fi
