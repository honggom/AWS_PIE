<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>PIE</title>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="./resources/css/registerCompletedStyle.css">
	
</head>
<body>
	<!-- Top -->
	<jsp:include page="/WEB-INF/views/common/main_top.jsp"></jsp:include>
	
	<!-- login-register left navbar -->
	<jsp:include page="/WEB-INF/views/common/loginRegisterLeftNavbar.jsp"></jsp:include>
	
	<!-- Register Completed Page -->
	<div class="register-completed-wrapper">
		<div class="register-completed-contents">
			
			<!-- completed message1 -->
			<div class="register-completed-message1">
				<span>ERROR-400</span><br>잘못된 요청입니다.
			</div>
			
			<!-- Register button -->
			<div class="register-completed-btn-wrapper">
				<a href = "index.htm"><button class="register-completed-btn">홈 화면</button></a>
			</div>
		</div>
	</div>
	
</body>
</html>