<<<<<<< HEAD
// camara.js

// var video = document.getElementById("video");
// var context = canvas.getContext("2d");
// var errocb = function () {
//     console.log('sth wrong!');
// }

// if (navigator.getUserMedia) { // 标准的API
//     navigator.getUserMedia({ "video": true }, function (stream) {
//         video.src = stream;
//         video.play();
//     }, errocb);
// } else if (navigator.webkitGetUserMedia) { // WebKit 核心的API
//     navigator.webkitGetUserMedia({ "video": true }, function (stream) {
//         video.src = window.webkitURL.createObjectURL(stream);
//         video.play();
//     }, errocb);
// }

// document.getElementById("picture").addEventListener("click", function () {
//     context.drawImage(video, 0, 0, 640, 480);
// });

var p = navigator.mediaDevices.getUserMedia({ audio: true, video: true });

p.then(function(mediaStream) {
	var video = document.querySelector('video');
	link = window.URL.createObjectURL(mediaStream);
	video.src = link;
	video.onloadedmetadata = function(e) {
	// Do something with the video here.
		// var request = new XMLHttpRequest();
		// request.open('GET',url);
		// // 设置请求头部信息
		// req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		// // 指定服务端返回的数据类型
		// req.responseType = 'json';
		// request.send(link);
		
	};
});

p.catch(function(err) { console.log(err.name); }); // always check for errors at the end
=======
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

>>>>>>> 59a3079631a9d808ced127bb12c1a49e2c3e1efe
