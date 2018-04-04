
console.log('Im here!')
// var rate = document.querySelector('#rate');
// var rateValue = document.querySelector('.rate-value');
var url;

chrome.storage.sync.get('word',(data)=>{  

  console.log(data.word);
})

