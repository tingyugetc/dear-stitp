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

document.getElementById("back").onclick = function () { history.go(-1); };

document.getElementById("pre").onclick = function () { history.go(1); };

(function(){
	if (localStorage.getItem("userlogo")) {
		document.getElementById("local_img").src = localStorage.getItem("userlogo");
	}
}())

// userlogo

document.getElementById("btn_submit").onclick = function() {
  	previewFile();
}


function previewFile() {

	var imge = document.getElementById("pic");
	var aname = "../img/19970058.jpg";
	var file = new File([''], aname);
	console.log(file);
    // var file    = document.querySelector('input[type=file]').files[0];
    // var file = document.getElementById("file_input").files[0];
	var reader  = new FileReader();

	reader.addEventListener("load", function () {
	  imge.src = reader.result;
	}, false);

	if (file) {
	  reader.readAsDataURL(file);
	}
}

function handleFiles(files) {
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var imageType = /^image\//;
    
    if ( !imageType.test(file.type) ) {
      continue;
    }
    
    var img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    var preview = document.getElementById("div_show");
    // 假设 "preview" 是将要展示图片的 div
    preview.appendChild(img);
    
    var reader = new FileReader();
    reader.onload = (function(aImg) { 
      return function(e) { 
        aImg.src = e.target.result; 
      }; 
    })(img);
    reader.readAsDataURL(file);
  }
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

