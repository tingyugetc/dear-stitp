
document.getElementById("back").onclick = function () { history.go(-1); };

(function () {
    // var requst = new XMLHttpRequest();
    var urlGetMessage = '/meeting/meetingMessage';
    var meetingId = localStorage.getItem("meetingid");
    var dataGetMessage = "meeting_id=" + meetingId;
    getMessage(urlGetMessage, dataGetMessage);
}());

document.getElementById("btn_sendMessage").onclick = function () {

    var urlSendMessage = "/meeting/AddMeetingMessage";
    var message = document.getElementById("message-text").value;
    var meetingId = localStorage.getItem("meetingid");
    var dataSendMessage = 'meeting_id=' + meetingId + '&message=' + message;
    getMessage(urlSendMessage, dataSendMessage);
    window.location.reload();

};


function getMessage(url, data) {
    // body...
    // var meetingid = localStorage.getItem("meetingid");
    // console.log(meetingid);
    var request = new XMLHttpRequest();
    // url = "/meeting/meetingMessage";
    request.open("POST", url);
    request.responseType = "json";
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onload = function () {
        if (this.status === 200) {
            if (this.response.code === 200) {
                console.log(this.response.data);
                this.response.data.forEach(function (obj) {
                    console.log(obj);
                    showMeeting(obj);
                    createDiv2(obj);
                })
            }
            else
                alert("没获取数据");
        }
        else
            alert("没有网络");
    };
    request.send(data);
    //'username=' + name
}

function showMeeting(obj) {
    // var meeting_div = document.getElementById("meeting_show");
    var p = document.getElementsByName("meeting_show");
    p[0].innerHTML = "会议名称："+localStorage.getItem("meetingname");
    p[1].innerHTML = "会议发起者：" + localStorage.getItem("meetingusername");
    p[2].innerHTML = "发起时间：" + localStorage.getItem("start_time");
    p[3].innerHTML = "地点：" + localStorage.getItem("meetinglocation");
}

//向前端展示
function createDiv2(obj) {
    var div1= document.createElement("div");
    div1.setAttribute("class", "div_middle");

    var div21 = document.createElement("div");
    div21.setAttribute("class", "div_small");
    var h4 = document.createElement("h4");
    h4.setAttribute("class", "title");
    var node = document.createTextNode(obj.user.username);
    h4.appendChild(node);
    div21.appendChild(h4);


    var div22 = document.createElement("div");
    div22.setAttribute("class", "div_small2");
    var blockquote = document.createElement("blockquote");
    var p = document.createElement("p");
    var nodep = document.createTextNode(obj.message);
    p.appendChild(nodep);
    // h4.setAttribute("class", "title");
    var footer = document.createElement("footer");
    var nodeTime = document.createTextNode(obj.signalDate);
    footer.appendChild(nodeTime);
    blockquote.appendChild(p);
    blockquote.appendChild(footer);
    div22.appendChild(blockquote);

    div1.appendChild(div21);
    div1.appendChild(div22);

    if (obj.message) {
        var div_message = document.getElementById("div_message");
        div_message.appendChild(div1);
    }

}

