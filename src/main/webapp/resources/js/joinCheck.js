/*
파일명: joinCheck.js
설명: 회원가입 처리 및 유효성 검증 js
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/

//submit에 관여하는 변수들 전부 true가 되어야 함 
let emailCheck = false;
let firstPwdCheck = false;
let doublePwdCheck = false;
let nickNameCheck = false;

//ajax로 이메일 중복 검사 완료하면 true로 바뀜 회원가입 submit에 관여 
let emailDoubleCheck = false;

//검증 확인, 실패 변수 
let success = "<p style ='font-size: small; margin : 0; color : green; padding-top : 0; padding-bottom : 0;'>올바른 형식입니다.</p>";
let fail = "<p style ='font-size: small; margin : 0; color : yellow; padding-top : 0; padding-bottom : 0;'>올바르지 않은 형식입니다.</p>";

$(document).ready(function() {
	//이메일 중복검사 ajax 
	$('#emailCheck').click(function() {

	});

	//이메일 정규표현 확인 함수
	$("#email").keyup(function() {
		if ($("#email").val().search(/\s/) != -1) {
			//alert("공백은 허용되지 않습니다.");
			$("#email").val("");
		}
		if (isEmail($("#email").val())) {
			$("#emailDiv").children().remove();
			$("#email").css("background-color", "lightgrey");
			//$("#emailDiv").append(success);
					$.ajax(
			{
				type: "post",
				url: "searchEmail.pie",
				data: { email: $('#email').val() },
				success: function(data) {
					if (emailCheck === false) {
						//alert("올바른 형식으로 작성해주세요.")
						$("#email").val("");
						$("#email").focus();
						return;
					}
					if (data.user === null) {
						//alert("사용가능한 이메일입니다.");
						emailDoubleCheck = true;
					} else {
						//alert("이미 사용하고 있는 이메일입니다.");
						$("#email").val("");
						$("#emailDiv").children().remove();
						$("#emailDiv").append("<p style ='font-size: small; margin : 0; color : yellow; padding-top : 0; padding-bottom : 0;'>중복된 이메일 입니다.</p>");
						emailCheck = false;
					}
				}
			}
		)
			emailCheck = true;
		} else {
			$("#emailDiv").children().remove();
			$("#email").css("background-color", "white");
			$("#emailDiv").append(fail);
			emailCheck = false;
			emailDoubleCheck = false;
		}
	});
	//비밀번호 정규표현 확인 함수
	$("#pwd").keyup(function() {
		if ($("#pwd").val().search(/\s/) != -1) {
			//alert("공백은 허용되지 않습니다.");
			$("#pwd").val("");
		}
		if (isPassword($("#pwd").val())) {
			$("#pwdDiv").children().remove();
			//$("#pwdDiv").append(success);
			$("#pwd").css("background-color", "lightgrey");
			firstPwdCheck = true;
		} else {
			$("#pwdDiv").children().remove();
			$("#pwd").css("background-color", "white");
			$("#pwdDiv").append(fail);
			firstPwdCheck = false;
		}
	});
	//비밀번호 2차 확인 함수
	$("#pwdCheck").keyup(function() {
		if ($("#pwdCheck").val().search(/\s/) != -1) {
			//alert("공백은 허용되지 않습니다.");
			$("#pwdCheck").val("");
		}
		if ($("#pwd").val() === $("#pwdCheck").val()) {
			$("#pwdCheckDiv").children().remove();
			$("#pwdCheck").css("background-color", "lightgrey");
			//$("#pwdCheckDiv").append("<p style ='font-size: small; margin : 0; color : blue; padding-top : 0; padding-bottom : 0;'>비밀번호와 동일합니다.</p>");
			doublePwdCheck = true;
		} else {
			$("#pwdCheckDiv").children().remove();
			$("#pwdCheck").css("background-color", "white");
			$("#pwdCheckDiv").append("<p style ='font-size: small; margin : 0; color : yellow; padding-top : 0; padding-bottom : 0;'>비밀번호와 동일하지않습니다.</p>");
			doublePwdCheck = false;
		}
	});
	//닉네임 정규표현 확인 함수
	$("#nickName").keyup(function() {
		if ($("#nickName").val().search(/\s/) != -1) {
			//alert("공백은 허용되지 않습니다.");
			$("#nickName").val("");
		}
		if (isName($("#nickName").val())) {
			$("#nickNameDiv").children().remove();
			$("#nickName").css("background-color", "lightgrey");
			nickNameCheck = true;
		} else {
			$("#nickNameDiv").children().remove();
			$("#nickName").css("background-color", "white");
			$("#nickNameDiv").append(fail);
			nickNameCheck = false;
		}
	});
	//이메일 정규표현식
	//이메일 형식이면 통과 글자수 제한없음
	function isEmail(asValue) {
		let regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		return regExp.test(asValue);
	}
	//비밀번호 정규표현식 
	//8 ~ 16자 영문, 숫자, 특수문자 각 1개 이상 조합
	function isPassword(asValue) {
		let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
		return regExp.test(asValue);
	}
	//닉네임 정규표현식
	//한글 영문만 허용 최소 3글자 최대 20글자 
	function isName(asValue) {
		let regExp = /^[가-힣a-zA-Z]{3,20}$/;
		return regExp.test(asValue);
	}
});
//submit전 검사 함수 
function check() {
	if (!emailCheck) {
		Swal.fire("", "이메일을 확인해주세요", "warning");
		$("#email").val("");
		$("#email").focus();
		return false;
	}
	if (!emailDoubleCheck) {
		Swal.fire("", "이메일 중복을 확인해주세요", "warning");
		return false;
	}
	if (!nickNameCheck) {
		Swal.fire("", "이름을 확인해주세요", "warning");
		$("#nickName").val("");
		$("#nickName").focus();
		return false;
	}
	if (!firstPwdCheck) {
		Swal.fire("", "비밀번호를 확인해주세요", "warning");
		$("#pwd").val("");
		$("#pwdCheck").val("");
		$("#pwd").focus();
		return false;
	}
	if (!doublePwdCheck) {
		Swal.fire("", "비밀번호가 일치하지 않습니다", "warning");
		$("#pwd").val("");
		$("#pwdCheck").val("");
		$("#pwdCheck").focus();
		return false;
	}
	return true;
}
