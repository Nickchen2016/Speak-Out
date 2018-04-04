
console.log('extension go here?!')

var synth = window.speechSynthesis;

//Caculate the scrolling distance.
function scrolled(){
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : document.body.scrollTop;
    // console.log(scrollTop);
    return scrollTop;
}


window.addEventListener('mouseup', wordSelected);
function wordSelected(){
    var selectedText = window.getSelection().toString().toLowerCase();
    //Speech Synthesis setup here.
    if(selectedText.length>0){

        var utterThis = new SpeechSynthesisUtterance(selectedText);

        chrome.storage.sync.get('value',(data)=>{
    
            utterThis.rate = data.value;
        })
        synth.speak(utterThis);
        
        console.log(selectedText)
        //chrome.storage.sync.set({'word': selectedText},()=>{console.log('word sent from content')});
        // let message = {
        //     text: selectedText
        // };
        // chrome.runtime.sendMessage(message);
    }
     var location = window.getSelection().getRangeAt(0).getBoundingClientRect();
     //Tooltip check here
     if(selectedText.length>0 && !(/[^a-z-]/g.test(selectedText))){


        var side = document.createElement('div');
        // side.className = 'toolTip';
        $.getJSON(`https://api.shanbay.com/bdc/search/?word=${selectedText}`,function(data){
            console.log(data);
            var list = '<p>'+selectedText[0].toUpperCase()+selectedText.slice(1)+': '+data.data.definition+'</P>';
            side.innerHTML = list;
        });
        // var list = '<p>'+selectedText[0].toUpperCase()+selectedText.slice(1)+': '+'</P>';
        // side.innerHTML = list;
        document.body.prepend(side);
        side.style.height = '40px';
        side.style.zIndex = '1';
        side.style.position = 'absolute'
        side.style.fontSize = '22px';
        side.style.background = 'yellow';
        side.style.marginLeft = location.left+'px';
        side.style.top = (scrolled()+location.top-40)+'px';
    }   
}