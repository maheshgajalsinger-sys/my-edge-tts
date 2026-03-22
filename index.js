const express = require('express');
const { EdgeTTS } = require('microsoft-edge-tts');
const app = express();
const port = process.env.PORT || 3000;

app.get('/tts', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).send("Text is required");

    try {
        const tts = new EdgeTTS();
        // नेपाली आवाज सेट गर्दै
        const buffer = await tts.toBuffer(text, "ne-NP-SagarNeural");
        
        res.set('Content-Type', 'audio/mpeg');
        res.send(buffer);
    } catch (error) {
        console.error("TTS Error:", error);
        res.status(500).send("Error generating audio: " + error.message);
    }
});

app.get('/', (req, res) => res.send("API is Live! Use /tts?text=नमस्ते"));

app.listen(port, () => console.log(`Server running on port ${port}`));
