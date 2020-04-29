
var allWords = [];
var voices = [];
var synth = window.speechSynthesis;

//Caculate the scrolling distance.
function scrolled(){
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : document.body.scrollTop;
    return scrollTop;
}


window.addEventListener('mouseup', wordSelected);
function wordSelected(){
    var selectedText = window.getSelection().rangeCount>=1?window.getSelection().toString().toLowerCase():'';
    voices = synth.getVoices();
//Speech Synthesis setup here.
    if(selectedText.length>0){

        var utterThis = new SpeechSynthesisUtterance(selectedText);
        chrome.storage.sync.get('gender',(data)=>{
            if(data.gender==='0'){
                utterThis.voice = voices[0];
            }else if(data.gender==='48'){
                utterThis.voice = voices[48];
            }else{
                utterThis.voice = voices[0];
            }
        })

        chrome.storage.sync.get('onOff',(data)=>{
            if(data.onOff==='1'){
                chrome.storage.sync.get('value',(data)=>{
                  if(data.value) utterThis.rate = data.value;
                  synth.speak(utterThis);
                })
            }
        })
    }


 //Tooltip check here
     var location = window.getSelection().getRangeAt(0).getBoundingClientRect();
     if(selectedText.length>0 && !(/[^a-z-]/g.test(selectedText))){


        var side = document.createElement('div');
        side.className = 'toolTip';

        chrome.runtime.sendMessage({selectedText: selectedText}, data=>{

            if(data.data.definition!=undefined){
                side.innerHTML = '<div style="display:flex;margin-top:20px;"><div style="width:6px;height:32px;background:red;"></div><div class="wordTitle" style="font-size:26px;margin:2px 20px 0 10px;">'+
                selectedText[0].toUpperCase()+selectedText.slice(1)+':</div></div><div style="margin:0 18px 25px 18px;">'+data.data.definition+'</div>'

            }
            else{
                side.innerHTML = '<div style="display:flex;margin-top:20px;"><div style="width:6px;height:32px;background:red;"></div><div class="wordTitle" style="font-size:26px;margin:2px 20px 0 10px;">'+
                selectedText[0].toUpperCase()+selectedText.slice(1)+':</div></div><div style="margin:0 18px 25px 18px;">该词义还未收入扇贝词典😳</div>'

            }

//Save Searched words data into chrome storage for future usage 
            chrome.storage.sync.get(('allWords'),(da)=>{

                if(da.allWords&&da.allWords.length===20){
                    da.allWords.shift();
                    da.allWords.push([`${selectedText}`,`${data.data.definition}`]);
                    chrome.storage.sync.set({'allWords' : da.allWords},()=>{console.log('shift the 1st, push in new word')});
                }else if(da.allWords&&da.allWords.length>0){
                    da.allWords.push([`${selectedText}`,`${data.data.definition}`]);
                    chrome.storage.sync.set({'allWords' : da.allWords},()=>{console.log('definition has been saved')});
                }else{
                    allWords.push([`${selectedText}`,`${data.data.definition}`]);
                    chrome.storage.sync.set({'allWords' : allWords},()=>{console.log('First word has been saved')});
                }
            })  
        });



        document.body.prepend(side);
        side.style.verticalAlign = 'middle';
        side.style.maxHeight = '160px';
        side.style.maxWidth = '400px';
        side.style.zIndex = '900';
        side.style.fontFamily = 'sans-serif';
        side.style.position = 'absolute';
        side.style.fontSize = '13px';
        side.style.color = '#262261';
        side.style.boxShadow = '1px 1px 12px 2px rgba(0,0,0,.2)';
        side.style.background = 'white';
        side.style.borderRadius = '10px';
        side.style.marginLeft = location.left+'px';
        side.style.top = (scrolled()+location.top-120)+'px';
    }
}


window.addEventListener('click',()=>{
    Array.from(document.getElementsByClassName('toolTip')).forEach((el)=>{ 
                el.innerHTML = '';        
    })
})