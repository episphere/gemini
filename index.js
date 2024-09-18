console.log(`index.js loaded\n${Date()}`);

// application
(async function() {
    let conversation=[]  // system prompt?
    console.log(`async runtime\n${Date()}`);
    const shdown = new ((await import('https://esm.sh/showdown@2.1.0')).default).Converter
    GEM = (await import(`${location.href}gem.mjs`)).GEM
    g1 = new GEM
    provideKey.onclick = function() {
        localStorage.gemKey = prompt(`please provide your API key`)
    }
    showInfo.onchange=function(){
        if(showInfo.checked){
            divList.hidden=false
        }else{
            divList.hidden=true
        }
    }
    embed.onchange=function(){
        if(embed.checked){
            if(embedQ.checked){
                
            }
            if(embedA.checked){
                
            }
            if(embedQA.checked){
                
            }
            setTimeout(_=>embed.checked=false,1000)
        }
        embedQ
    }
    reset.onclick=function(){location.href=location.href}
    promptTextArea.onkeydown = async function(ev) {
        //promptTextArea.focus()
        if((ev.key=='Enter')&(!ev.shiftKey)){
            //console.log(`Enter at ${Date()}`,ev)
            let div = document.createElement('div')
            responseDiv.appendChild(div)
            conversation.push(promptTextArea.value)
            div.innerHTML=`<span style="color:DarkGreen">${promptTextArea.value}</span>`
            //let res = await g1.post(promptTextArea.value);
            let res = await g1.post(conversation.join(' ; '));
            promptTextArea.value='...'
            div.innerHTML+=`<p style="color:blue">${shdown.makeHtml(res.candidates[0].content.parts[0].text)}</p><hr>`
            conversation.push(res.candidates[0].content.parts[0].text)
            promptTextArea.value=''
            promptTextArea.focus()
            console.log(res.candidates,conversation)
        }
    }
})();
