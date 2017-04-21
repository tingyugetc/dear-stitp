// login.js


function getDate() {
	// body...

	var name = document.getElementsByName("name")[0].value;

	var psword = document.getElementsByName("psword")[0].value;

	var obj = {
		name: name,
		psword: psword
	};

	var userDate = JSON.stringify(obj);

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
			// request.response 
				//alert("创建成功~");
			return false;
		}
	};
	request.setRequestHeader("Content-Type", "application/json");
	request.send(userDate);


	// console.log(name);

	// console.log(psword);

}


	document.getElementById("login_btn").onclick = function(){
		getDate();
		window.location.href='newMeeting.html';
	}