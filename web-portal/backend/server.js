require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const authenticate = require('./src/authenticate');

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());

async function getAccessToken() {
    const tokenUrl = process.env.TIMESHEET_OAUTH_TOKEN_URL;
    const clientId = process.env.TIMESHEET_OAUTH_CLIENT_ID;
    const clientSecret = process.env.TIMESHEET_OAUTH_CLIENT_SECRET;

    try {
        const accessToken = await authenticate(tokenUrl, clientId, clientSecret);
        return accessToken;
    } catch (error) {
        console.error('Error obtaining access token:', error);
        throw error; // Rethrow the error to handle it in the calling context
    }
}

// Endpoint to get timesheet
app.get('/entries', async (req, res) => {
    try {
        const accessToken = await getAccessToken(); // Use the new function
        const timesheetServiceUrl = process.env.TIMESHEET_SERVICE_URL;
        const response = await axios.get(`${timesheetServiceUrl}/entries`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error fetching timesheet:', error);
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

// Endpoint to post timesheet entry
app.post('/entry', async (req, res) => {
    try {
        const accessToken = await getAccessToken(); // Use the new function
        const timesheetServiceUrl = process.env.TIMESHEET_SERVICE_URL;
        const response = await axios.post(`${timesheetServiceUrl}/entry`, req.body, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        });
        res.status(response.status).send(response.data);
    } catch (error) {
        console.error('Error post timesheet entry:', error);
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
