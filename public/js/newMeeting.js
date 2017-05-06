// newMeeting.js
	const BASE_SITE = 'http://127.0.0.1:3000';
	function getDate() {
		var name = document.getElementById("input_name");
		var address = document.getElementById("input_address");
		var start_time = document.getElementById("input_date");
		var meetingFile = document.getElementById("input_file");
		// var describe = document.getElementById("input_describe");

		var obj = {
			name: name.value,
			location: address.value,
			start_time: start_time.value,
			meeting_file: meetingFile.files[0]
		};

		if (name.value === "" || address.value === "" || start_time.value === "") {
			var id = "div_span";
			var text = "带‘*’的部分为必填";
			AddSpan(id, text);
			return false;
		}

		var formData = new FormData();
		formData.append("name", obj.name);
		formData.append("location", obj.location);
		formData.append("start_time", obj.start_time);
		formData.append("meeting", obj.meeting_file);

        var url = BASE_SITE+"/meeting/create";

		var request = new XMLHttpRequest();
		request.open("POST", url);
		request.responseType = 'json';
		request.send(formData);

		request.onload = function() {
			if (this.status === 200) {
				console.log(this.response);
				if (this.response.code === 200) {
					window.location.href='index.html';
				} else {
					AddSpan("div_span", this.response.message);
				}
			} else {
                AddSpan("div_span", "网络错误");
            }
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
		while (div.hasChildNodes()) { //当div下还存在子节点时 循环继续  
			div.removeChild(div.firstChild);  
		}  
	}


	document.getElementById("login_btn").onclick = function(){
		getDate();
	};