// camara.js

var imgUrl;
document.getElementById("picture").onclick() {

	function gotoActivity() {
		// body...
		imgUrl = nativeMethod.toActivity('camara');
		// return imgUrl;
	}
	sendImg();
	showImg();
}

document.getElementById("btn_submit").onclick() {

}

function sendImg() {
	// body...
	url = '';
	var request = new XMLHttpRequest();
	request.open('GET', url);
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	// 指定服务端返回的数据类型
	request.responseType = 'json';
	request.onload(){
		if (request.status === 200) {
			if (this.response.code === 200) {
				//拿到数据库里的图像
			}
		}
	}
	// 发起请求
	request.send(imgUrl);
}

function showImg() {
	// body...
	var img = document.getElementById("updata_img");
	img.src = imgUrl;

}

function getResult(argument) {
	// body...
	
}

