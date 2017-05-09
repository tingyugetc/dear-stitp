// index.js


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
                createTd(element, meeting);
            });
        }
    };
    // 发起请求
	request.send(null);
}

//向前端展示
function createTd(obj, Meeting) {
	var tr = document.createElement("tr");

    var td = document.createElement("td");
    var node = document.createTextNode(obj.name);
    td.appendChild(node);
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

(function(){
	getJson();
}());
