# dear-stitp
##会议通系统


请访问 [会议通系统网页版登录](115.28.180.202:3000/html/login.html) （因为样式兼容问题，预览请右键检查，然后选择app预览模式）
用户名以及密码为[点击查看计软院教师](http://cs.njupt.edu.cn/1943/list.htm) 列表中的所有用户的拼音，例如：

> 用户名：shensubin  密码：shensubin

## 本机运行代码以及app流程说明
 
 1. 技术栈
	后端： `nodejs + express + mongodb`
	前端： boostrap布局
 2. 让代码在自己电脑上跑起来
     - 首先需要安装npm nodejs express mongodb并配置；需使用人脸识别功能需要配置opencv2、cmake与c++。
     - 首先确保自己mongodb数据库服务开启，具体开启方法有两种，一本地安装mongodb服务并设置开启，二是命令行cd进入安装目录下bin下执行`./mongod`,无报错信息即是开启成功。
     - 在命令行工具中cd进入dear-stitp文件夹下，执行`npm install`安装所需依赖，安装完成后执行`npm start`命令。
     - 在浏览器中输入[http://localhost:3000](http://localhost:3000/)，若出现如下字样证明代码已经跑起来了。

		> Express 
		> Welcome to Express

 3. 页面功能说明（因为样式兼容问题，预览请右键检查，然后选择app预览模式）
	 - 登录页面：http://localhost:3000/html/login.html
	 - 主页：http://localhost:3000/html/index.html
	 - 新建会议：http://localhost:3000/html/newMeeting.html
	 - 个人中心：http://localhost:3000/html/user.html
	 - 加入会议：http://localhost:3000/html/joinMeet.html
	 - 签到-仅限手机安装apk使用：http://localhost:3000/html/camara.html
	 - 留言：http://localhost:3000/html/meetingMessage.html
	 - 生成签到码：http://localhost:3000/html/createCheck.html
	 - 查看签到列表：http://localhost:3000/html/signal_list.html

 4. 系统流程图
![app跳转流程图](http://img.blog.csdn.net/20170529154616407?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdGluZ3l1Z2V0YzEx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

![人脸识别流程图](http://img.blog.csdn.net/20170529154714367?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdGluZ3l1Z2V0YzEx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 代码使用说明

 1. 代码文件结构部分可参考express框架文档[express中文文档](http://www.expressjs.com.cn/)

 2. 后端数据接口部分说明
	- 传出参数code状态码可参阅dear-stitp/utils/code.js；
	- 后端接口函数原型参阅dear-stitp/controllers/下的两个js文件。
	- 传出参数均为code和data，表格中为data携带的参数，不包含code参数，可查看dear-stitp/utils/code.js查看具体code携带状态码内容 
 3. 后端接口具体名称和入口参数、出口参数
	示例：新建用户接口：/user/create_user，传入参数：username，password；传出参数code（响应状态码），data（user._id）。

| 接口说明 | 接口名称 | 入口参数 | 出口参数 |是否需要登录|
| ------- | -------- | ------- | ------ | ------ |
| 新建用户 | /user/create_user | username,password | user._id |否|
| 用户登录 | /user/login | username,password | user |否|
| 个人信息 | /user/user_info | 无 | userInfo | 是 |
| 新建会议 | /meeting/create | name,start_time,location,files |meeting._id | 是 |
| 最近会议列表 | /meeting/findList | 无 | meetings |否|
| 我发起的会议列表 | /meeting/findStartedList | 无 | meetings | 是|
| 我加入的会议列表 | /meeting/findJoinedList | 无 | meetings |是|
| 参加会议 | /meeting/joinMeeting | meetingId | 参加是否成功的状态码 |是|
| 创建签到码 | /meeting/createSignalId | meetingId  | meeting.signal_id |是|
| 用户签到 | /meeting/userSign | user_id,_id,code,files | code | 否 |
| 用户签到列表 | /meeting/userSignalList | meetingId | meetings | 是 |
| 会议全部留言 | /meeting/meetingMessage | meeting_id | userInfo | 是|
| 添加会议留言 | /meeting/AddMeetingMessage | meeting_id,meeting_id | 无 | 是 |


##爬虫爬取的教师个人信息
分别为users.json和userInfo.json可直接导入mongodb使用