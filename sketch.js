
console.log('Im here!')
// var rate = document.querySelector('#rate');
// var rateValue = document.querySelector('.rate-value');
var url;

// const upper = document.getElementById("upper");
// const tri = document.getElementById("tri");
// tri.addEventListener("click",change);

// function change(){
//   if(!upper.classList.contains("active")){
//     upper.classList.add("active")
//   }else{
//     upper.classList.remove("active")
//     console.log('------------------',upper.classList)
//   }
// }

chrome.storage.sync.get('word',(data)=>{  

  console.log(data.word);
})

//  function setup(){
//    noCanvas();
  //  let bgpage = chrome.extension.getBackgroundPage();
  //  let word = bgpage.word;
  //  console.log(word);
  
  //  let url = `https://api.shanbay.com/bdc/search/?word=${word}`
  // loadJSON(url ,gotData);

  //  let url = `http://api.wordnik.com:80/v4/word.json/${word}/definitions?limit=1&includeRelated=false&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`
  //  loadJSON(url ,gotData);

  //  function gotData(data){

  //   // createP(data[0].text);
  //   if(data.data.definition){
  //   document.getElementById('defination').innerHTML = word[0].toUpperCase()+word.slice(1)+ ':  '+ data.data.definition;
  // }}
  // return word;
//  }

// rate.onchange = function(){
//   rateValue.textContent = rate.value;

//   chrome.storage.sync.set({'value': rate.value}, ()=>console.log('Setting saved'));
// }

// chrome.storage.sync.get('value',(data)=>{    
//   document.getElementById('rateNum').innerHTML = data.value;
// })

