console.log(`gem.mjs (gemini SDK) imported\n${Date()}`);

class GEM {
    constructor(key){
        this.loadedAt=Date()
        this.key = key
    }
}

export{
    GEM
}