const express = require('express');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const app = express();
const port = process.env.PORT || 3000;

app.get('/tts', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).send("Text is required");

    try {
        const tts = new MsEdgeTTS();
        // नेपाली सागर भ्वाइस सेट गर्ने
        await tts.setMetadata("ne-NP-SagarNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        
        // अडियो डाटा जेनेरेट गर्ने
        const filePath = await tts.convert(text);
        
        // ब्राउजरमा फाइल पठाउने
        res.sendFile(filePath);
    } catch (error) {
        console.error("TTS Error:", error);
        res.status(500).send("Error generating audio: " + error.message);
    }
});

app.get('/', (req, res) => res.send("API is Live! Use /tts?text=नमस्ते"));

app.listen(port, () => console.log(`Server running on port ${port}`));
