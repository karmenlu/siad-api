const express = require('express')
const bodyParser = require('body-parser')
var boolParser = require('express-query-boolean');
const cors = require('cors')
const PORT = process.env.PORT || 5000
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express()
const db = require('./queries')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(boolParser());
app.use(cors())

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/ideas', db.getIdeas)
app.get('/ideas/:id', db.getIdeaById)
app.post('/ideas', db.createIdea)
app.put('/ideas/:id', db.updateIdea)
app.delete('/ideas/:id', db.deleteIdea)
app.get('/cost/:min/:max', db.getIdeasByCostMinMax)
app.get('/bydayparts/:morning/:afternoon/:evening/:overnight', db.getIdeasByDayparts)
app.get('/costdayparts/:min/:max/:morning/:afternoon/:evening/:overnight', db.getIdeasByCostAndDayparts)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
