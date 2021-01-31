<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>PIE</title>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="./resources/css/projectMainStyle.css">
	<link rel="stylesheet" href="./resources/css/projectChatCreateStyle.css">
	<script src="./resources/js/projectMainTop.js"></script>
	<script src="./resources/js/NewprojectSidebar.js"></script>
	<script src="./resources/js/projectMainChat.js"></script>
	<script src="./resources/js/mension.js"></script>
	<script src="./resources/js/logonWebSocket.js"></script>
	<script src="./resources/js/chattingConnect.js"></script>
	<script src="./resources/js/chattingConnectChatAlarm.js"></script>
	
</head>
<body>
	<!-- projectNum(Sequence) -->
	<input type = "hidden" id = "projectNum" value = "${sessionScope.projectNum}">
	<input type = "hidden" id = "nick" value = "${sessionScope.nick}">
	<input type = "hidden" id = "email" value = "${sessionScope.loginuser}">

	<!-- Top -->
	<jsp:include page="/WEB-INF/views/common/project_main_top.jsp"></jsp:include>
	
	<div class="project-main-wrapper">
		<!-- right sidebar -->
		<jsp:include page="/WEB-INF/views/common/project_main_sidebar.jsp"></jsp:include>
		
		<!-- notice -->
		<div id="right-sidebar-contents-wrapper-notice" class="right-sidebar-contents-wrapper-hidden">
			<jsp:include page="/WEB-INF/views/main-sidebar-options/project_main_notice.jsp"></jsp:include>
		</div>
		
		<!-- alarm -->
		<div id="right-sidebar-contents-wrapper-alarm" class="right-sidebar-contents-wrapper-hidden">
			<jsp:include page="/WEB-INF/views/main-sidebar-options/project_main_alarm.jsp"></jsp:include>
		</div>	
		
		<!-- file -->
		<div id="right-sidebar-contents-wrapper-file" class="right-sidebar-contents-wrapper-hidden">
			<jsp:include page="/WEB-INF/views/main-sidebar-options/project_main_file.jsp"></jsp:include>
		</div>	
		
		<!-- chat -->
		<div id="right-sidebar-contents-wrapper-chat" class="right-sidebar-contents-wrapper-hidden">	
			<jsp:include page="/WEB-INF/views/main-sidebar-options/project_main_chat.jsp"></jsp:include>
		</div>	
		
		<!-- users -->
		<div id="right-sidebar-contents-wrapper-users" class="right-sidebar-contents-wrapper-hidden">	
			<jsp:include page="/WEB-INF/views/main-sidebar-options/project_main_users.jsp"></jsp:include>
		</div>
		
		<!-- mension -->
		<div id="right-sidebar-contents-wrapper-mension" class="right-sidebar-contents-wrapper-hidden">
			<jsp:include page="/WEB-INF/views/main-sidebar-options/project_main_mension.jsp"></jsp:include>
		</div>
		
		<!-- main body -->
		<div class="project-main-body-wrapper" id="calendarMain" style="display: block">
			<jsp:include page="/WEB-INF/views/calendar/fullcalendar.jsp"></jsp:include>		
		</div>

		
	</div>
		
</body>
</html>