// newMeeting.js
	
	
	const BASE_SITE = 'http://127.0.0.1:3000';

	function getDate() {
		var name = document.getElementById("input_name");
		var address = document.getElementById("input_address");
		var start_time = document.getElementById("input_date");
		
		if (name.value === "" || address.value === "" || start_time.value === "") {
			//var id = "div_span";
			var id = "div_span";
			var text = "带‘*’的部分为必填";
			AddSpan(id, text);
			return false;
		}
		var form = document.getElementById("form_data");
		var formData = new FormData(form);
		// formData.append("meetingName", obj.name);
		// formData.append("meetinglocation", obj.address);
		// formData.append("start_time", obj.start_time);
		// formData.append("meeting_file", meeting_file[0]);

		// var dateStr = JSON.stringify(obj);
		// console.log(dateStr);

		var request = new XMLHttpRequest();

		var Iftimeout = false;
		var timeCount = 1000;
		var timer = setTimeout(function() {
			Iftimeout = true;
			request.abort();
		},
		timeCount);

		var url = BASE_SITE + "/meeting/create";
		request.open("POST", url);
// <<<<<<< HEAD
		// request.responseType = 'json';
		// request.setRequestHeader("Content-Type", "application/json");
		// request.send(dateStr);
// =======
        request.setRequestHeader("Content-Type", "application/form-data");
        request.responseType = 'json';
		request.send('data='+formData);
// >>>>>>> origin/feature/chichi

		request.onload = function() {
			if (this.readyState !== 4) return false;
			if (Iftimeout) {
				id = "div_span";
				text = "请求超时";
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
				AddSpan("div_span", "网络错误500");
		};
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
		getDate();
	};