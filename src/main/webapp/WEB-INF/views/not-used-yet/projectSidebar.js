/*right sidebar contents wrapper*/
$(document).ready(function() {
	let btnClassName;
	let tmpBtnClassName = 'fas fa-clipboard-list';
	let wrapper = document.getElementById('right-sidebar-contents-wrapper');	
	
	$('#sidebar-kanban').click(function(){
		wrapper.className = 'right-sidebar-contents-wrapper-hidden';
		location.href = "goToMain.pie?projectNum=" + $("#projectNum").val();
	});
	$('#sidebar-calendar').click(function() {
		wrapper.className = 'right-sidebar-contents-wrapper-hidden';
		location.href = "fullcalendar.htm";
	});
	$('#sidebar-chart').click(function() {
		wrapper.className = 'right-sidebar-contents-wrapper-hidden';
		location.href = "chart.pie?projectNum=" + $("#projectNum").val();
	});
	/*kanban & calendar 아이콘 클릭 시 다른 창 display: none */

	/*아이콘 클릭 시 해당 창으로 이동*/
	$('#sidebar-star').click(function() {
		btnClassName = $(this)[0].className;
		sidebarToggle();
		if ($(".top-menu").hasClass("top-menu-light") === true) {
			$(".right-sidebar-contents-wrapper-display").toggleClass('right-sidebar-contents-wrapper-display-light')
		}
	});
	
	$(document).on("click", "#sidebar-bell", function() {
		btnClassName = $(this)[0].className;
		sidebarToggle();
		if ($(".top-menu").hasClass("top-menu-light") === true) {
			$(".right-sidebar-contents-wrapper-display").toggleClass('right-sidebar-contents-wrapper-display-light')
		}
	});
	
	$('#sidebar-file').click(function() {
		btnClassName = $(this)[0].className;
		sidebarToggle();
		if ($(".top-menu").hasClass("top-menu-light") === true) {
			$(".right-sidebar-contents-wrapper-display").toggleClass('right-sidebar-contents-wrapper-display-light')
		}
	});
	
	$('#sidebar-chat').click(function() {
		btnClassName = $(this)[0].className;
		sidebarToggle();
		if ($(".top-menu").hasClass("top-menu-light") === true) {
			$(".right-sidebar-contents-wrapper-display").toggleClass('right-sidebar-contents-wrapper-display-light')
		}
		//채팅방 목록 가져오기
		if (wrapper.className === 'right-sidebar-contents-wrapper-display') {
			$.ajax(
				{
					type: "GET",
					url: "chat/room/list",
					async: false,
					success: function(data) {
						chattingRoomList(data);
					},
					error: function(request, status, error) {
						alert(error);
					}
				}
			);

		}
		//채팅방 - 검색 입력 내용 초기화
		if (wrapper.className === 'right-sidebar-contents-wrapper-hidden') {
			$('#chat-search-box').val('');
		}
	});
	
	$('#sidebar-users').click(function() {
		btnClassName = $(this)[0].className;
		sidebarToggle();
		if ($(".top-menu").hasClass("top-menu-light") === true) {
			$(".right-sidebar-contents-wrapper-display").toggleClass('right-sidebar-contents-wrapper-display-light')
		}
	});

	/*
	$('#sidebar-mension').click(function(){
		btnClassName = $(this)[0].className;
		sidebarToggle();
		if($(".top-menu").hasClass("top-menu-light") === true){
		$(".right-sidebar-contents-wrapper-display").toggleClass('right-sidebar-contents-wrapper-display-light')
		}
	});
	*/


	function sidebarToggle() {

		let contentDiv = document.getElementById(btnClassName);
		if (wrapper.className === 'right-sidebar-contents-wrapper-hidden') {
			wrapper.className = 'right-sidebar-contents-wrapper-display';
			document.getElementById(tmpBtnClassName).style.display = 'none';
			contentDiv.style.display = 'block';
			tmpBtnClassName = btnClassName;
		} else {
			tmpBtnClassName = btnClassName;
			if (btnClassName === tmpBtnClassName) {
				wrapper.className = 'right-sidebar-contents-wrapper-hidden';
				contentDiv.style.display = 'none';
			} else { //이전에 클릭한 버튼과 일치하지 않을 때
				console.log("aaa" + tmpBtnClassName)
				contentDiv.style.display = 'block';
				document.getElementById(tmpBtnClassName).style.display = 'none';
				tmpBtnClassName = btnClassName;

				//채팅방 - 검색 입력 내용 초기화
				$('#chat-search-box').val('');
			}
		}
	};
});



