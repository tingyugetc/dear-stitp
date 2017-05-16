document.getElementById("createCheck-btn").onclick = function () {
	sendMeetingId();
}

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
				console.log(this.response.data);
				var signal = document.getElementById("signal_id");
				signal.placeholder = this.response.data;
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