const express = require('express');
const { MsEdgeTTS } = require('edge-tts');
const app = express();
const port = process.env.PORT || 3000;

app.get('/tts', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).send("Text is required");

    try {
        const tts = new MsEdgeTTS();
        // नेपाली आवाज सेट गर्दै
        await tts.setMetadata("ne-NP-SagarNeural", "audio-24khz-48kbitrate-mono-mp3");
        
        // अडियो जेनेरेट गरेर सिधै पठाउने
        const readable = await tts.toStream(text);
        
        res.set('Content-Type', 'audio/mpeg');
        readable.pipe(res);
    } catch (error) {
        console.error("TTS Error:", error);
        res.status(500).send("Error generating audio: " + error.message);
    }
});

app.get('/', (req, res) => res.send("API is Live! Use /tts?text=नमस्ते"));

app.listen(port, () => console.log(`Server running on port ${port}`));
