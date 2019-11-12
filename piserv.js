const express        =        require("express");
const bodyParser     =        require("body-parser");
const app            =        express();

const path           =        require('path');
const huejay         =        require('huejay')
const cors           =        require('cors')
const fs             =        require('fs')

const PORT = 8075
var LOGGING = false
const VERSION = '1.0.1'

function load_config(filename) {
    try {
        var file = fs.openSync(filename,'r')
        var data = fs.readFileSync(file)
        fs.closeSync(file)
        return(JSON.parse(data))
    } catch(e) { return({}) }
}

config = load_config('config.hue')
var { host, user } = config;

//console.log("Config",config)

let client = new huejay.Client({
    host:     host,
    port:     80,               // Optional
    username: user, 
    timeout:  15000,            // Optional, timeout in milliseconds (15000 is the default)
  });

// Express app 

app.use(bodyParser.json());
app.use(express.json());
app.use(cors())

app.use(function (req, res, next) {
    if (LOGGING) console.log('Request:', req.url,' Method: ',req.method)
    next()
  })

app.use(express.static(path.join(__dirname, './build')))
app.use('/piweb',express.static(path.join(__dirname, './build')));

app.get('/api/servdata', (req,res) => res.send({
    servtime: new Date().toISOString(),
    version: VERSION
    }))

app.put('/api/light', function (req, res) {
    if (LOGGING) console.log("Body ",req.body)
    client.lights.getById(req.body.id)
        .then(light => {
        if (LOGGING) console.log(`Found Light [${light.id}]: ${light.name}`);
        light.on = req.body.on;
        light.brightness = req.body.bri
    client.lights.save(light)
    .then(lights => {
        res.json(lights) })
    })
})

app.put('/api/group', function (req, res) {
    if (LOGGING) console.log("Body ",req.body)
    client.groups.getById(req.body.id)
        .then(group => {
        if (LOGGING) console.log(`Found Group [${group.id}]: ${group.name}`);
        group.on = req.body.on;
        group.brightness = req.body.bri
    client.groups.save(group)
    .then(groups => {
        res.json(groups) })
    })
})

app.get('/api/lights', function (req, res) {
    client.lights.getAll()
    .then(lights => {
        res.json(lights) })
})

app.get('/api/groups', function (req, res) {
    client.groups.getAll()
    .then(groups => {
        res.json(groups) })
})

app.get('/api/sensors', function (req, res) {
    client.sensors.getAll()
  .then(sensors => {
        res.json(sensors) })
})

app.get('/api/schedules', function (req, res) {
  client.schedules.getAll()
  .then(scheds => {
        res.json(scheds) })
})

app.get('/api/scenes', function (req, res) {
    client.scenes.getAll()
    .then(scenes => {
          res.json(scenes) })
  })

app.get('/api/rules', function (req, res) {
    client.rules.getAll()
    .then(rules => {
          res.json(rules) })
  })

if (module.parent) {
    console.log("I am an orphan") } 
else { 
    for (var key in process.argv) {
        arg = process.argv[key]
        if (arg == '--log') { LOGGING = true }
    }

    process.env.TZ = 'America/New_York'
    console.log("Time: ",new Date().toLocaleTimeString())

    client.users.get()
    .then(user => {
        console.log('Username:', user.username);
        console.log('Device type:', user.deviceType);
        console.log('Create date:', user.created);
        console.log('Last use date:', user.lastUsed);
    });

    app.listen(PORT,function(){
        console.log("PIserv started on PORT ",PORT);
    })
} 