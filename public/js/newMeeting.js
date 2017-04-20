// newMeeting.js

	function getDate() {
		// body...
		var name = document.getElementById("input_name");
		var address = document.getElementById("input_address");
		var date = document.getElementById("input_date");
		var describe = document.getElementById("input_describe");

		var obj = {
			name: name.value,
			address: address.value,
			date: date.value,
			describe: describe.value
		};



		if (name.value == "" || address.value == "" || date.value == "") {
			//var id = "div_span";
			AddSpan();
			return false;
		}

		var dateStr = JSON.stringify(obj);
		console.log(dateStr);

		var request = new XMLHttpRequest();

		var Iftimeout = false;
		var timeCount = 1000;
		var timer = setTimeout(function() {
			Iftimeout = true;
			request.abort();
		},
		timeCount);


		var url = "meeting/create";
		request.open("POST", url);
		request.onreadystatechange = function() {
			// callback
			if (request.readyState !== 4) return false;
			if (Iftimeout) return false;
			clearTimeout(timer);
			if (request.status !== 200) {

				//alert("创建成功~");
				return false;
			}
		};
		request.setRequestHeader("Content-Type", "application/json");
		request.send(dateStr);

		return true;
	}


	function AddSpan() {

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
			window.location.href='index.html';
			return true;
		}
		else
			return false;
	}