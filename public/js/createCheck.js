document.getElementById("createCheck-btn").onclick = function () {
	sendMeetingId();
}

function sendMeetingId() {
	// body...
	var meetingId = localStorage.getItem("meetingid");
	var request = new XMLHttpRequest();
	url = "";
	request.open("GET", url);
	request.responseType = "";
	request.onload = function () {
		if (this.status === 200) {
			if (this.response.code === 200) {
				var signal = document.getElementById("signal_id");
				signal.placeholder = this.response.data;
			}
			else
				alert("没获取数据");
		}
		else
			alert("没有网络");
	}
	request.send(meetingId);

}