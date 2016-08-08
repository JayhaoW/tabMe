var urls= {};
console.log("hi there");

//use to get the url of all tabs
/*
chrome.tabs.query({currentWindow:true},function(tabs){
	urls = tabs;
	for (i = 0; i < urls.length; i++){
		console.log(urls[i].url);
	}
});
*/

chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,thisTab){
	console.log("activate");
	//console.log(thisTab.highlighted);
	if (thisTab.highlighted == true) {
		//console.log("Second");
		chrome.tabs.query({currentWindow:true},function(tabs){
			for(i = 0; i < tabs.length;i++){
				if(thisTab.url == tabs[i].url && thisTab.id!=tabs[i].id){
					chrome.tabs.update(tabs[i].id,{highlighted:true},null);
					console.log(thisTab.index);
					console.log(thisTab.url);
					console.log("tab url: " + tabs[i].url);
					console.log("tab index: " + tabs[i].index);

					chrome.tabs.remove(thisTab.id,null);
					break;
					//console.log(i);
				}
			}
		});
	}
});

/*
chrome.tabs.onUpdate.addListener(function(tabId,changeInfo,tab){
	if(changeInfo.status == "loading"){
		if()
	}
});
*/



