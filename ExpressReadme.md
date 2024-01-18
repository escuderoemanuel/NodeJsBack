# STEPS

* Global Installation Nodemon ```npm install -g nodemon```
    - Optional Project Installation as a Dependency: ```npm install --save-dev nodemon```
    - Run Nodemon Project: ```nodemon miApp.js```
* Create Project Folder
* Run: ```npm init``` (-y optional)
* Enter in Project Folder
* Run: ```npm install express```
    - Optional Global Installation: ```npm install -g express```
    - After global installation, you could create Express.js projects in any location using the command ```express my-express-app```
* Create Src Folder
* Create App.js file (Or any name)



# IN FILE PROJECT

* To use Express:
    - Syntax before EC6: ```const express = require('express');```
    - Syntax after EC6: ```import express from 'express';```
        - It's necessary to add ```"type": "module"``` in pachage.json file
*  Define constant for express: ```const server = express();```
* Get Method:_ 
    - Example: ```server.get('/enpoint', (req, res) => {res.send('Some String or Whatever');})```
    - Example: ```server.get('/greeting', (req, res) => {res.send('<h2>Greeting: Hello World from Express.js</h2>');})```
    - Example: ```server.get('/welcome', (req, res) => {res.send('<p style="color: blue" >Hi, welcome to Express.js</p>');})```




# POSSIBLE ERRORS
* Powershell does not run comand nodemon!
    - Run with Gitbash terminal

