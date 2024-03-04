const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    // Set the secret to be the same as the username for simplicity (replace this with your actual secret logic)
    const secret = username; // Assuming secret is the same as the username for now
    const r = await axios.put(
        'https://api.chatengine.io/users/',
        { username: username, secret: secret, first_name: username },
        { headers: { "private-key": "391c6b63-ae02-449b-a197-2bff05c88889" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.listen(3001);
