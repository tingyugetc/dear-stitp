document.getElementById("createCheck-btn").onclick = function () {
	sendMeetingId();
}
document.getElementById("signal_list_btn").onclick = function () {
	// sendMeetingId();
	// window.location.href = "signal_list.html";
	window.location.href = "testcamera.html";
}

// signal_list_btn

function sendMeetingId() {
	// body...
	var meetingid = localStorage.getItem("meetingid");
	console.log(meetingid);
	var request = new XMLHttpRequest();
	url = "/meeting/createSignalId";
	request.open("POST", url);
	request.responseType = "json";
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.onload = function () {
		if (this.status === 200) {
			if (this.response.code === 200) {
				// console.log(this.response.data);
				var signal = document.getElementById("signal_id");
				signal.placeholder = this.response.data;
				// localStorage.setItem("signal_id",this.response.data);
				// console.log(localStorage.getItem("signal_id"));
			}
			else
				alert("没获取数据");
		}
		else
			alert("未收到后端响应");
	}
	request.send("meetingId=" + meetingid);
	//'username=' + name 

}