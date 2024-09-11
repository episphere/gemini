console.log(`gem.mjs (gemini SDK) imported\n${Date()}`);

class GEM {
    constructor(key) {
        this.loadedAt = Date()
        this.key = key || localStorage.gemKey
        if (!this.key) {
            this.key = prompt(`please provide your API key`)
            localStorage.gemKey = this.key
        }
        this.post = function(txt="Explain how AI works") {
            return fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': `${this.key}`
                },
                body: JSON.stringify({
                    "contents": [{
                        "parts": [{
                            "text": txt
                        }]
                    }]
                })
            }).then(response => response.json()).then(data => console.log(data)).catch(error => console.error('Error:', error));
        }
    }
}

export {GEM}
