/*
파일명: googleLogout.js
설명: 구글 로그아웃 js
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/
	//google 로그아웃 함수
	function onLoad() {
		gapi.load('auth2', function() {
			gapi.auth2.init();
		});
	}

	//auth2 초기화 
	onLoad();

	//로그아웃 실행 
	function signOut() {
		let auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function() {
			location.href = "logout.pie";
		});
	}