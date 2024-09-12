console.log(`gem.mjs (gemini SDK) imported\n${Date()}`);

class GEM {
    constructor(key) {
        this.loadedAt = Date()
        this.key = key || localStorage.gemKey
        if (!this.key) {
            this.key = prompt(`please provide your API key`)
            localStorage.gemKey = this.key
        }
        this.post = async function(txt="how to best grill sardines") {
            let res = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent`, {
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
            })).json()
            //console.log(JSON.stringify(res.candidates[0].content,null,3))
            console.log('res:',res.candidates[0].content.parts[0].text)
            return res
        }
    }
}

export {GEM}
