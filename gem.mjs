console.log(`gem.mjs (gemini SDK) imported\n${Date()}`);

class GEM {
    constructor(key) {
        this.loadedAt = Date()
        this.key = key || localStorage.gemKey
        if (!this.key) {
            this.key = prompt(`please provide your API key, you can find it at https://aistudio.google.com/app/apikey`)
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
            console.log('res:',res.candidates[0].content.parts[0].text)
            return res
        }
        this.embed=async function(txt="how to best grill sardines",dim=768){
            let res = await (await fetch(`https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-goog-api-key': `${this.key}`
                },
                body: JSON.stringify({
                    "model": "models/text-embedding-004",
                    "output_dimensionality":dim,
                    "content": {
                        "parts": [{
                            "text": txt
                        }]
                    }
                })
            })).json()
            console.log(res)
            return res.embedding.values
        }
        this.chat=async function(div,url='https://episphere.github.io/gemini/connectStudy.txt'){ // target div and context url 
            console.log(`chatting ...`)
            let txt = await (await fetch(url)).text()
            if(typeof(div)=='string'){
                div = document.getElementById(div)
            }
            if(!div){
                div = document.createElement('div')
                document.body.appendChild(div)
            }
            // scafold 
            div.innerHTML=`<div id="divQuestion"></div><hr><textarea id="txtPrompt">experimental bot, don't take seriously</textarea>`
            // operate on textarea
            let txtPrompt = div.querySelector('#txtPrompt')
            let that=this
            txtPrompt.onkeyup=async function(ev){
                if(ev.key=='Enter'){
                    console.log(ev.target.value,that)
                    let ans = await that.post(ev.target.value)
                    console.log(ans)
                }
            }
            4
        }
    }
}

export {GEM}
