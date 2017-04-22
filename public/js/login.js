// login.js

const BASE_SITE = 'http://127.0.0.1:3000';

function getDate() {
	var name = document.getElementById('name').value;
	var password = document.getElementById('password').value;

	// POST请求
	var req = new XMLHttpRequest();
	// OPEN
	req.open('POST', BASE_SITE + '/user/login');
	// 设置请求头部信息
	req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	// 指定服务端返回的数据类型
	req.responseType = 'json';
	// 发起请求
	req.send('username=' + name + '&password=' + password);

	// 添加监听事件
	req.onload = function (e) {
		if (this.status === 200) {
			// 获取服务端返回的数据
			console.log(this.response);
			if (this.response.code === 200) {
                window.location.href='newMeeting.html';
            } else {
				alert(this.response.message);
			}
        }else {
            alert('网络错误');
        }
    }

}


document.getElementById("login_btn").onclick = function () {
	getDate();
};