/*
파일명: chattingConnect.js
설명: 채팅방 window와 프로젝트메인 window가 띄워질 때 생성하도록 한 웹소켓입니다.
	 채팅방의 채팅 내용이 프로젝트메인에서 알람으로 실시간 표시기능을 구현하기 위해 생성하였습니다.
작성일: 2021-01-17
기능구현: 도재구
*/

var connectSocket = null;

$(document).ready(function(){
	connectWS_connect();
});

function connectWS_connect(){
	var connect_ws = new WebSocket("ws://ec2-54-180-187-182.ap-northeast-2.compute.amazonaws.com:8080/Project_PIE/websocket/connect/websocket");
	connectSocket = connect_ws;
	
	connect_ws.onopen = (event) => {};
	connect_ws.onmessage = (event) => {
		let data = event.data;
		chattingConnect(data);
	};
	connect_ws.onclose = (event) => {};
	connect_ws.onerror = (event) => {};
}

function chattingConnect(roomno){
	$('#chat-list-hidden').append('socket');
	$('#chat-list-hidden').empty();
}

