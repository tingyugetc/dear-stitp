// camara.js

// var imgUrl;
// document.getElementById("picture").onclick = function() {

// 	function gotoActivity('camara') {
// 		// body...
// 		nativeMethod.toActivity('camara');
// 		// return imgUrl;
// 	}

	// var img = gotoActivity(img);	
	// sendImg(img);
	// showImg();
// }

document.getElementById("btn_submit").onclick = function() {

}

function sendImg(imgUrl) {
	// body...
	url = '';
	var signal_id = document.getElementById("signal_id");
	var request = new XMLHttpRequest();
	request.open('POST', url);
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	// 指定服务端返回的数据类型
	request.responseType = 'json';
	request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.onload = function() {
		if (request.status === 200) {
			if (this.response.code === 200) {
				//拿到数据库里的图像
			}
		}
	}
	// 发起请求
	request.send("imgUrl=" + imgUrl + "signal_id=" + signal_id);


}

// function showImg() {
// 	// body...
// 	var img = document.getElementById("updata_img");
// 	img.src = imgUrl;

// }

function getResult(argument) {
	// body...
	
}

