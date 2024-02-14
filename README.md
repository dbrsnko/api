 # Project Setup Documentation

 This guide will walk you through the setup process for this project. Please follow the steps below to ensure a smooth installation.

 ## Prerequisites
 - Ubuntu or Debian based Linux distribution
 - Command Line Interface (CLI) access

 ## 1. Install Node.js

 Update your package list and install curl if it's not already installed on your system.

 bash  sudo apt update  apt install curl # this can be skipped if curl is already installed  
 Next, download and execute the NodeSource installation script for Node.js version 18.x.

 bash  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -  sudo apt install -y nodejs  
 ## 2. Install Nest CLI

 Install the Nest CLI globally using npm. This tool will help you to create, build, and manage your NestJS applications.

 bash  npm install -g @nestjs/cli  nest --version # this should give you the latest version of the Nest CLI  
 ## 3. Clone the Project

 Clone the project repository from the given URL to your local machine.

 bash  git clone <this_url>  
 Replace <this_url> with the actual URL of the project repository.

 ## 4. Install Node Modules

 Navigate to the root directory of the cloned project and install the required node modules.

 bash  npm install  
 ## 5. Populate .env File

 Create a .env file in the root directory of the downloaded project and populate it with the necessary environment variables.

 Example:

  PORT=3000  DATABASE_HOST=localhost  DATABASE_USER=postgres  DATABASE_DB=test_db  DATABASE_PASSWORD=admin  DATABASE_PORT=5432 

 ## 6. Build Nest

 Compile your Nest project into JavaScript.

 bash  nest build  
 ## 7. Run Migrations

 Use Yarn to run your database migrations. This step will create the necessary database structure for your application.

 bash  yarn migration:run  yarn migration:gen migrations/*migration-name*  
 Replace *migration-name* with the name of your migration file.

 ## 8. Run Application

 Finally, start your application using Yarn.

 bash  yarn start  
 Congratulations! You have successfully set up and started the project. For any further assistance, refer to the project's readme file or contact the development team.
