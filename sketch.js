
console.log('Im here!')
var rate = document.querySelector('#rate');
var onOff = document.querySelector('#onOff');
var changed = document.getElementById('onOff');
var distance = 0;


document.getElementById('locker').addEventListener('click', ()=>{
    document.getElementById('offpage').style.display = '';
    document.getElementById('on').classList.add('active');
    document.getElementById('off').classList.remove('active');
    document.getElementById('offpage').classList.add('active');
    changed.value = '1';
    chrome.storage.sync.set({'onOff':'1'},()=>console.log('onOff: '+onOff.value+'saved'));
})

chrome.storage.sync.get('value',(data)=>{    

  if(data.value==='0.4'){
    document.getElementById('sp1').classList.add('active');
    document.getElementById('sp2').classList.remove('active');
    document.getElementById('sp3').classList.remove('active')
  }
  else if(data.value==='1'){
    document.getElementById('sp2').classList.add('active');
    document.getElementById('sp1').classList.remove('active');
    document.getElementById('sp3').classList.remove('active')
  }
  else if(data.value==='1.6'){
    document.getElementById('sp3').classList.add('active');
    document.getElementById('sp1').classList.remove('active');
    document.getElementById('sp2').classList.remove('active')
  }else{
    document.getElementById('sp1').classList.remove('active');
    document.getElementById('sp2').classList.remove('active');
    document.getElementById('sp3').classList.remove('active')
  } 

  document.getElementById('rate').value = data.value;

})
chrome.storage.sync.get('onOff',(data)=>{
  if(data.onOff==='1'){
    document.getElementById('offpage').style.display = 'none';
    document.getElementById('on').classList.add('active');
    document.getElementById('off').classList.remove('active');
  }else{
    document.getElementById('off').classList.add('active');
    document.getElementById('on').classList.remove('active');
    document.getElementById('offpage').style.display = '';
  }
  changed.value = data.onOff;
})

chrome.storage.sync.get('gender',(data)=>{
  if(data.gender==='0'){
    document.getElementById('male').classList.add('active');
    document.getElementById('female').classList.remove('active');
  }else{
    document.getElementById('female').classList.add('active');
    document.getElementById('male').classList.remove('active');
  }
})

//Change speaker gender
document.getElementById('female').addEventListener('click',()=>{
  document.getElementById('female').classList.add('active');
  document.getElementById('male').classList.remove('active');
  chrome.storage.sync.set({'gender':'48'},()=>console.log('female voice been sent!'));
})
document.getElementById('male').addEventListener('click',()=>{
  document.getElementById('male').classList.add('active');
  document.getElementById('female').classList.remove('active');
  chrome.storage.sync.set({'gender':'0'},()=>console.log('male voice been sent!'));
})

onOff.onchange = function(){
  if(onOff.value==='1'){
    document.getElementById('offpage').style.display = '';
    document.getElementById('on').classList.add('active');
    document.getElementById('off').classList.remove('active');
    document.getElementById('offpage').classList.add('active');
  }else{
    document.getElementById('offpage').style.display = '';
    document.getElementById('off').classList.add('active');
    document.getElementById('on').classList.remove('active');
    document.getElementById('offpage').classList.remove('active');
    document.getElementById('wordsdefine').classList.remove('active');
  }
  chrome.storage.sync.set({'onOff':onOff.value},()=>console.log('onOff: '+onOff.value+'saved'));

}

rate.onchange = function(){
  if(rate.value==='0.4'){
    document.getElementById('sp1').classList.add('active');
    document.getElementById('sp2').classList.remove('active');
    document.getElementById('sp3').classList.remove('active')
  }
  else if(rate.value==='1'){
    document.getElementById('sp2').classList.add('active');
    document.getElementById('sp1').classList.remove('active');
    document.getElementById('sp3').classList.remove('active')
  }
  else if(rate.value==='1.6'){
    document.getElementById('sp3').classList.add('active');
    document.getElementById('sp1').classList.remove('active');
    document.getElementById('sp2').classList.remove('active')
  }else{
    document.getElementById('sp1').classList.remove('active');
    document.getElementById('sp2').classList.remove('active');
    document.getElementById('sp3').classList.remove('active')
  } 

  chrome.storage.sync.set({'value': rate.value}, ()=>console.log('Setting saved'));
}

chrome.storage.sync.get('allWords',(da)=>{  

  da.allWords&&da.allWords.reverse().forEach(el=>{
  //Dynamic loading event for vocabularies (innerHTML for #app)
      document.getElementById('app').innerHTML += '<div class="slide inactive" style="cursor:pointer;width:315px;height:100%;margin-top:0px;"><p style="margin-top:18px;">'+el[0][0].toUpperCase()+el[0].slice(1)+'</p></div>';
  });

  //Dynamic loading event for #definition
  var className = document.getElementsByClassName('slide');

  Array.from(className).forEach(element=>{
    element.addEventListener('click',()=>{

     da.allWords.forEach((el)=>{
      if(element.textContent.toLowerCase()===el[0] && el[1]!='undefined'){
        document.getElementById('definition').innerHTML = '<div style="display:flex;"><div style="background:red;width:2.5%;height:36px;margin-top:35px;"></div><div style="width:95%;height:30px;font-family:futura_bold;font-size:33px;margin-top:36px;margin-left:20px;">'+el[0][0].toUpperCase()+el[0].slice(1)+':</div></div><div style="width:85%;height:30px;margin-top:10px;margin-left:28px;margin-bottom:15%;">'+el[1]+'</div>';
        document.getElementById('wordsdefine').classList.add('active');
      }
      if(element.textContent.toLowerCase()===el[0] && el[1]==='undefined'){
        document.getElementById('definition').innerHTML = '<div style="display:flex;"><div style="background:red;width:2.5%;height:36px;margin-top:35px;"></div><div style="width:95%;height:30px;font-family:futura_bold;font-size:33px;margin-top:36px;margin-left:20px;">'+el[0][0].toUpperCase()+el[0].slice(1)+':</div></div><div style="width:85%;height:30px;margin-top:10px;margin-left:28px;margin-bottom:15%;">该词义还未收入扇贝词典😳</div>';
        document.getElementById('wordsdefine').classList.add('active');

      }
     })
    })
  })

//slideshow built here
  var n = da.allWords&&da.allWords.length-1;
  document.getElementById('right').addEventListener('click',()=>{
    if(distance>-(n*100) && distance<=0){
      distance-=100;
      document.getElementById('app').style.transform = `translateX(${distance}%)`;
      if(da.allWords[Math.abs(distance/100)][1]!='undefined'){
        document.getElementById('definition').innerHTML = '<div style="display:flex;"><div style="background:red;width:2.5%;height:36px;margin-top:35px;"></div><div style="width:95%;height:30px;font-family:futura_bold;font-size:33px;margin-top:36px;margin-left:20px;">'+da.allWords[Math.abs(distance/100)][0][0].toUpperCase()+da.allWords[Math.abs(distance/100)][0].slice(1)+':</div></div><div style="width:85%;height:30px;margin-top:10px;margin-left:28px;margin-bottom:15%;">'+da.allWords[Math.abs(distance/100)][1]+'</div>';
      }
      if(da.allWords[Math.abs(distance/100)][1]==='undefined'){
        document.getElementById('definition').innerHTML = '<div style="display:flex;"><div style="background:red;width:2.5%;height:36px;margin-top:35px;"></div><div style="width:95%;height:30px;font-family:futura_bold;font-size:33px;margin-top:36px;margin-left:20px;">'+da.allWords[Math.abs(distance/100)][0][0].toUpperCase()+da.allWords[Math.abs(distance/100)][0].slice(1)+':</div></div><div style="width:85%;height:30px;margin-top:10px;margin-left:28px;margin-bottom:15%;">该词义还未收入扇贝词典😳</div>';
      }
    }
  });

  document.getElementById('left').addEventListener('click',()=>{
    if(distance>=-(n*100) && distance<0){
      distance+=100;
      document.getElementById('app').style.transform = `translateX(${distance}%)`;
      if(da.allWords[Math.abs(distance/100)][1]!='undefined'){
        document.getElementById('definition').innerHTML = '<div style="display:flex;"><div style="background:red;width:2.5%;height:36px;margin-top:35px;"></div><div style="width:95%;height:30px;font-family:futura_bold;font-size:33px;margin-top:36px;margin-left:20px;">'+da.allWords[Math.abs(distance/100)][0][0].toUpperCase()+da.allWords[Math.abs(distance/100)][0].slice(1)+':</div></div><div style="width:85%;height:30px;margin-top:10px;margin-left:28px;margin-bottom:15%;">'+da.allWords[Math.abs(distance/100)][1]+'</div>';
      }
      if(da.allWords[Math.abs(distance/100)][1]==='undefined'){
        document.getElementById('definition').innerHTML = '<div style="display:flex;"><div style="background:red;width:2.5%;height:36px;margin-top:35px;"></div><div style="width:95%;height:30px;font-family:futura_bold;font-size:33px;margin-top:36px;margin-left:20px;">'+da.allWords[Math.abs(distance/100)][0][0].toUpperCase()+da.allWords[Math.abs(distance/100)][0].slice(1)+':</div></div><div style="width:85%;height:30px;margin-top:10px;margin-left:28px;margin-bottom:15%;">该词义还未收入扇贝词典😳</div>';
      }
    }
  });

})

document.getElementById('triangle').addEventListener('click', ()=>{
  document.getElementById('wordsdefine').classList.remove('active');
})
