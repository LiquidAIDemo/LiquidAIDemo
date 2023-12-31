# Instructions for updating the server

The application is currently running on a server hosted by Tampere University, at https://liquidai.tlt-cityiot.rd.tuni.fi/. The person responsible for the server is Ville Heikkilä (ville.heikkila@tuni.fi). 

## Connecting to the server

First you need personal credentials set up with your public SSH key (contact Ville Heikkilä for that). Then you can connect to the server either from the command line terminal (use command `ssh user@tlt-cityiot.rd.tuni.fi`) or if you prefer using a graphical user interface, you can use a file manager software such as WinSCP desktop application. If you use WinSCP, open a new connection with SFTP protocol, server tlt-cityiot.rd.tuni.fi, port 22, add your username and password. On advanced settings, under ssh -> authentication add your private SSH key file. Now you should be able to connect to the server.

## Updating new code to the server

On the command line, use the command `scp [-r] <filepath> <user>@tlt-cityiot.rd.tuni.fi:/mnt/liquidai/LiquidAIDemo[/<path>]` to move files from your local directory to the corresponding directory on the server. (Command `scp` is for individual files, `scp -r` for directories). 

If you need to remove files you first need to connect to the server with command `ssh user@tlt-cityiot.rd.tuni.fi` and then type `rm [-rf] /mnt/liquidai/LiquidAIDemo[/<path>]` (however you might not have rights to remove files/directories someone else has added. If you need to do that you might have to contact Ville).

Alternatively, in WinSCP, make sure you're in the correct directory and drag the updated files from the left file manager window (local directory) to the right (server). The old files with the same name get replaced with the new ones.

The only files that need to be on the server, are docker-compose.yml, and frontend and backend directories. Hidden files, test related folders (frontend/coverage, frontend/cypress, frontend/src/tests) and README files can be left out. Node_modules don't need to be transferred to the server either, as they are installed according to package.json file's contents.

## Start and stop the server

Open the ssh connection on the command line, type `cd /mnt/liquidai/LiquidAIDemo` to navigate to the project directory and run the command `docker-compose down` to stop the application and remove active docker containers. To build new containers and restart the updated application, run the command `docker-compose up --build` (it can take a few minutes).