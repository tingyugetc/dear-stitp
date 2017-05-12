// user.js
const BASE_SITE = "127.0.0.0:3000"

function error(obj) {
	this.object = obj;
}

error.prototype.inexistence_error = function() {
	if (this.object == undefined) {return "不存在";}
};

error.prototype.http_error = function() {
	return "status not 200";
};

function getData(ele) {
	this.element = ele;
	if (this.element == undefined) {
		var err = new error(ele);
		console.log(err.inexistence_error());
		// return -1;
	}
}

getData.prototype.Data = function(url) {
	var request = new XMLHttpRequest();
	url = '/meeting/findList';
	request.open('GET',url);
	request.setRequestHeader('content','application/json');
	request.responseType = 'json';
	request.onload = function() {
		if (this.status === 200) {
			if (this.response.code === 200) {
				console.log(this.response);
				var td = document.getElementsByClassName("td_text");
				var img = document.getElementsByName("profile_photo");
				// img.src = this.response.data.profilePhoto;
				if (this.response.data != undefined) {
					
					// for (var i = 1; i < this.response.data.length; i++) {	 	
					// 	td[i].innerHTML = this.response.data[i].name;
					// }
				}
			}
			else{
				console.log(this.response.message);
			}
		}
		else{
			var err = new error(this.status);
			console.log(err.http_error());
		}
	}
	request.send();
	return 0;
} 

(function(){
	ele = document.getElementsByTagName("table");
	var getText = new getData(ele[0]);
	var url = "/meeting/findList";
	console.log(getText.Data);
	// getText.Data();

}())

