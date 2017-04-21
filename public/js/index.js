// index.js

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
	// var myMeeting = document.getElementBysByTagName("my_meeting");
	// var joinMeeting = document.getElementById("join_meeting");
	var id = "recent_meeting"
	createTd(obj, recentMeeting, id);
}

function createTd(obj, meeting, id) {
	// body...
	var tr = document.createElement("tr");
	tr.setAttribute("id",id);
	meeting.appenChild(tr);

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
});