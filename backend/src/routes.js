const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/incidentController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router();


routes.get('/login', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);


routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.get('/profile-incidents/:id', IncidentController.indexOf);
routes.delete('/incidents/:id', IncidentController.delete)



module.exports = routes;