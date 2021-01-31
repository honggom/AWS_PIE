<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>PIE</title>
	<jsp:include page="/WEB-INF/views/common/head.jsp"></jsp:include>
	<link rel="stylesheet" href="./resources/css/chatStyle.css">
	<link rel="stylesheet" href="./resources/css/chatEmojiStyle.css">
	<script src="./resources/js/chatting.js"></script>
	<script src="./resources/js/chattingEmoji.js"></script>
	<script src="./resources/js/chattingConnect.js"></script>
</head>
<body>
<input type="hidden" value="${select}" id="select">
<input type="hidden" value="${roomname}" id="roomname">
<input type="hidden" value="${sessionScope.nick}" id="nickname">
<input type="hidden" value="${sessionScope.loginuser}" id="session_email">
<input type="hidden" value="${sessionScope.projectNum}" id="projectNum" >
	<div id="chatArea" class="chat-wrapper">	
		<!-- chat top -->
		<div class="chat-top-wrapper">
			<div class="chat-top-pic">
				<i class="fas fa-th-large"></i>			
			</div>
			<div class="chat-top-letters-wrapper">
				<div class="chat-top-title">
					${roomname}
				</div>
				<div class="chat-top-users">
					${participants}
				</div>
			</div>
		</div>
		
		<!-- chat body -->
		<div id="chatMessageArea" class="chat-body-wrapper"></div>
			 
		<!-- chat bottom -->
		<div class="chat-bottom-wrapper">
			<!-- chat message writing -->
			<div class="chat-msgWrite-wrapper">
				<!-- message area -->
				<!-- <textarea id="message" class="chat-msgWrite" placeholder="메시지를 입력하세요" ></textarea> -->
				<div contenteditable="true" placeholder="메시지를 입력하세요" id="message" class="chat-msgWrite"></div>
				<img id="img_zone" class="chat-msgWrite-file" src =""/>

				<!-- 파일 업로드 폼 -->
				<form name="chat_uploadForm" id="chat_uploadForm" method="post" enctype="multipart/form-data">
					<input type="file" id="file-input" name="chat_file" style="display:none;">
				</form>


				<!-- icons & button -->
				<div class="chat-msgWrite-bottom-wrapper">
					<!-- icons -->
					<div class="chat-msgWrite-icons-wrapper">
						<i class="fas fa-grin-beam smile-o"></i>
						<div class="emoji">
							<div class="emoji-content">
								<div class="emoji-area"></div>
							</div>
						</div>
						
						<i class="fas fa-at"></i>
						<div class="mension">
							<div class="mension-content">
								<div class="mension-area"></div>
							</div>
						</div>
							<!-- <i class="fas fa-font"></i> -->
						<label for="file-input">
							<i class="fas fa-upload"></i>
						</label>
					</div>
					

					
					<!-- chat send button -->
					<div id="chat-msgWrite-btn" class="chat-msgWrite-btn">
						<button id="sendBtn">전송</button>
					</div>
				</div>
			</div>
			
		</div>
	</div>
</body>
</html>