// newMeeting.js

	function getDate() {
		// body...
		var name = document.getElementById("input_name");
		var address = document.getElementById("input_address");
		var date = document.getElementById("input_date");
		var describe = document.getElementById("input_describe");
		console.log(name.value);
		console.log(address.value);
		console.log(date.value);
		console.log(describe.value);
		document.write(describe.value);
		if (name.value == "" || address.value == "" || date.value == "") {
			//var id = "div_span";
			AddSpan();
			return false;
		}



		var obj = {
			name: name,
			address: address,
			date: date,
			describe: describe
		};

		return true;
	}


	function AddSpan() {

    	// var div = document.getElementById("div_span"); 
    	// div.innerHTML = '';

		removeAllChild();
		// console.log(arr);
		var span = document.createElement("span");
		var node = document.createTextNode("带‘*’的部分为必填");
		span.appendChild(node);
		var element = document.getElementById("div_span");
		element.appendChild(span);

	}


	function removeAllChild() {  

		var div = document.getElementById("div_span");
    	//console.log(div);
    	//if(div.hasChildNodes())
    	while (div.hasChildNodes()) { //当div下还存在子节点时 循环继续  
        	div.removeChild(div.firstChild);  
    	}  
	}

	document.getElementById("login_btn").onclick = function(){
		var a = getDate();
		if(a){
			return true;
		}
		else
			return false;
	}