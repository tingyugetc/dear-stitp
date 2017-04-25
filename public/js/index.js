// index.js


const BASE_SITE = 'http://127.0.0.1:3000';

function getJson() {
	// body...
	var obj = {
		meetingName: "meeting",
		userName: "zhangchi",
		meetingAddress: "henan",
		meetingDate: "2014-09-08"
	};


	var objJson = JSON.stringify(obj);
	var meeting = document.getElementsByTagName("table");
	var recentMeeting = meeting[0];
	console.log(recentMeeting);

	// var myMeeting = document.getElementBysByTagName("my_meeting");
	// var joinMeeting = document.getElementById("join_meeting");
	var request = new XMLHttpRequest();
	request.open("post", BASE_SITE + "/meeting/findList");
	request.setRequestHeader('Content-type', 'application/json');
	// 指定服务端返回的数据类型
	request.responseType = 'json';
	request.send(null);

	//判断是否成功
	// request.onload(){
	// 	this.response.date
	// }
	// for(key in request.response.data){
		
	// }

	var id = "recent_meeting"
	createTd(obj, recentMeeting, id);
}

function createTd(obj, Meeting, id) {
	// body...
	var tr = document.createElement("tr");
	tr.setAttribute("id",id);
	fMeeting = Meeting.firstChild;
	console.log(fMeeting);
	Meeting.appendChild(tr);

	for(var key in obj){
		console.log(obj[key]);
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