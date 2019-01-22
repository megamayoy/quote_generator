function quote(quoter,owner)
{
    this.quote = quoter;
    this.owner = owner;
    
}
var quotes = [];


var rand;


document.addEventListener('DOMContentLoaded', function() {

    
        var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('quoter.txt'), true);
xhr.onreadystatechange = function()
{
    if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
    {
       
        var lines = xhr.responseText.split('\n');
        for(var line = 0; line < lines.length; line+=2)
        {
                 quotes[quotes.length] = new quote(lines[line],lines[line+1]);      
    }
        
        
    }
};
xhr.send();
    
    
    
    var checkPageButton = document.getElementById('btn');

  checkPageButton.addEventListener('click', function() {

    rand = Math.floor(Math.random() * quotes.length );
   document.getElementById('demo').innerHTML = quotes[rand].quote;
       document.getElementById('owner').innerHTML =  quotes[rand].owner;
     
         document.getElementById('owner').href = "https://www.google.co.uk/search?hl=en-GB&source=hp&q=" + quotes[rand].owner;
      var location =  document.getElementById('owner').href;
      document.getElementById('owner').onclick = 
      function () {
                chrome.tabs.create({active: true, url: location});
            };
      
});
    
  // book mark
     
    document.getElementById("bmarks").addEventListener('click',function()
    {
         
        
      chrome.tabs.getSelected(null,function(tab) {
    var tablink = tab.url;
          var title = tab.title;
         // console.log(tablink);
           chrome.bookmarks.create({
                               'title': title ,
                               'url': tablink 
                                });
    
                                                  })
    });
        
     
        
    
});