// signal_list.js

(function () {

	var meetingNameEle = document.getElementById("meeting_signal");
	var meetingName = localStorage.getItem("meetingname");
	meetingNameEle.innerHTML = meetingName + "的签到列表";
}())

function getSignalList(argument) {
	// body...
	// var meetingId = localStorage.getItem("meetingid");
	var meetingid = localStorage.getItem("meetingid");
	var userClickId = 0;
	console.log(meetingid);
	var request = new XMLHttpRequest();
	url = "";
	request.open("POST", url);
	request.responseType = "json";
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.onload = function () {
		if (this.status === 200) {
			if (this.response.code === 200) {
				this.response.data.forEach(function(user){})
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

function createTd(obj, Meeting, userClickId) {
	// var tr = document.createElement("a");
	// tr.setAttribute("id",userClickId);
	// tr.setAttribute("onclick", "sendMeetingId(this)");
	var a = document.createElement("a");
	var node = document.createTextNode(obj.name);

	a.setAttribute("id",userClickId);
	a.setAttribute("onclick", "showUser(this)");
	a.setAttribute("class", "list-group-item");
	a.appendChild(node);
}

function showUser(argument) {
	// body...
}
