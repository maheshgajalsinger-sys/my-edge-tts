const express = require('express');
const { MsEdgeTTS } = require('edge-tts-api');
const app = express();
const port = process.env.PORT || 3000;

app.get('/tts', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).send("Text is required");
    try {
        const tts = new MsEdgeTTS();
        await tts.setMetadata("ne-NP-SagarNeural", "audio-24khz-48kbitrate-mono-mp3");
        const filePath = await tts.convert(text);
        res.sendFile(filePath);
    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
