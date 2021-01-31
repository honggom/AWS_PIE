/*
파일명: findPassword.js
설명: 비밀번호 찾기 및 유효성 검증 js
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/

$(document).ready(function(){
		//이메일 존재여부 체크 ajax 
		$('#emailCheck').click(function(){
			  $.ajax(
					 {  
						type : "post",
						url  : "searchEmail.pie",
						data : { email :$('#email').val()},
						async : false,
						success : function(data){
								if(data.user === null){
									Swal.fire("","존재하지 않는 이메일입니다","error");
								}else{
									Swal.fire("","입력하신 이메일로 인증번호를\n전송하였습니다.","success");
									//이메일로 인증번호 전송
									  $.ajax(
											 {  
												type : "post",
												url  : "findPassword.pie",
												data : { email :$('#email').val()},
												async : false,
												success : function(data){
													//location.href = "pwdForgot_emailRequest.pie";
													
													//인증번호 텍스트 박스 만들기 
													let success = "<div class='pwdForgot-email-wrapper'><div class='pwdForgot-email-letter'>인증번호</div>"+
														"<input type='text' class='pwdForgot-email' id='certifyNum' name='email' placeholder='이메일에서 인증번호를 확인 후 입력해주세요.'>"+
														"<div class='pwdForgot-email-check'>"+"</div></div>";
													
													$("#email").attr("readonly", true);
													
													//인증번호 입력란 생성 
													$("#certify").append(success);
													
													//확인 버튼을 인증번호 확인 버튼으로 바꿈 
													$(".pwdForgot-btn-wrapper").children().remove();
													
													let certifyCheckBtn = "<input type = 'button' value ='인증번호 확인' class = 'pwdForgot-btn' id = 'certifyCheck'>";
													
													$(".pwdForgot-btn-wrapper").append(certifyCheckBtn);
													
												} 
											 } 
									       )  
								}
						} 
					 } 
			       )   
		});
		//인증번호 확인
		$(document).on('click', '#certifyCheck', function(){
				if($('#certifyNum').val() === ''){
						Swal.fire("","인증번호를 입력해주세요","warning");
						return;
				}
			  $.ajax(
						 {  
							type : "post",
							url  : "certifyCheck.pie",
							data : { certifyNum :$('#certifyNum').val()},
							async : false,
							success : function(data){
									if(data === "success"){
										Swal.fire("","인증 번호 확인 완료","success");
										location.href = "changePwdAfterCertify.pie?email="+$('#email').val();
										
									}else{
										Swal.fire("인증실패","","error");
									}
							} 
						 } 
				       )   
		});
	});