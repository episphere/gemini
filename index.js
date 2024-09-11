console.log(`index.js loaded\n${Date()}`);

// module
GEM = (await import('http://localhost:8000/gemini/gem.mjs')).GEM

// application
(async function(){
    console.log(`async runtime\n${Date()}`);
    
    
})()