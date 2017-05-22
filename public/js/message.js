(function () {
    // var requst = new XMLHttpRequest();
    var url = '';
    getMessage();
});


function getMessage() {
    // body...
    var meetingid = localStorage.getItem("meetingid");
    console.log(meetingid);
    var request = new XMLHttpRequest();
    url = "/meeting/joinMeeting";
    request.open("POST", url);
    request.responseType = "json";
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onload = function () {
        if (this.status === 200) {
            if (this.response.code === 200) {
                console.log(this.response.data);
                this.response.data.forEach(function (obj) {
                    console.log(obj);
                    createDiv1(obj);
                    createDiv2(obj);

                })

            }
            else
                alert("没获取数据");
        }
        else
            alert("没有网络");
    };
    request.send("meetingId=" + meetingid);
    //'username=' + name
}

function createDiv1(obj) {

}

//向前端展示
function createDiv2(obj) {
    var div1= document.createElement("div");
    div1.setAttribute("class", "div_middle");

    var div21 = document.createElement("div");
    div21.setAttribute("class", "div_small");
    var h4 = document.createElement("h4");
    h4.setAttribute("class", "title");
    var node = document.createTextNode(obj.meeting.name);
    h4.appendChild(node);
    div21.appendChild(h4);


    var div22 = document.createElement("div");
    div22.setAttribute("class", "div_small2");
    var blockquote = document.createElement("blockquote");
    var p = document.createElement("p");
    var nodep = document.createTextNode(obj.meeting.message);
    p.appendChild(nodep);
    // h4.setAttribute("class", "title");
    var footer = document.createElement("footer");
    var nodeTime = document.createTextNode(obj.user.signalDate);
    footer.appendChild(nodeTime);
    blockquote.appendChild(footer);
    blockquote.appendChild(p);
    div22.appendChild(blockquote);

    div1.appendChild(div22);
    div1.appendChild(div21);

    var div_message = document.getElementById("div_message");
    div_message.getElementsByTagName('tbody')[0].appendChild(tr);


}

