<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<script src="./resources/js/notice.js"></script>
<script src="./resources/js/noticeComments.js"></script>
<link rel="stylesheet" href="./resources/css/notice.css"/>
<script src='resources/summernote-0.8.18-dist/summernote-lite.js'></script>
<script src='resources/summernote-0.8.18-dist/lang/summernote-ko-KR.js'></script>
<link href='resources/summernote-0.8.18-dist/summernote-lite.css' rel='stylesheet' />
</head>

<body>


		<jsp:include page="/WEB-INF/views/notice/notice_modal.jsp"></jsp:include>
	
	<div><input type="button" id="write" value="글쓰기"/></div>
	<div id="fas fa-clipboard-list" class="right-sidebar-notice">
		<div id="notice-items-wrapper"></div>
		<div id="noticeList"></div>
		
		<div class = "notice-page-btn-zone">
		</div>
	</div>

</body>
</html>