/*
파일명: NewprojectSidebar.js
설명: 사이드바 오픈 처리 js
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/


$(document).ready(function() {
	//칸반 페이지 이동
	$('#sidebar-kanban').click(function() {
		location.href = "goToMain.pie?projectNum=" + $("#projectNum").val();
	});

	//캘린더 페이지 이동
	$('#sidebar-calendar').click(function() {
		location.href = "fullcalendar.htm";
	});

	//차트 페이지 이동
	$('#sidebar-chart').click(function() {
		location.href = "chart.pie?projectNum=" + $("#projectNum").val();
	});
	
	//현재 사이드바 태그
	let currentSideBar = null;

	//즐겨찾기 사이드바 오픈
	$('#sidebar-notice').click(function() {
		sideBarOpen("right-sidebar-contents-wrapper-notice");
	});

	//알람 사이드바 오픈
	$('#sidebar-bell').click(function() {
		sideBarOpen("right-sidebar-contents-wrapper-alarm");
	});

	//파일 사이드바 오픈
	$('#sidebar-file').click(function() {
		sideBarOpen("right-sidebar-contents-wrapper-file");
	});

	//채팅 사이드바 오픈
	$('#sidebar-chat').click(function() {
		sideBarOpen("right-sidebar-contents-wrapper-chat");
		
		if(document.getElementById("right-sidebar-contents-wrapper-chat").className == "right-sidebar-contents-wrapper-display"){
			$.ajax({
					type: "GET",
					url: "roomlistGet.pie",
					async: false,
					success: function(data) {
						chattingRoomList(data);
					},
					error: function(request, status, error) {
						alert(error);
					}
			});
		}
		//채팅방 - 검색 입력 내용 초기화
		if (document.getElementById("right-sidebar-contents-wrapper-chat").className == "right-sidebar-contents-wrapper-hidden") {
			$('#chat-search-box').val('');
		}
		
	});

	//멤버 사이드바 오픈
	$('#sidebar-users').click(function() {
		sideBarOpen("right-sidebar-contents-wrapper-users");
	});
	
	//멘션 사이드바 오픈
	$('#sidebar-mension').click(function() {
		sideBarOpen("right-sidebar-contents-wrapper-mension");
		if(document.getElementById("right-sidebar-contents-wrapper-mension").className == "right-sidebar-contents-wrapper-display"){
			mensionList();
			mensionClicked();
		}
	
	});
	
	//사이드바 오픈 함수
	function sideBarOpen(clickedBtnId) {
		if (currentSideBar === document.getElementById(clickedBtnId)) {
			currentSideBar.className = "right-sidebar-contents-wrapper-hidden";
			currentSideBar = null;
		}else if(currentSideBar === null){
			currentSideBar = document.getElementById(clickedBtnId);
			document.getElementById(clickedBtnId).className = "right-sidebar-contents-wrapper-display";
		}else {
			currentSideBar.className = "right-sidebar-contents-wrapper-hidden";
			currentSideBar = document.getElementById(clickedBtnId);
			document.getElementById(clickedBtnId).className = "right-sidebar-contents-wrapper-display";
			
			//채팅방 - 검색 입력 내용 초기화
			$('#chat-search-box').val('');
		}
	}


});



