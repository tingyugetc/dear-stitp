// index.js

const BASE_SITE = 'http://127.0.0.1:3000';

function getJson() {
	// body...
	var meeting = document.getElementsByTagName("table");
	console.log(meeting);
	//最近会议，我发起的会议，我参加的会议
	var url = ["/meeting/findList", "/meeting/findStartedList", "/meeting/findJoinedList"];
	for (var i = 0; i < meeting.length; i++) {
		//meeting[i]
		var request = getData(BASE_SITE + url[i]);
		var id = "meeting" + i;
		if (request.code === 200) {
			createTd(request.data, meeting[i], id);
		}
	}
}

//发起请求
function getData(url) {
	// body...
	var request = new XMLHttpRequest();
	request.open("get", url);
	request.setRequestHeader('Content-type', 'application/json');
	// 指定服务端返回的数据类型
	request.responseType = 'json';
	request.send(null);
	console.log(request.data);
	return request;
}

//向前端展示
function createTd(obj, Meeting, id) {
	// body...
	var tr = document.createElement("tr");
	tr.setAttribute("id",id);
	Meeting.appendChild(tr);

	for(var key in obj){
		// console.log(obj[key]);
		var td = document.createElement("td");
		var node = document.createTextNode(obj[key]);
		td.appendChild(node);
		var element = document.getElementById(id);
		element.appendChild(td);
	}
}

(function(){
	getJson();
}());