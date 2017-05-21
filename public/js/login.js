// login.js
// const BASE_SITE = "127.0.0.0:3000";
function getDate() {
	var name = document.getElementById('name').value;
	var password = document.getElementById('password').value;

	// POST请求
	var req = new XMLHttpRequest();
	// OPEN
	req.open('POST', '/user/login');
    // req.open('POST', '/user/create_user');
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
                // alert(this.response.data);
                // console.log(this.response.data);
                saveUserStorage(this.response.data);
                getUserStorage();
                window.location.href='index.html';
            } else {
				// alert(this.response.message);
				AddSpan("div_span", this.response.message);
			}
        }else {
            // alert('网络错误');
            AddSpan("div_span", "网络错误");
        }
    }

}

function saveUserStorage(userInfo) {
    // body...
    localStorage.setItem("username",userInfo.username);
    localStorage.setItem("userid",userInfo._id);
    localStorage.setItem("password",userInfo.password);
}

function getUserStorage() {
    // body...
    console.log(localStorage.getItem("username"));
}


    function AddSpan(id, text) {

        removeAllChild();
        // console.log(arr);
        var span = document.createElement("span");
        var node = document.createTextNode(text);
        span.appendChild(node);
        var element = document.getElementById("div_span");
        element.appendChild(span);

    }


    function removeAllChild() {  

        var div = document.getElementById("div_span");
        //console.log(div);
        //if(div.hasChildNodes())
        while (div.hasChildNodes()) { //当div下还存在子节点时 循环继续  
            div.removeChild(div.firstChild);   
        }  
    }


document.getElementById("login_btn").onclick = function () {
	getDate();
};