// user.js

// document.getElementById("back").onclick = function () { history.go(-1); };

// document.getElementById("pre").onclick = function () { history.go(1); };

function error(obj) {
	this.object = obj;
}

error.prototype.inexistence_error = function() {
	if (this.object === undefined) {return "不存在";}
};

error.prototype.http_error = function() {
	return "status not 200";
};

function getData(ele) {
	this.element = ele;
	if (this.element === undefined) {
		var err = new error(ele);
		console.log(err.inexistence_error());
		// return -1;
	}
}

getData.prototype.Data = function() {
	var request = new XMLHttpRequest();
	url = '/user/user_info';
	request.open('GET',url);
	request.setRequestHeader('content','application/json');
	request.responseType = 'json';
	request.onload = function() {
		if (this.status === 200) {
			if (this.response.code === 200) {
				console.log(this.response.data);
				console.log(this.response.data);
				var td = document.getElementsByClassName("td_text");
				var img = document.getElementsByName("profile_photo");
				// img.src = this.response.data.profilePhoto;
				var user_info = this.response.data[0];
				localStorage.setItem("userarea",user_info.area);
				localStorage.setItem("userresume",user_info.resume);
				localStorage.setItem("userlogo",user_info.nick_logo);
				if (user_info !== undefined) {
					if(img[0]){
						img[0].src = user_info.nick_logo;
					}
					if(td[1]){
						td[1].innerHTML = user_info.name;
					}
					if(td[2]){
						td[2].innerHTML = user_info.gender;
					}
					if(td[3]){
						td[3].innerHTML = user_info.degree;
					}
					if(td[4]){
						td[4].innerHTML = user_info.degree_level;
					}
					if(td[5]){
						td[5].innerHTML = user_info.title;
					}
					if(td[6]){
						td[6].innerHTML = user_info.email;
					}
					if(td[7]){
						// if(user_info.organization.length)
						console.log(user_info.organization);
						if (user_info.organization.length > 16) {
							td[7].innerHTML = user_info.organization.slice(0,15) + '...';
						}
						else
							td[7].innerHTML = user_info.organization;
					}
					// if(td[8]){
					// 	td[8].innerHTML = user_info.nick_logo;
					// }
					// if(td[9]){
					// 	td[9].innerHTML = user_info.nick_logo;
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
	};
	request.send();
	return 0;
};




(function(){
	ele = document.getElementsByTagName("table");
	var getText = new getData(ele[0]);
	var url = "/user/user_info";
	console.log(getText.Data);
	getText.Data();

}());

function setText(titleText,bodyText) {
	// body...
	var title = document.getElementById("gridSystemModalLabel");
	title.innerHTML = titleText;
	var div = document.getElementById("introduce_text");
	div.innerHTML = bodyText;
}

document.getElementById("achevement_click").onclick = function() {
	var title_text = "个人成就";
	var body_text = localStorage.getItem("userarea");
	setText(title_text,body_text);
};
document.getElementById("indrduce_click").onclick = function() {
	var title_text = "个人简介";
	var body_text = localStorage.getItem("userresume");
	setText(title_text,body_text);
};

// area:"1.算法网络经济<br />包括在群智感知、数据中心资源分配、移动社交网络中的市场机制设计<br>2.无线自组网和无线传感网<br>包括路由协议、拓扑控制、拥塞控制、数据收集、服务质量保证等<br>3.无线网络和移动计算<br>包括覆盖层网络体系结构、群智感知技术、容迟网络体系结构、社会移动模型等<br>4.物联网技术及其应用<br>包括物联网体系结构、异构物联网融合、物联网在应急通信、远程医疗等方面的应用<br><br>我可在信息网络(0810Z2)专业招收博士研究生,在0835软件工程专业招收学术型硕士研究生，在计算机技术(085211)、软件工程(085212)招收全日制专业学位硕士研究生。<br />"
// degree:"工学博士"
// degree_level:"博士研究生"
// email:"xujia@njupt.edu.cn"
// gender:"男"
// name:"徐佳"
// nick_logo:"http://yjs.njupt.edu.cn/epstar/web/outer/showimage_ny.jsp?&id=20100004.jpg&sPath=/opt/yjs/dszp"
// organization:"计算机学院、软件学院、网络空间安全学院（大数据研究院）"
// resume:"详见个人主页：http://faculty.cs.njupt.edu.cn/~xujia/home.html<br />徐佳，男，1980年生，江苏常州人，博士，南京邮电大学计算机学院教授，博士生导师，中国计算机学会高级会员，ACM会员，IEEE会员，江苏省网络与分布计算专委会委员，入选江苏省“双创博士”计划、江苏省“六大人才高峰”高层次人才、江苏省“333高层次人才培养工程”中青年学术技术带头人和南京邮电大学鼎新学者。担任IEEE Network、TVT、WINET、MIS、AHWSN、IJDSN等国际期刊审稿人，及国际会议ICNC、ICSC、ICC的程序委员。2010年毕业于南京理工大学计算机应用专业，获工学博士学位，2014年4月于南京邮电大学“信息与通信工程”博士后流动站出站，获“优秀博士后”称号，2014年—2015年美国科罗拉多矿业大学访问学者。目前主要研究领域为群智感知、社交网络、算法博弈论。在IEEE Transactions on Wireless Communications、Computer Communications、Wireless Networks、Mobile Information Systems等期刊及会议上发表论文50余篇。授权发明专利13项，申请发明专利15项，软件著作权登记11项，合作出版教材1部。曾获2014年度中国通信学会科技进步二等奖（排名1），2016年度江苏省教育科学研究成果奖二等奖（排名2），江苏省2015年度研究生培养模式改革成果二等奖(排名4)，2013年度南京市科技进步二等奖（排名2），2013年度江苏通信行业科技进步三等奖（排名2），2016年度南京邮电大学科技进步特等奖（排名2），2014年中国传感器学术大会优秀论文奖（排名1），所指导研究生中2人获得国家奖学金。先后主持中国博士后特别资助项目等项目、国家自然科学基金青年项目、国家自然科学基金面上项目、江苏省科技支撑计划、江苏省自然科学基金面上项目等科研项目，完成企业合作项目4项。<br />"
// title:"教授"
// user:"5911db7b50b6ad3000737958"
// _id:"591195b61fdd052b1ff7ab26"

