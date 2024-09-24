console.log(`index.js loaded\n${Date()}`);

// dependencies

//saveFile = (await import('https://jonasalmeida.github.io/jmat/jmat.mjs')).saveFile

// application

(async function() {
    const saveFile = (await import('https://jonasalmeida.github.io/jmat/jmat.mjs')).saveFile
    let conversation = []
    // system prompt?
    console.log(`async runtime\n${Date()}`);
    const shdown = new ((await import('https://esm.sh/showdown@2.1.0')).default).Converter
    GEM = (await import(`${location.href}gem.mjs`)).GEM
    g1 = new GEM
    
    provideKey.onclick = function() {
        localStorage.gemKey = prompt(`please provide your API key, you can find it at https://aistudio.google.com/app/apikey`)
    }
    
    showInfo.onchange = function() {
        if (showInfo.checked) {
            divList.hidden = false
        } else {
            divList.hidden = true
        }
    }
    
    embed.onclick = async function() {
        let n = conversation.length
        promptTextArea.value = '...'
        if (embedQ.checked) {
            let ebs = await g1.embed(conversation[n - 2]);
            promptTextArea.value = JSON.stringify(ebs)
            console.log('Q', conversation[n - 2])
        }
        if (embedA.checked) {
            let ebs = await g1.embed(conversation[n - 1]);
            promptTextArea.value = JSON.stringify(ebs)
            console.log('A', conversation[n - 1])
        }
        if (embedQA.checked) {
            let ebs = await g1.embed(conversation.slice(n - 2, n).join(' , '));
            promptTextArea.value = JSON.stringify(ebs)
            console.log('QA', conversation.slice(n - 2, n))
        }
        if (embedQAs.checked) {
            let ebs = await g1.embed(conversation.join(' , '));
            promptTextArea.value = JSON.stringify(ebs)
            console.log('QAs', conversation)
        }
    }
    
    toFile.onclick = function() {
        saveFile(promptTextArea.value, [...document.getElementsByName('embedTarget')].filter(x => x.checked)[0].id + '.json')
    }
    
    toMemory.onclick = function() {
        let txt = promptTextArea.value
        navigator.clipboard.writeText(txt)
        toMemory.style.backgroundColor = 'lime'
        setTimeout(function() {
            toMemory.style.backgroundColor = ''
        }, 300)
    }
    
    reset.onclick = function() {
        location.href = location.href
    }

    clear.onclick=function(){
        promptTextArea.value=''
    }
    
    promptTextArea.onkeydown = async function(ev) {
        //promptTextArea.focus()
        if ((ev.key == 'Enter') & (!ev.shiftKey)) {
            //console.log(`Enter at ${Date()}`,ev)
            let div = document.createElement('div')
            responseDiv.appendChild(div)
            conversation.push(promptTextArea.value)
            div.innerHTML = `<span style="color:DarkGreen">${promptTextArea.value}</span>`
            //let res = await g1.post(promptTextArea.value);
            let res = await g1.post(conversation.join(' ; '));
            promptTextArea.value = '...'
            div.innerHTML += `<p style="color:blue">${shdown.makeHtml(res.candidates[0].content.parts[0].text)}</p><hr>`
            conversation.push(res.candidates[0].content.parts[0].text)
            promptTextArea.value = ''
            promptTextArea.focus()
            console.log(res.candidates, conversation)
        }
    }
}
)();
