/*
파일명: googleLogin.js
설명: 구글 로그인 처리 js
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/
console.log("google login");

	function onSignIn(googleUser) {
	//구글로 로그인한 사용자 정보 
	let profile = googleUser.getBasicProfile();
	let email = profile.getEmail();
	let name = profile.getName()
	//url로 컨트롤러에게 사용자 이메일과 닉네임을 넘겨준다 
	location.href = 'googleLogin.pie?loginuser=' + email + '&name=' + name;
}	
