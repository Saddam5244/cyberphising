 const express = require('express');
 const path = require('path');
 const app = express();

app.use(express.static(__dirname));

 app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'Phising.html'));
 });
 app.get('/cyber', (req, res) =>{
    res.sendFile(path.join(__dirname, 'cyber.html'));
 });
 app.get('/register', (req, res) =>{
    res.sendFile(path.join(__dirname, 'Register.html'));
 });
 app.get('/login', (req, res) =>{
    res.sendFile(path.join(__dirname, 'login.html'));
 });


 app.listen(3000, () =>{
    console.log(`Server running on http://localhost:3000`);
 });
