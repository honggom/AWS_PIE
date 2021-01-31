/*
파일명: projectMainChat.js
설명: 채팅생성창 및 사용자 화면에서 회원 ON/OFF 상태 확인
작성일: 2021-01-12
작성자: 도재구
*/
var logonSocket = null;
$(document).ready(function(){
	connectWS_logon();
});

function connectWS_logon(){
	var logon_ws = new WebSocket("ws://ec2-54-180-187-182.ap-northeast-2.compute.amazonaws.com:8080/Project_PIE/websocket/logon/websocket");
	logonSocket = logon_ws;
	
	logon_ws.onopen = (event) => {
		
	};
	logon_ws.onmessage = (event) => {
		let data = event.data;
		logonUser(JSON.parse(data));
		usersLogon(JSON.parse(data));

	};
	logon_ws.onclose = (event) => {
		
	};
	logon_ws.onerror = (event) => {};
}
	function usersLogon(data){
	//유저리스트의 데이터
	let div_length = $('#users').find('div').length;
	for(let j=1; j <= div_length / 7; j++){
		let k = j * 7 - 1;
		let div = $('#users').find('div:eq('+k+')').text().trim().split(':');
		let mail = div[1]
		let index = j-1;
		$('#users-select-user-on-'+index).css('visibility','hidden');
		//방금 서버에서 가져온 데이터
		for(let i=0; i < data.length; i++){
			if(data[i] == mail){
				$('#users-select-user-on-'+index).css('visibility','visible');
			}	
		}
	}
}