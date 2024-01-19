# STEPS

* Global Installation Nodemon `npm install -g nodemon`
    - Optional Project Installation as a Dependency: `npm install --save-dev nodemon`
    - Run Nodemon Project: `nodemon miApp.js`
* Create Project Folder
* Run: `npm init` (-y optional)
* Enter in Project Folder
* Run: `npm install express`
    - Optional Global Installation: `npm install -g express`
    - After global installation, you could create Express.js projects in any location using the command `express my-express-app`
* Create Src Folder
* Create App.js file (Or any name)



# IN FILE PROJECT

* To use Express:
    - Syntax before EC6: 
      ```
      const express = require('express');
      ```
    - Syntax after EC6: 
      ```
      import express from 'express';
      ```
      - It's necessary to add in pachage.json file: 
        ```
        "type": "module"
        ``` 
  
* Define constant for express: 
  ```
  const server = express();
  ```

* This way the server will be able to read complex data:
  ```
  server.use(express.urlencoded({ extended: true }))
  ```

* Call to server on port 8080:
  ```
  server.listen(8080, () => {
  console.log('Server is run on port 8080..')
  })
  ```  


* Get Method:
    - Example: 
      ```
      server.get('/enpoint', (req, res) => {res.send('Some String or Whatever');})
      ```
    
    - Example: 
      ```
      server.get('/greeting', (req, res) => {res.send('<h2>Greeting: Hello World from Express.js</h2>');})
      ```

    - Example: 
      ```
      server.get('/welcome', (req, res) => {res.send('<p style="color: blue" >Hi, welcome to Express.js</p>');})
      ```

    - Example:
      ```
      const user = {
        name: 'Emanuel',
        lastname: 'Escudero',
        age: 37,
        email: 'emanuel@gmail.com'
      }
      server.get('/user', (req, res) => {
      // El objeto podría estar definido aquí o en otro archivo e importado
      res.send(user);
      })
      ```

    - Example:
      ```
      server.get('/params/:name/:lastname', (req, res) => {const { name, lastname } = req.params;
      res.send(`<h2>Hello ${name} ${lastname}</h2>`);
      })
      ```

      - Example: _http://localhost:3000/query?name=Jane&lastname=Doe_
      ```
      server.get('/query', (req, res) => {
        const consults = req.query;
        res.send(consults)
      })
      ```





# POSSIBLE ERRORS
* Powershell does not run comand nodemon!
    - Run with Gitbash terminal

