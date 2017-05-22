
// function sendId() {
// 	// body...
// 	var meetingId = localStorage.getItem("meetingid");
// 	console.log(meetingId);
// 	var request = new XMLHttpRequest();
// 	// url = "/meeting/joinMeeting";
// 	url = "/meeting/JionMeeting";
// 	request.open("POST",url);
// 	request.responseType = "json";
// 	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
// 	request.onload = function() {
// 		if (this.status === 200 && this.response.code === 200) {
// 			console.log(this.response);
// 		}
// 		else{
// 			console.log("出错了");
// 		}
// 	}
// 	request.send("meetingId" + meetingId);

// }


document.getElementById("back").onclick = function () { history.go(-1); };

document.getElementById("pre").onclick = function () { history.go(1); };

function sendMeetingId() {
	// body...
	var meetingid = localStorage.getItem("meetingid");
	console.log(meetingid);
	var request = new XMLHttpRequest();
	url = "/meeting/joinMeeting";
	request.open("POST", url);
	request.responseType = "json";
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.onload = function () {
		if (this.status === 200) {
			if (this.response.code === 200) {
				console.log(this.response.data);
				if (this.response.data === '404') {
					alert("404 not found");
				}
				if (this.response.data === '11011') {
					alert("加入会议失败");
				}
				if (this.response.data === '200') {
					alert("成功加入会议");
					window.location.href='camara.html';
				}
				if (this.response.data === '300') {
					alert("您已存在,无需重复加入");
                    window.location.href='camara.html';
                }
			}
			else
				alert("没获取数据");
		}
		else
			alert("没有网络");
	}
	request.send("meetingId=" + meetingid);
	//'username=' + name 

}
// (function (){}())

(function showMeeting() {
	// body...
	var organizer = document.getElementById("organizer");
	organizer.innerHTML = localStorage.getItem("meetingusername");
	var meetingName = document.getElementById("meetingName");
	meetingName.innerHTML = localStorage.getItem("meetingname");
	var location = document.getElementById("location");
	location.innerHTML = localStorage.getItem("meetinglocation");
	var start_time = document.getElementById("start_time");
	start_time.innerHTML = localStorage.getItem("start_time");
	var meetingFile = document.getElementById("meetingFile");
	if(localStorage.getItem("meetingfile")){

		meetingFile.innerHTML = localStorage.getItem("meetingfile");
		// meetingFile.href = localStorage.getItem("meetingfile");
		console.log(meetingFile);
		console.log(localStorage.getItem("meetingfile"));
		console.log(meetingFile.href);		
		// meetingFile.src = localStorage.getItem("meetingfile");
	}
	else
		meetingFile.innerHTML = "没有可下载文件";
}())

document.getElementById("login_btn").onclick = function() {
	sendMeetingId();
	// window.location.href = "index.html";

}

document.getElementById("meetingFile").onclick = function() {
	if(document.getElementById("meetingFile").innerHTML === "没有可下载文件"){
		alert("会议发起者没有上传文件");
	}
	else{
		document.getElementById("meetingFile").href = document.getElementById("")
		// window.location.href=localStorage.getItem("meetingfile");

	}


}

// localStorage.setItem("meetingid",this.response.data[id]._id);
// 			localStorage.setItem("meetingfile",this.response.data[id].file);
// 			localStorage.setItem("meetinglocation",this.response.data[id].location);
// 			localStorage.setItem("meetingname",this.response.data[id].name);
// 			localStorage.setItem("start_time",this.response.data[id].start_time);
// 			localStorage.setItem("meetingusername",this.response.data[id].user.username);

// "photo_id" : 20120124
