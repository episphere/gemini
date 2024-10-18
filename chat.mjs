console.log(`stand alone gemini chat deployed at \n${Date()}`)

const mod = (await  import('./gem.mjs'))
const gem = new mod.GEM(mod.validKey())
const post = gem.post
post('hello')  // testing


//export{
//    post
//}

//get post from instance of GEM
//post = (new (await  import('./gem.mjs')).GEM).post

/*
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
        */

