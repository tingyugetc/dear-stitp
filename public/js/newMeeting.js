// newMeeting.js
	
	
	const BASE_SITE = 'http://127.0.0.1:3000';

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
			var id = "div_span";
			var text = "带‘*’的部分为必填";
			AddSpan(id, text);
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

		var url = BASE_SITE + "meeting/create";
		request.open("POST", url);
		req.responseType = 'json';
		request.setRequestHeader("Content-Type", "application/json");
		request.send(dateStr);

		// request.onreadystatechange = function() {
		// 	// callback

		// };
		request.onload = function() {
			if (this.readyState !== 4) return false;
			if (Iftimeout) {
				id = "div_span";
				text = "请求超时"
				AddSpan(id, text);
				return false;
			}
			clearTimeout(timer);
			if (this.status === 200) {
				if (this.response.code === 200) {
					window.location.href='index.html';
				}
				else {
					AddSpan("div_span", this.response.message);
					return false;
				}
			}
			else
				AddSpan("div_span", "网络错误");
		}
		return true;
	}


	function AddSpan(id, text) {

		removeAllChild();
		// console.log(arr);
		var span = document.createElement("span");
		var node = document.createTextNode(text);
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