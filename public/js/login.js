// login.js


function getDate() {
	// body...

	var name = (function() {
		name = document.getElementsByName("name")[0].value;
		return name;
	}());

	var psword = (function() {
		psword = document.getElementsByName("psword")[0].value;
		return psword;
	}());

	var variable=new XMLHttpRequest();
	variable.open("POST","demo_post.asp",true);
	variable.send();


	// console.log(name);

	// console.log(psword);

}


document.getElementById("login_btn").addEventListener("click", getDate);