# Nodemon Error:

nodemon : No se puede cargar el archivo C:\Users\escud\AppData\Roaming\npm\nodemon.ps1. El archivo 
C:\Users\escud\AppData\Roaming\npm\nodemon.ps1 no está firmado digitalmente. No se puede ejecutar este script en 
el sistema actual. Para obtener más información acerca de la ejecución de scripts y la configuración de la 
directiva de ejecución, consulta about_Execution_Policies en https:/go.microsoft.com/fwlink/?LinkID=135170.
En línea: 1 Carácter: 1
+ nodemon index
+ ~~~~~~~
    + CategoryInfo          : SecurityError: (:) [], PSSecurityException
    + FullyQualifiedErrorId : UnauthorizedAccess

_Solution: 'Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted' ._
- Este comando cambia la política de ejecución para el usuario actual a "Unrestricted" (No restringido), lo que permite la ejecución de scripts sin firmar.
_Solution2: 'Set-ExecutionPolicy Unrestricted -Force' ._
- Cambia la política de ejecución a "Unrestricted". Puede presentar riesgos de seguridad.
_Importante: 'Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned' ._
- Reestablecerá la política de ejecución a "RemoteSigned", que sólo permite la ejecución de scripts firmados digitalmente o aquellos que provengan del sistema local.

=====================================================================================
# STEPS
=====================================================================================

* Global Installation Nodemon ```npm install -g nodemon```
    - Optional Project Installation as a Dependency: ```npm install --save-dev nodemon```
    - Run Nodemon Project: ```nodemon miApp.js```
* Create Project Folder
* Run: _npm init (-y optional)_
* Enter in Project Folder
* Run: _npm install express_ 
    - Optional Global Installation: _npm install -g express_
    - After global installation, you could create Express.js projects in any location using the command _express my-express-app_
* Create Src Folder
* Create App.js file (Or any name)

-------------------------------------------------------------------------------------
# IN FILE PROJECT
-------------------------------------------------------------------------------------

* To use Express:
    - _Syntax before EC6:_ ```const express = require('express');```
    - _Syntax after EC6:_ ```import express from 'express';```
        - It's necessary to add ```"type": "module"``` in pachage.json file
*  _Define constant for express:_ ```const server = express();```
* _Get Method:_ 
    - _Example:_ ```server.get('/enpoint', (req, res) => {res.send('Some String or Whatever');})```
    - _Example:_ ```server.get('/greeting', (req, res) => {res.send('<h2>Greeting: Hello World from Express.js</h2>');})```
    - _Example:_ ```server.get('/welcome', (req, res) => {res.send('<p style="color: blue" >Hi, welcome to Express.js</p>');})```





=====================================================================================
# POSSIBLE ERRORS
=====================================================================================
* Powershell does not run comand nodemon!
    - Run with Gitbash terminal

