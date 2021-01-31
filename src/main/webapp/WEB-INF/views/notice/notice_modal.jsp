<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>PIE</title>
</head>
<body>
<div id="notice_modal_background"></div>
 <!-- The Modal -->
<!--Details Modal-->
	<div id="noticeInsert_modal_contents" class="noticeDetailsModal">
		<div class="notice-modal-detail">
			<!-- Modal close btn -->
			<span class="noticeCloseModal" id="insertCancel"
			onclick="document.getElementById('noticeInsert_modal_contents').style.display='none'">&times;</span>
			<!-- Card Title -->
			<div class="notices"></div>
			<h3 class="Title">
			<i class="fas fa-pen"></i> 제목
			</h3>
			<div id="noticeInput" class="noticeTitle">
				<input type="text" id="noticeTitle" name="title" placeholder=""> 
			</div>
			<!-- Card Details -->
			<div id="noticeDetailsWrap">
				<h2 class="noticeDetails">
					<i class="fas fa-align-left"></i> 내용
					<button class="addNoticeInsert-notice-btn" id="insertnotice"
					onclick="document.getElementById('noticeInsert_modal_contents').style.display='none'">등록</button>
				</h2>
			</div>
				<div class="noticeContent">
					<textarea class="ckeditor" id="summernote"></textarea>
					<form name="uploadForm" id="uploadFormNotice" method = "post" enctype="multipart/form-data">
					<input type="file" name="noticefile" id="filename" placeholder="파일 선택" />
					</form>
				</div>
		</div>
	</div>

<!--Details Modal-->
	<div id="noticeEdit_modal_contents" class="noticeDetailsModal">
		<div class="notice-modal-detail">
			<span class="noticeCloseModal" id="editCancel"
		onclick="document.getElementById('noticeEdit_modal_contents').style.display='none'">&times;</span>
			

			<!-- Card Title -->
			<div class="notices"></div>
			<h3 class="Title">
			<i class="fas fa-pen"></i> 제목
			</h3>
			<div id="noticeInput" class="noticeTitle">
				<input type="text" id="noticeTitleView" name="title" readonly /> 
			</div>
			<!-- Card Details -->
			<div id="noticeDetailsWrap">
				<h2 class="noticeDetails">
					<i class="fas fa-align-left"></i> 내용
				<button class="addDetailsEdit-notice-btn" id="editnotice">수정</button>
				<button class="addDetailsEdit-notice-btn" id="deletenotice">삭제</button>
				<button class="addDetailsEdit-notice-btn" id="okeditnotice"
			onclick="document.getElementById('noticeEdit_modal_contents').style.display='none'" style="display:none;">완료</button>
				</h2>
			</div>
				<div class="noticeContentView" id="noticeContentView" style="display:block;" readonly>
				</div>
				<div id="downloadDiv" style="display:none;">
				<a href= '' class="noticedownload" style = 'text-decoration : none'>
				<input type="button" id="downloadfile" name="downloadfile"value="파일다운로드" /><span id="downloadFilename"></span></a>
				</div>
				<!-- 댓글 -->
				<div class = CommetnsWrap-notice id="CommetnsWrap-notice" style="display=">
				<h2 class="commentsTitle-notice">
					<i class="far fa-comments"></i> Comments
				</h2>
				<div class="comments-notice" style="display:none;"></div>
				<form class="commentsForm-notice">
					<textarea class="addComments-notice" cols="30" rows="10" placeholder="enter comments"></textarea>
					<button class="addComments-btn-notice">Save</button>
				</form>
					</div>
			<!-- 파일 -->
				<div class="noticeContent" id="noticeContentEdit"style="display:none;">
					<textarea class="ckeditor" id="summernoteEdit"></textarea>
					<input type="file" name="uploadfile" placeholder="파일 선택" />
				</div>
		</div>
		<input type="hidden" id="notice_seq_hidden"value=""/>
	</div>

</body>
</html>