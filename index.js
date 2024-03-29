const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('post-body', function (req, res) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '';
});

app.use(cors())
app.use(express.json());
app.use(express.static('dist'))
// app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const info = `<p>The phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>`
    response.send(info)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
    console.log(persons)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name && body.number) {
      if (persons.every(p => p.name !== body.name)) {
        const newPerson = {
          id: parseInt(Math.random() * 1000),
          name: body.name,
          number: body.number 
        }
  
        persons.push(newPerson)
        response.json(newPerson)
      } else {
        response.status(400).json({error: 'name must be unique'})
      }
    } else {
      response.status(400).json({error: 'fill in both name and number'})
    }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log('Server running on port '+ PORT))