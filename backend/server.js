const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const cors = require('cors'); // Import CORS module

const app = express();
const port = 3001;
cors({ origin: 'http://localhost:3001' });
app.use(bodyParser.json()); // for parsing application/json
app.use(cors()); // Enable CORS for all routes

// MongoDB connection string
const uri = "mongodb+srv://emredayangac:6431@frcscouting.mjhxeds.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Could not connect to MongoDB", error);
    }
}

// Connect to MongoDB when the server starts
connectToMongoDB();

app.post('/data', async (req, res) => {
    try {
        const database = client.db("FRCS"); // Your database name
        const collection = database.collection("FRCSS"); // Your collection name
        const doc = req.body; // Data sent from the frontend

        const result = await collection.insertOne(doc);
        res.status(201).send(`Document inserted with _id: ${result.insertedId}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error inserting document");
    }
});

app.get('/chart-data', async (req, res) => {
    try {
        const database = client.db("FRCS");
        const collection = database.collection("FRCSS");
        // Fetch and convert matchNumber and teleopAmpScore to integers (if necessary)
        const data = await collection.find({}, {}).toArray();
        data.map(doc => {
            if (typeof doc.matchNumber === 'string') {
                doc.matchNumber = doc.matchNumber.replaceAll('"', '');
                doc.matchNumber = parseInt(doc.matchNumber, 10);
            }

            if (typeof doc.scouterInitials === 'string') {
                doc.scouterInitials = doc.scouterInitials.replaceAll('"', '');
                doc.scouterInitials = doc.scouterInitials.trim()
            }
            if (typeof doc.teamNumber === 'string') {
                doc.teamNumber = doc.teamNumber.replaceAll('"', '');
                doc.teamNumber = parseInt(doc.teamNumber)
            }

            if (typeof doc.matchLevel === 'string') {
                doc.matchLevel = doc.matchLevel.replaceAll('"', '');
                doc.matchLevel = parseInt(doc.matchLevel)
            }

            if  (typeof doc.eventName === 'string') {
                doc.eventName = doc.eventName.replaceAll('"', '');
                doc.eventName = String(doc.eventName)
            }
            if  (typeof doc.autonPosition === 'string') {
                doc.autonPosition = doc.autonPosition.replaceAll('"', '');
                doc.autonPosition = String(doc.autonPosition)
            }
            
        })//teamNumber
        const processedData = data.map(doc => ({
            matchNumber: parseInt(doc.matchNumber, 10),
            teleopAmpScore: parseInt(doc.teleopAmpScores, 10),
            scouterInitials: doc.scouterInitials,
            speakerScores: parseInt(doc.speakerScores),
            endgameTimer: parseInt(doc.endgameTimer),
            teamNumber: parseInt(doc.teamNumber),
            ampScores: parseInt(doc.ampScores),
            teleopPickupFrom: String(doc.teleopPickupFrom),
            endgameNoteInTrap: String(doc.endgameNoteInTrap),
            comments: String(doc.comments),
            eventName: String(doc.eventName),
            selectedTeam: String(doc.selectedTeam),
            endfameFinalStatus: String(doc.endgameFinalStatus),
            driverSkill: String(doc.driverSkill),
            teleopSpeakerScores: parseInt(doc.teleopSpeakerScores),
            defenseRating: String(doc.defenseRating),
            speedRating: parseInt(doc.speedRating),
            teleopTimesAmplified: parseInt(doc.teleopTimesAmplified),
            autonPosition: String(doc.autonPosition),
            leaveStartingZone: String(doc.leaveStartingZone)

        })); 
        res.json(processedData);
    } catch (error) {
        console.error("Failed to fetch data", error);
        res.status(500).json({ message: "Failed to fetch data" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
