console.log(`standalone gemini chat deployed at \n${Date()}`);

const shdown = new ((await import('https://esm.sh/showdown@2.1.0')).default).Converter
const mod = (await import('https://episphere.github.io/gemini/gem.mjs'))
const gem = new mod.GEM(mod.validKey())
const post = gem.post
let conversation=[]

async function converse(conversation=[],url='https://episphere.github.io/gemini/connectStudy.txt'){
    if(conversation.length==0){
        let txt = await (await fetch(url)).text()
        conversation=[txt]
    }
    let res = await post(conversation.join(' ; '))
    conversation.push(res.candidates[0].content.parts[0].text)
    return conversation 
    // note recursion:
    // conversation = await converse(conversation)
}

async function chat(div,url='https://episphere.github.io/gemini/connectStudy.txt'){
    if (typeof (div) == 'string') {
        div = document.getElementById(div)
    }
    if (!div) {
        div = document.createElement('div')
        document.body.appendChild(div)
    }
    //const shadow = div.attachShadow({ mode: "open" });
    console.log('chatting at ',div)
    div.innerHTML = `<hr><div id="divConverse"></div><textarea id="txtPrompt" style="width:40em">studying documentation at ${url}...</textarea><br>[<a href="${url}" target="_blank">source</a>]`
    //debugger
    let divConverse = div.querySelector('#divConverse')
    let divExchange = document.createElement('div') // individual exchange
    let txtPrompt = div.querySelector('#txtPrompt')
    divConverse.appendChild(divExchange)
    conversation = await converse([],url)
    conversation.push('write brief summary')
    conversation = await converse(conversation)
    
    divExchange.innerHTML=`<span style="color:maroon">${shdown.makeHtml(conversation[3])}</span><hr>`
    txtPrompt.value=''
    txtPrompt.focus()
    txtPrompt.onkeyup = async function(ev) {
        if (ev.key == 'Enter') {
            let divQuestion = document.createElement('div')
            divConverse.appendChild(divQuestion)
            divQuestion.innerHTML=`<p style="color:darkgreen">${txtPrompt.value}</p>`
            conversation.push(txtPrompt.value)
            txtPrompt.value='...'
            conversation = await converse(conversation)
            txtPrompt.value=''
            let divAnswer = document.createElement('div')
            divConverse.appendChild(divAnswer)
            divAnswer.innerHTML=`<span style="color:navy">${shdown.makeHtml(conversation.slice(-1)[0])}</span><hr>`
        }
    }
}

//(await import("https://episphere.github.io/gemini/chat.mjs")).chat(document.body,'https://episphere.github.io/gemini/TCGA-BP-5195.25c0b433-5557-4165-922e-2c1eac9c26f0.txt')

export {converse,chat}
