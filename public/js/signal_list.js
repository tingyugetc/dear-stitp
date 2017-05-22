// signal_list.js

(function () {

	var meetingNameEle = document.getElementById("meeting_signal");
	var meetingName = localStorage.getItem("meetingname");
	meetingNameEle.innerHTML = meetingName + "的签到列表";
}());

function getSignalList(argument) {
	// body...
	// var meetingId = localStorage.getItem("meetingid");
	var meetingid = localStorage.getItem("meetingid");
	var userClickId = 0;
	console.log(meetingid);
	var request = new XMLHttpRequest();
	url = "/meeting/userSign";
	request.open("POST", url);
	request.responseType = "json";
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.onload = function () {
		if (this.status === 200) {
			if (this.response.code === 200) {
				this.response.data.forEach(function(username){
					createTd(username, userClickId);
					userClickId ++;
				})
			}
			else
				alert("没获取数据");
		}
		else
			alert("未收到后端响应");
	};
	request.send("meetingId=" + meetingid);
	//'username=' + name 

}

function createTd(obj, userClickId) {
	// var tr = document.createElement("a");
	// tr.setAttribute("id",userClickId);
	// tr.setAttribute("onclick", "sendMeetingId(this)");
	var a = document.createElement("a");
	var node = document.createTextNode(obj);
	a.setAttribute("id",userClickId);
	a.setAttribute("onclick", "showUser(this)");
	a.setAttribute("class", "list-group-item");
	var div = document.getElementById("div_signal");
	div.appendChild(node);
}


document.getElementById("back").onclick = function () { history.go(-1); };

function showUser(event) {
	// body...
	// var id=event.target.getAttribute('id');
	// console.log(url);
	var id = event.id;
	console.log(id);
	var username = document.getElementById(id);
	var request = new XMLHttpRequest();
	request.open("post", "");
	request.setRequestHeader('Content-type', 'application/json');
	// 指定服务端返回的数据类型
	request.responseType = 'json';
	// 监听请求完成事件，然后判断响应是否正确
	request.onload = function (err) {
		// 响应正确，成功拿到后端的数据
		if (this.status === 200 && this.response.code === 200) {
			
		}
	};
	// 发起请求
	request.send("username="+username);

}
