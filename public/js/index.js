// index.js
// const BASE_SITE = "127.0.0.0:3000"
function getJson() {
	// body...
	var meeting = document.getElementsByTagName("table");
	//最近会议，我发起的会议，我参加的会议
	var url = ["/meeting/findList", "/meeting/findStartedList", "/meeting/findJoinedList"];
	for (var i = 0; i < meeting.length; i++) {
		getData(url[i], meeting[i]);
	}
}

//发起请求
function getData(url, meeting) {
	// body...
	// var meeting = "meeting"
	var meetingId = 0;
	var request = new XMLHttpRequest();
	request.open("get", url);
	request.setRequestHeader('Content-type', 'application/json');
	// 指定服务端返回的数据类型
	request.responseType = 'json';
	// 监听请求完成事件，然后判断响应是否正确
	request.onload = function (err) {
		// 响应正确，成功拿到后端的数据
		if (this.status === 200 && this.response.code === 200) {
			console.log(url);
			console.log(this.response.data);
			this.response.data.forEach(function (element) {
				// console.log()
				createTd(element, meeting, meetingId);
				meetingId ++;
			});
		}
	};
	// 发起请求
	request.send(null);
}

//向前端展示
function createTd(obj, Meeting, meetingId) {
	var tr = document.createElement("tr");
	tr.setAttribute("id",meetingId);
	tr.setAttribute("onclick", "sendMeetingId(this)");
	var td = document.createElement("td");
	var node = document.createTextNode(obj.name);
	td.appendChild(node);

	// td.setAttribute("id", "meetingName");
	tr.appendChild(td);

	td = document.createElement("td");
	node = document.createTextNode(obj.user.username);
	td.appendChild(node);
	tr.appendChild(td);

	td = document.createElement("td");
	node = document.createTextNode(obj.location);
	td.appendChild(node);
	tr.appendChild(td);

	td = document.createElement("td");
	node = document.createTextNode(obj.start_time);
	td.appendChild(node);
	tr.appendChild(td);

	Meeting.getElementsByTagName('tbody')[0].appendChild(tr);
}

function sendMeetingId(event) {
	// body...
	// var id=event.target.getAttribute('id');
	// console.log(url);
	var id = event.id;
	console.log(id);
	var request = new XMLHttpRequest();
	request.open("get", "/meeting/findList");
	request.setRequestHeader('Content-type', 'application/json');
	// 指定服务端返回的数据类型
	request.responseType = 'json';
	// 监听请求完成事件，然后判断响应是否正确
	request.onload = function (err) {
		// 响应正确，成功拿到后端的数据
		if (this.status === 200 && this.response.code === 200) {
			// console.log(url);
			console.log(this.response.data[id]);
			localStorage.setItem("meetingid",this.response.data[id]._id);
			localStorage.setItem("meetingfile",this.response.data[id].file);
			localStorage.setItem("meetinglocation",this.response.data[id].location);
			localStorage.setItem("meetingname",this.response.data[id].name);
			localStorage.setItem("start_time",this.response.data[id].start_time);
			localStorage.setItem("meetingusername",this.response.data[id].user.username);
			localStorage.setItem('meeting_signal', this.response.data[id].signal_id);
			// localStorage.setItem("meetingusername",this.response.data[id].user.username);
			console.log(localStorage.getItem("meetingid"));
			if (localStorage.getItem('username') && localStorage.getItem('meetingusername')) {

				if (localStorage.getItem('username') === localStorage.getItem('meetingusername')) {
	            	window.location.href='createCheck.html';	
				}
				else
					window.location.href='joinMeet.html';
			}

			
		}
	};
	// 发起请求
	request.send(null);
}

(function() {
	getJson();
}());


// document.getElementById("").onclick = function () {
// 	// body...
// 	window.location.reload();
// }

