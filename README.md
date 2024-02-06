Repo for part 3 of full stack open using Node.js and Express 

# Links
 To use this web service, use the link [Render Link](https://notes-v2-backend.onrender.com) 

# API Usage
1. Read All Contacts
`GET /api/persons` - Returns a JSON list of persons data stored in a Javascript variable

2. Read Single Contact
`GET /api/persons/:id` - Returns a JSON object of person data with the specified id

3. Add User
`POST /api/persons` - Takes a JSON body object of a contact's data stored and stores temporarily in a Javascript variable

Body Example: { "name": "John doe", "number": "254-555-000-123"}

4. Delete Contact
`DELETE /api/persons/:id` - Deletes contact of person with specified id
