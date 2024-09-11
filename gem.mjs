console.log(`gem.mjs (gemini SDK) imported\n${Date()}`);

class GEM {
    constructor(key){
        this.loadedAt=Date()
        this.key = key
        if(!this.key){
            this.key=prompt(`please provide your API key`)
            localStorage.gemKey=this.key
        }
    }
}

export{
    GEM
}