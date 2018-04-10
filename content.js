
console.log('extension go here?!')

var allWords = [];
var voices = [];
var synth = window.speechSynthesis;

// $("head").prepend("<style type=\"text/css\">" + 
//                                 "@font-face {\n" +
//                                     "\tfont-family: \"futura_bold\";\n" + 
//                                     "\tsrc: url('/font/futura_bold.otf');\n" + 
//                                 "}\n" +  
//                             "</style>");

//Caculate the scrolling distance.
function scrolled(){
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : document.body.scrollTop;
    // console.log(scrollTop);
    return scrollTop;
}


window.addEventListener('mouseup', wordSelected);
function wordSelected(){
    var selectedText = window.getSelection().toString().toLowerCase();
    voices = synth.getVoices();
//Speech Synthesis setup here.
    if(selectedText.length>0){

        var utterThis = new SpeechSynthesisUtterance(selectedText);
        chrome.storage.sync.get('gender',(data)=>{
            if(data.gender==='0'){
                utterThis.voice = voices[0];
            }else{
                utterThis.voice = voices[48];
            }
        })

        chrome.storage.sync.get('onOff',(data)=>{
            if(data.onOff==='1'){
                chrome.storage.sync.get('value',(data)=>{
        
                    utterThis.rate = data.value;
                    synth.speak(utterThis);
                })
            }
        })
        
        console.log(selectedText)
    }


 //Tooltip check here
     var location = window.getSelection().getRangeAt(0).getBoundingClientRect();
     if(selectedText.length>0 && !(/[^a-z-]/g.test(selectedText))){


        var side = document.createElement('div');
        side.className = 'toolTip';
        $.getJSON(`https://api.shanbay.com/bdc/search/?word=${selectedText}`,function(data){
            // console.log(data.data.definition);

            if(data.data.definition!=undefined){
                side.innerHTML = '<div style="display:flex;margin-top:20px;"><div style="width:6px;height:32px;background:red;"></div><div class="wordTitle" style="font-size:26px;margin:2px 20px 0 10px;">'+
                selectedText[0].toUpperCase()+selectedText.slice(1)+':</div></div><div style="margin:0 18px 25px 18px;">'+data.data.definition+'</div>'

            }
            else{
                side.innerHTML = '<div style="display:flex;margin-top:20px;"><div style="width:6px;height:32px;background:red;"></div><div class="wordTitle" style="font-size:26px;margin:2px 20px 0 10px;">'+
                selectedText[0].toUpperCase()+selectedText.slice(1)+':</div></div><div style="margin:0 18px 25px 18px;">该词义还未收入扇贝词典😳</div>'

            }

            // side.innerHTML = list;

//Save Searched words data into chrome storage for future usage 
            if(allWords.length===20){
                allWords.shift();
                allWords.push([`${selectedText}`,`${data.data.definition}`]);
                chrome.storage.sync.set({'allWords' : allWords},()=>{console.log('shift the 1st, push in new word')});
            }else{
                allWords.push([`${selectedText}`,`${data.data.definition}`]);
                chrome.storage.sync.set({'allWords' : allWords},()=>{console.log('definition has been saved')});
            }    
        });



        document.body.prepend(side);
        // side.style.display = 'inline-block';
        side.style.verticalAlign = 'middle';
        side.style.maxHeight = '160px';
        side.style.maxWidth = '400px';
        side.style.zIndex = '200';
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