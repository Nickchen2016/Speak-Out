
console.log('Im here!')
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');
var distance = 0;

chrome.storage.sync.get('value',(data)=>{    
  document.getElementById('rateNum').innerHTML = data.value;
  document.getElementById('rate').value = data.value;
})


rate.onchange = function(){
  rateValue.textContent = rate.value;

  chrome.storage.sync.set({'value': rate.value}, ()=>console.log('Setting saved'));
}


chrome.storage.sync.get('allWords',(data)=>{  

  console.log(data.allWords);

  data.allWords.reverse().forEach((el)=>{
//Dynamic innerHTML for #app
      document.getElementById('app').innerHTML += '<div class="slide" style="cursor:pointer;width:315px;height:100%;">'+el[0][0].toUpperCase()+el[0].slice(1)+'</div>';

  });

  //Dynamic click event for #definition
  var className = document.getElementsByClassName('slide');
  // console.log('----------', className[0].innerHTML);
  Array.from(className).forEach((element)=>{
    element.addEventListener('click',()=>{
      // console.log('element here', element.textContent);
     data.allWords.forEach((el)=>{
      if(element.textContent.toLowerCase()===el[0]){
        document.getElementById('definition').innerHTML = '<div style="display:flex;"><div style="background:red;width:2%;height:36px;margin-top:35px;"></div><div style="width:95%;height:30px;font-family:futura_bold;font-size:33px;margin-top:36px;margin-left:20px;">'+el[0][0].toUpperCase()+el[0].slice(1)+' :</div></div><div style="width:85%;height:30px;margin-top:10px;margin-left:28px;margin-bottom:15%;">'+el[1]+'</div>';
        }
     })
    })
  })

//slideshow built here
  var n = data.allWords.length-1;
  document.getElementById('left').addEventListener('click',()=>{
    if(distance>-(n*315) && distance<=0){
      distance-=315;
      document.getElementById('app').style.transform = `translateX(${distance}px)`;
    }else{
      distance=0;
      document.getElementById('app').style.transform = `translateX(${distance}px)`;
    }
  });

  document.getElementById('right').addEventListener('click',()=>{
    if(distance>=-(n*315) && distance<0){
      distance+=315;
      document.getElementById('app').style.transform = `translateX(${distance}px)`;
    }else{
      distance-=(n*315);
      document.getElementById('app').style.transform = `translateX(${distance}px)`;
    }
  });


})

document.getElementById('triangle').addEventListener('click', ()=>{
  document.getElementById('definition').innerHTML = '';
})


