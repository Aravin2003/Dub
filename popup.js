
window.onload = function(){
    const quality = document.getElementById('quality')
    const filename = document.getElementById('filename')
    const format = document.getElementById('format')
    const downloadBtn = document.getElementById('download')
    const popupImage = document.getElementById("popup-image");


    chrome.tabs.query({
        'active':true, 
        'lastFocusedWindow': true
    },
    (tabs) => {
       var url = tabs[0].url
       const queryParameters = url.split("?")[1];
       const urlParameters = new URLSearchParams(queryParameters);
       var videoId=urlParameters.get("v");
       var imgURL= "http://img.youtube.com/vi/"+videoId+ "/0.jpg";
       popupImage.src=imgURL;
    });


    downloadBtn.onclick = function(){
        downloadBtn.innerText = "Downloading"
        chrome.tabs.query({
            'active':true, 
            'lastFocusedWindow': true
        },
        (tabs) => {
           var url = tabs[0].url
            var message = {
                'url': url,
                'quality':quality.value,
                'filename': filename.value,
                'format' : format.value
            };
            chrome.runtime.sendMessage(message);
        })
    }
}
