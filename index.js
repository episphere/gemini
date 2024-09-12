console.log(`index.js loaded\n${Date()}`);

// application
(async function() {
    console.log(`async runtime\n${Date()}`);
    const shdown = new ((await import('https://esm.sh/showdown@2.1.0')).default).Converter
    GEM = (await import(`${location.href}gem.mjs`)).GEM
    g1 = new GEM
    provideKey.onclick = function() {
        localStorage.gemKey = prompt(`please provide your API key`)
    }
    promptTextArea.onkeydown = async function(ev) {
        promptTextArea.focus()
        if((ev.key=='Enter')&(!ev.shiftKey)){
            //console.log(`Enter at ${Date()}`,ev)
            let div = document.createElement('div')
            responseDiv.appendChild(div)
            div.innerHTML=`<span style="color:darkgreen">${promptTextArea.value}</span>`
            let res = await g1.post(promptTextArea.value);
            promptTextArea.value='...'
            div.innerHTML+=`<p style="color:blue">${shdown.makeHtml(res.candidates[0].content.parts[0].text)}</p><hr>`
            promptTextArea.value=''
            promptTextArea.focus()
            console.log(res.candidates,Date())
        }
    }
})();
