console.log(`index.js loaded\n${Date()}`);

// UI action
setTimeout(function() {
    (document.getElementById('provideKey')).onclick = function() {
        localStorage.gemKey = prompt(`please provide your API key`)
    }
}, 1000);

// application
(async function() {
    console.log(`async runtime\n${Date()}`);
    GEM = (await import(`${location.href}gem.mjs`)).GEM
})();
