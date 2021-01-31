<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<script src="./resources/js/user_profile.js"></script>
<body>

	<div id="userEdit_modal_contents" class="userEdit-contents-wrapper">
		<!-- userEdit title -->
		<div class="userEdit-title">
			회원정보 수정
		</div>
		
		<!-- userEdit profile -->
		<div class="userEdit-profile-wrapper">
			<div class="userEdit-profile-pic-wrapper">
			
			<label for="img-input">
				<i id="edit-btn" class="fas fa-edit"></i>
			</label>
			
			<!-- 이미지 업로드 폼 -->
			<form name="uploadForm" id="uploadForm" method = "post" enctype="multipart/form-data">
				<img id = "img_zone" src =""/>
				<!-- <label for="img-input"><i class="fas fa-user userEdit-profile-pic"></i></label> -->
				<input name = "profile" type = "file" style = "display:none;" id = "img-input">
				<!-- <button type = "button" id = "profile-btn">전송</button> -->
				
			</form>
			
			</div>
			<input type = "hidden" id = 'input_email' value = "${sessionScope.loginuser}">
			<div class="userEdit-profile-infos">
				<div class="userEdit-email">
					이메일(아이디)			
				</div>
				<div class="userEdit-userEmail">
					${sessionScope.loginuser}	
				</div>
				<div class="userEdit-name">
					이름					
				</div>
				<div class="userEdit-username">
					${sessionScope.nick}			
				</div>
			</div>
		</div>
		
		<!-- userEdit password -->
<!-- 		<div class="userEdit-pwd-outer-wrapper">
			<form action="">
				비밀번호 입력
				<div class="userEdit-pwd-inner-wrapper">
					<div class="userEdit-pwd-letter">
						비밀번호
					</div>
					<input type="text" class="userEdit-pwd" id="pwd" name="pwd">
					<div class="userEdit-pwd-check">
						영문, 숫자, 특수문자 포함 8~16글자
					</div>
				</div>
				
				비밀번호 재입력
				<div class="userEdit-pwd-wrapper">
					<div class="userEdit-pwd-letter">
						비밀번호 재입력
					</div>
					<input type="text" class="userEdit-pwd" id="pwdCheck" name="pwdCheck">
					<div class="userEdit-pwd-check">
						비밀번호가 일치하지 않습니다.
					</div>
				</div>
			</form>
		</div> -->
		
		<!-- userEdit 탈퇴 버튼 -->
<!-- 		<div class="userEdit-main-withdrawal-wrapper">
			<button id="userEdit_main_withdrawal_btn" class="userEdit-main-withdrawal-btn">회원탈퇴</button>
		</div> -->
		
		<!-- userEdit btn -->
		<div class="userEdit-btn-wrapper">
			<button class="userEdit-btn">확인</button>
		</div>
	</div>
	
</body>
</html>