/*
파일명: changePwd.js
설명: 비밀번호 변경 및 유효성 검증 js
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/

//submit 전 검증 변수 : 둘다 true여야 form 전송 가능 
let firstPwdCheck = false;
let doublePwdCheck = false;

//submit 전 검증 함수 
function check(){
	if(!firstPwdCheck){
		Swal.fire("", "비밀번호 확인해주세요.", "warning");
		$("#pwd").val("");
		$("#pwdCheck").val("");
		$("#pwd").focus();
		return false;
	}
	if(!doublePwdCheck){
		Swal.fire("", "비밀번호 재입력을 확인해주세요.", "warning");
		$("#pwd").val("");
		$("#pwdCheck").val("");
		$("#pwdCheck").focus();
		return false;
	}
	return true;
}

//검증 확인, 실패 변수 
let success = "<p class = 'successOrFail' style ='font-size: small; margin : 0; color : blue; padding-top : 0; padding-bottom : 0;'>올바른 형식입니다.</p>";
let fail = "<p class = 'successOrFail' style ='font-size: small; margin : 0; color : red; padding-top : 0; padding-bottom : 0;'>올바르지 않은 형식입니다.</p>";

//비밀번호 정규표현식 
//8 ~ 16자 영문, 숫자, 특수문자 각 1개 이상 조합
function isPassword(asValue) {
    let regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    return regExp.test(asValue);
}
    $(document).ready(function(){

        //비밀번호 정규표현 확인 함수
    $(document).on('keyup', '#pwd', function(){
        if($("#pwd").val().search(/\s/) != -1){
            Swal.fire("오류", "공백은 허용되지 않습니다.", "error");
            $("#pwd").val("");
        }
        if(isPassword($("#pwd").val())){
            $(".successOrFail").remove();
            $("#pwdDiv").append(success);
            firstPwdCheck = true;
        }else{
            $(".successOrFail").remove();
            $("#pwdDiv").append(fail);
            firstPwdCheck = false;
        }


        //비밀번호 2차 확인 함수
    $(document).on('keyup', '#pwdCheck', function(){
        if($("#pwdCheck").val().search(/\s/) != -1){
            Swal.fire("오류", "공백은 허용되지 않습니다.", "error");
            $("#pwdCheck").val("");
        }
        if($("#pwd").val()===$("#pwdCheck").val()){
            $(".pwdCheckMessage").remove();
            $("#pwdCheckDiv").append("<p class = 'pwdCheckMessage' style ='font-size: small; margin : 0; color : blue; padding-top : 0; padding-bottom : 0;'>비밀번호와 동일합니다.</p>");
            doublePwdCheck = true;
        }else{
            $(".pwdCheckMessage").remove();
            $("#pwdCheckDiv").append("<p class = 'pwdCheckMessage' style ='font-size: small; margin : 0; color : red; padding-top : 0; padding-bottom : 0;'>비밀번호와 동일하지않습니다.</p>");
            doublePwdCheck = false;
        }
    });
    });
});
