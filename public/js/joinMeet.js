
function sendId() {
	// body...
	var joinMeeting = {
		userid: localStorage.getItem("userid"),
		// username: localStorage.getItem("meetingusername"),
		meetingid: localStorage.getItem("meetingid"),
		// meetingname: localStorage.getItem("meetingname")
	};
	var request = new XMLHttpRequest();
	// url = "/meeting/joinMeeting";
	url = "/meeting/getMeeting";
	request.open("GET",url);
	request.responseType = "json";
	request.onload = function() {
		if (this.status === 200 && this.response.code === 200) {
			console.log(this.response);
		}
	}
	request.send(joinMeeting);

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
	meetingFile.innerHTML = localStorage.getItem("meetingfile");
}())

document.getElementById("login_btn").onclick = function() {
	sendId();
	window.location.href = "index.html";

}

// localStorage.setItem("meetingid",this.response.data[id]._id);
// 			localStorage.setItem("meetingfile",this.response.data[id].file);
// 			localStorage.setItem("meetinglocation",this.response.data[id].location);
// 			localStorage.setItem("meetingname",this.response.data[id].name);
// 			localStorage.setItem("start_time",this.response.data[id].start_time);
// 			localStorage.setItem("meetingusername",this.response.data[id].user.username);
