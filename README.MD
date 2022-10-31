# Using Javascript programming language to implement the Test Project.

## Prerequisite
1. Install Node.js and Npm
 - Download the node.js https://nodejs.org/en/download/ 
 - Follow the instruction from the node.js's setup.
 - using commandline to check that the node and npm is properly installed
    > `node -v` 
    > `npm -v` 
2. Download the correct version of chromedriver.exe from https://chromedriver.chromium.org/downloads     
    - Please check what is the chrome version that you are current using from your local system.
    - copy the chromedriver.exe to the location of preferred directory.
    - add the directory of the chromedriver.exe to PATH from System variables
3. git clone or download the zip to your local system.
4. go to the directory where the package.json file located
    > `npm install` to download all the dependencies

## Modify the code
1. Modify the line 22 of test.js, to input correct directory where you have placed the chromedriver

## Run the test via terminal/commandline
1. Go to the directory where the package.json is located
    > npm test