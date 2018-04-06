
console.log('extension go here?!')

var allWords = {};
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
            synth.speak(utterThis);
        })
        // synth.speak(utterThis);
        
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
            // var list = '<div style="white-space:nowrap;float:left;"><div style="width:6px;height:18px;background:red;"></div><h1 style="font-size:18px;">'
            // +selectedText[0].toUpperCase()+selectedText.slice(1)+
            // ': </h1></div><p>'
            // +data.data.definition+
            // '</P><div style="position:absolute;margin-top:9%;margin-left:5%;width: 1px;height: 1px;border-bottom: solid 15px rgb(0,0,255);border-left: solid 10px transparent;border-right: solid 10px transparent;transform: rotate(180deg);"></div>';
            
            
            var list = '<div style="display:flex;margin-top:22px;margin-bottom:8px;"><div style="width:5px;height:25px;background:red;"></div><div style="font-size:20px;margin-left:10px;">'+
            selectedText[0].toUpperCase()+selectedText.slice(1)+':</div><div style="margin:6px 10px 18px 12px;">'+data.data.definition+'</div></div>'

            side.innerHTML = list;

            allWords[`${selectedText}`]= `${data.data.definition}`;

            chrome.storage.sync.set({'allWords' : allWords},()=>{console.log('definition has been saved')});
        });


        // var list = '<p>'+selectedText[0].toUpperCase()+selectedText.slice(1)+': '+'</P>';
        // side.innerHTML = list;
        document.body.prepend(side);
        // side.style.display = 'inline-block';
        side.style.verticalAlign = 'middle';
        side.style.maxHeight = '100px';
        side.style.maxWidth = '400px';
        side.style.zIndex = '10';
        side.style.fontFamily = 'futura_bold, sans-serif';
        side.style.position = 'absolute';
        side.style.fontSize = '12px';
        side.style.color = '#262261';
        side.style.boxShadow = '1px 1px 12px 2px rgba(0,0,0,.2)';
        side.style.background = 'white';
        side.style.borderRadius = '10px';
        side.style.marginLeft = location.left+'px';
        side.style.top = (scrolled()+location.top-90)+'px';
        //---------triangle-------------------
        // span.style.width = '1px';
        // span.style.height = '3px';
        // span.style.borderBottom = 'solid 20px rgb(0,0,255)';
        // span.style.borderLeft = 'solid 15px transparent';
        // span.style.borderRight = 'solid 15px transparent';
        // span.style.transform = 'rotate(90deg)';
        // span.style.background = 'red';
        // span.style.marginTop = '80px';
    }
}


// document.getElementsByClassName('tooloTip').addEventListener('click',change);

// function change(){
//     var a = document.querySelector('.toolTip');
//     a.parentNode.removeChild(a); 
// }