<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<body>
	<div id="far fa-comment-dots" class="right-sidebar-chat">
		<div id="crtChat-modal-background"></div>
		<input type="hidden" value="${sessionScope.loginuser}" id="session_email">
		<input type="hidden" value="${sessionScope.nick}" id="nickname">
		<input type="hidden" value="${sessionScope.projectNum}" id="projectNum">
		<!-- chat create button -->
		<div class="chat-createBtn-wrapper">
			<button id="crtChatBtn" class="chat-createBtn">+ 채팅방 생성하기</button>
			
			<!-- chatting page to create -->
			<jsp:include page="project_main_chat_create.jsp"></jsp:include>
		</div>
		
		<!-- chat search -->
		<div class="chat-search-wrapper">
			<div class="chat-search-letter">채팅방 검색</div>
			<div>
				<input id="chat-search-box" maxlength='15' placeholder="이름 검색" class="chat-search-box" type="search">
			</div>
		</div>
		
		<!-- chat-list -->
		<div id="chat-list" class="chat-lists-wrapper"></div>
		
		<div id="chat-list-hidden" style="display: none;"></div>
		<form name="popForm">
			<input type="hidden" id="room_number" name="select"/>
			<input type="hidden" id="room_name" name="roomname"/>
		</form>

	</div>
</body>
</html>