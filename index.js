const express = require('express');
const { EdgeTTS } = require('edge-tts');
const app = express();
const port = process.env.PORT || 3000;

app.get('/tts', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).send("Text is required");

    try {
        const tts = new EdgeTTS();
        // नेपाली आवाज (Sagar) सेट गर्दै
        await tts.ttsPromise(text, 'ne-NP-SagarNeural');
        
        // यसले सिधै अडियो फाइल पठाउँछ
        res.set('Content-Type', 'audio/mpeg');
        res.send(tts.audioData);
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
