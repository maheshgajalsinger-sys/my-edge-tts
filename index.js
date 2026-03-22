const express = require('express');
const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const app = express();
const port = process.env.PORT || 3000;

app.get('/tts', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.status(400).send("Text is required");

    try {
        const tts = new MsEdgeTTS();
        // आवाज र फर्म्याट सेट गर्ने
        await tts.setMetadata("ne-NP-SagarNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        
        // अडियो फाइल जेनेरेट गर्ने
        const readable = await tts.toStream(text);
        
        // ब्राउजरलाई यो अडियो फाइल हो भनेर जानकारी दिने
        res.set({
            'Content-Type': 'audio/mpeg',
            'Transfer-Encoding': 'chunked'
        });

        readable.pipe(res);

        // एरर ह्यान्डलिङ
        readable.on('error', (err) => {
            console.error("Stream Error:", err);
            if (!res.headersSent) res.status(500).send("Stream Error");
        });

    } catch (error) {
        console.error("TTS Error:", error);
        res.status(500).send("Error generating audio: " + error.message);
    }
});

// होमपेजमा केही सन्देश देखाउन (टेस्ट गर्न सजिलो हुन्छ)
app.get('/', (req, res) => {
    res.send("Edge TTS API is Live! Use /tts?text=yourtext to generate audio.");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
