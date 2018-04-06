
console.log('Im here!')
var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

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
})
