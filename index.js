const express = require('express');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const app = express();
const port = process.env.PORT || 3000;

app.get('/tts', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).send("Text is required");

    try {
        const tts = new MsEdgeTTS();
        await tts.setMetadata("ne-NP-SagarNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        
        // यसले अडियो डाटा स्ट्रिम गर्छ
        const readable = await tts.toStream(text);
        
        res.set('Content-Type', 'audio/mpeg');
        readable.pipe(res);
    } catch (error) {
        res.status(500).send("Error generating audio: " + error.message);
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
