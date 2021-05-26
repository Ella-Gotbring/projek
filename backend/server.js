const express = require('express')
const cors = require('cors')
const Datastore = require('nedb-promise')
const jwt = require('jsonwebtoken');
require("dotenv").config();
const app = express();
const User = require('./models/User.js');
const { verify } = require('./auth')

const Cryptr = require('cryptr')
const cryptr = new Cryptr(process.env.SECRET)

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//streams
const streams = new Datastore({
    filename: './streams.db',
    autoload: true
})

// const streamsDB = require('./data/flowItems.json')

// streamsDB.streams.forEach(stream => {
// 	streams.insert({
// 		date: stream.date,
// 		tags: stream.tags,
// 		content: cryptr.encrypt(stream.content)
// 	})
// })


app.get('/api/flow', verify, async (request, response) => {
	const flowItems = await streams.find({})
	if (flowItems) {
		response.json(flowItems)
		return
	}
	response.status(401).json({ error: 'Couldnt get resources' })
})

app.post('/api/register', async (request, response) => {
	const user = await User.register(request.body);

	if (user) {
		response.status(201).json(user);
	} else {
		response.status(500).json({ error: "Something went wrong" })
	}
})

app.post('/api/login', async (request, response) => {
	const user = await User.auth(request.body);

	if (user) {
		response.json(user);
	} else {
		response.send("please try again")
	}
})

app.listen(5000)
