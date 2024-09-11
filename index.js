console.log(`index.js loaded\n${Date()}`);

// application
(async function(){
    console.log(`async runtime\n${Date()}`);
    GEM = (await import(`${location.href}gem.mjs`)).GEM
})();