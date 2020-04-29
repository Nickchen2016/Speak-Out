
chrome.runtime.onMessage.addListener(
    function(req,sender,sendRes){
        fetch(`https://api.shanbay.com/bdc/search/?word=${req.selectedText}`)
        .then(res=>res.json())
        .then(res=>{
            sendRes(res);
        });
    return true;
    }
)