/*
파일명: main-profile.js
설명: 메인 화면 프로필 변경 js
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/

$(document).ready(function() {
	
		//여기서 아이디로 파일 이름 겟 ajax 
		function getProfile(email) {
			
			let profile = null
			
			let userOb = new Object();
			userOb.email = email;
			let user = JSON.stringify(userOb);
			
			$.ajax({
				type: "post",
				url: "getProfile.pie",
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				data: user,
				async: false,
				success: function(data) {
					
					//프로필 이미지 
					profile = data.profile.profile;
				}
			});
			return profile;
		}
		
		let profile = getProfile($("#input_email").val());
		
		//디비에 프로필 이미지 이름이 없으면 디폴트 이미지 
		if(profile===null){
			$("#main-profile-img").attr("src", "./resources/img/icon/none.png");
		}else{
			$("#main-profile-img").attr("src", "./resources/profile/"+$("#input_email").val()+"_"+profile);
		}
	
});
