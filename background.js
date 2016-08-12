//event listener when updates
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,thisTab){ 
	var whiteList = localStorage.getItem("whiteList");
	if (thisTab.highlighted == true) {
		var tabURL = thisTab.url;
		tabURL = tabURL.replace(/^.*:\/\//,"");
		tabURL = tabURL.substr(0,tabURL.length - 1);
		if((whiteList == null || whiteList.includes(tabURL) == false) && changeInfo.status == "loading"){
			//if the tab updated is current tab, look through all tabs opened in 
			//current window
			chrome.tabs.query({currentWindow:true},function(tabs){
				for(i = 0; i < tabs.length;i++){
					//if any tab have the same url the swap to existing tab and 
					//remove tab
					if(thisTab.url == tabs[i].url && thisTab.id!=tabs[i].id){
						chrome.tabs.update(tabs[i].id,{highlighted:true},null);
						chrome.tabs.remove(thisTab.id,null);
						break;		
					}
				}
			});
		}
	}
});



