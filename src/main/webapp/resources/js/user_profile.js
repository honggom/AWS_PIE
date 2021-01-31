/*
파일명: user_profile.js
설명: 유저 프로필 업로드 및 화면 처리 js
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
			$("#img_zone").attr("src", "./resources/img/icon/none.png");
		}else{
			$("#img_zone").attr("src", "./resources/profile/"+$("#input_email").val()+"_"+profile);
		}
		//이미지 미리보기 
		function readURL(img) {
		  	let reader = new FileReader();
			//파일을 읽어서
		  	reader.readAsDataURL(img);
	
			//확장자명
			imgEtc = img.name.split(".");
			if(imgEtc[1] === "png" || imgEtc[1] === "jpg" || imgEtc[1] === "jpeg"){
				
			}else{
				//초기화
				Swal.fire("Try Again!","png, jpg, jpeg only","info");
				img = null;
				return;
			}
			
			//파일이 다 읽어지면 
		  	reader.onload = function (e) {
		    	$('#img_zone').attr('src', e.target.result);  
				$('#main-profile-img').attr('src', e.target.result);  
 				uploadProfile();
		  	}
		}
		//사용자가 이미지를 올렸을 때 
		$("#img-input").on('change', function(e){
		   readURL(this.files[0]);
		});
		
		/*
		//프로필 이미지 변경 버튼 
		$("#profile-btn").on('click', function(e){
		  uploadProfile();
		});
		*/
	
	//파일 업로드 
	function uploadProfile() {
	  		let form = $('#uploadForm')[0];
	
			//파일 안 올리고 업로드 시 
			if($("#img-input").val()===''){
				return;
			}
			
            let formData = new FormData(form);

			$.ajax({
				url: "uploadProfile.pie?email="+$("#input_email").val(),
				data: formData,
				type: 'POST',
				enctype: 'multipart/form-data',
				processData: false,
				contentType: false,
				async: false,
				cache: false,
				success: function(data) {
					
				}
			});
	}
});
