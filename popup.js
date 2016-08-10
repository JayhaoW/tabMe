//adds listbox display to localStorage
function appendToForm(data){
	var txt1 = "<option>";
	var txt2 = "</option>";
	var old = localStorage.getItem("form");
	if (old === null){
		old = "";
	}
	localStorage.setItem("form", old + txt1 + data + txt2 + "\n");
}

//adds whitelist to localStorage
function appendToWS(data){
	var old = localStorage.getItem("whiteList");
	if(old === null){
		old = "";
	}
	localStorage.setItem("whiteList", old + data + "\n");
	console.log(localStorage.getItem("whiteList"));
}

//when everything is loaded
document.addEventListener('DOMContentLoaded',function(){

	//load list box options from localStorage
	$("select").html(localStorage.getItem("form"));
	//when add is clicked
	document.getElementById("add").addEventListener('click',function(){
		var link;
		link = document.getElementById("url").value;
		if (link != ""){
			//add to listbox option and whitelist
			appendToForm(link);
			appendToWS(link);
			$("select").html(localStorage.getItem("form"));
			document.getElementById("url").value = "";
		}
	});
	//when remove is clicked
	document.getElementById("remove").addEventListener('click',function(){
		//remove the selected option
		$(":selected").remove();
		var str = $("select").html();
		//remove blank lines
		str = str.replace(/^\s*[\r\n]/gm,"");
		//remove tags of new str to store in updated whitelist
		var listStr = str.replace(/<\/?[^>]+(>|$)/g,"");

		//update list box and white list
		localStorage.setItem("form", str);
		localStorage.setItem("whiteList", listStr);

		console.log(localStorage.getItem("whiteList"));
		console.log(localStorage.getItem("form"));
		$("select").html(str);
	});
	document.getElementById("clear").addEventListener('click',function(){
		//reset local storage
		localStorage.setItem("form","");
		localStorage.setItem("whiteList","");
		$("select").html(localStorage.getItem("form"));
	});
});