/*
파일명: chattingConnectChatAlarm.js
설명: 프로젝트메인 window가 띄워질 때 생성하도록 한 웹소켓입니다.
	 채팅방의 채팅 내용이 프로젝트메인에서 알람으로 실시간 표시기능을 구현하기 위해 생성하였습니다.
작성일: 2021-01-17
기능구현: 도재구
*/


var connectChatAlarm_Socket = null;

$(document).ready(function(){
	connectWS_connectChatAlarm();
});

function connectWS_connectChatAlarm(){
	var connectChatAlarm_ws = new WebSocket("ws://ec2-54-180-187-182.ap-northeast-2.compute.amazonaws.com:8080/Project_PIE/websocket/connectChatAlarm/websocket");
	connectChatAlarm_Socket = connectChatAlarm_ws;
	
	connectChatAlarm_ws.onopen = (event) => {};
	connectChatAlarm_ws.onmessage = (event) => {
		let data = event.data;
		chattingAlarm(JSON.parse(data));
		chattingAlarm_sidebar(JSON.parse(data));
		mensionAlarm_sidebar(JSON.parse(data));
	};
	connectChatAlarm_ws.onclose = (event) => {};
	connectChatAlarm_ws.onerror = (event) => {};
}

//채팅을 할 떄마다 상대방의 멘션에 알림됩니다. 
function mensionAlarm_sidebar(data2){
	firebase.database().ref().child('mension').orderByChild('mension_email').equalTo($('#session_email').val()).once('value',function(data){
		let data_arr = [];
		for(let i in data.val()){
			data_arr.push(data.val()[i]);
		}

		let countAlarm = 0;
		$.each(data_arr,function(index, elem){
			countAlarm += elem.count;
		});
		
		$('#mensionAlarmCount').css('display','block');
		$('#mensionAlarmCount').html(countAlarm);
		if($('#mensionAlarmCount').text() == 0){
			$('#mensionAlarmCount').css('display','none');
		}
	});
}

//채팅을 할 떄마다 상대방의 채팅방리스트에 알림됩니다. 
function chattingAlarm_sidebar(data2){
	$.ajax({
			type 		: "GET",
			url  		: "sidebar.pie",
			async		: false,
			success 	: function(data){
				$('#chatAlarmCount').css('display','block');
				$('#chatAlarmCount').html(data);
				
				if($('#chatAlarmCount').text() == 0){
					$('#chatAlarmCount').css('display','none');
				}
			},
			error		: function(request,status,error){
				alert(error);
			}
	});
}

//채팅을 할 떄마다 상대방의 채팅방리스트에 알림됩니다. 
function chattingAlarm(data2){
	
	$.ajax(
		{
			type 		: "GET",
			url  		: "roomlistGet.pie",
			async		: false,
			success 	: function(data){
				if($('#chat-list').find('div').length/8 < data.chat_room_list.length){
					$('#chat-list').empty();
				}
				
				let opr = "";
				$.each(data.chat_room_list,function(index,elem){
					
					if($('#chat-list').find('div').length/8 < data.chat_room_list.length){
						//프로젝트 제목
						let chat_title = elem.chatting_room_name;
						let chat_title_substr = "";
						if(chat_title.length >= 10){
							chat_title_substr = chat_title.substr(0,10) + "...";
						}else{
							chat_title_substr = chat_title;
						}
						
						opr = 	"<div id='chat-list-wrapper-"+elem.chatting_room_seq+"' class='chat-list-wrapper'>"+
									"<div id='chat-list-alarm-"+elem.chatting_room_seq+"' class='chat-list-alarm'>0</div>"+
									"<div class='chat-list-img'>";
										$.each(Object.keys(data.profiles),function(index, roomno){
											if(roomno == elem.chatting_room_seq){
												if(data.profiles[elem.chatting_room_seq].length > 3){
													if(data.profiles[elem.chatting_room_seq][0].profile != null){
														opr+=	"<img class='chat-list-img-1-1' src='./resources/profile/"+data.profiles[elem.chatting_room_seq][0].email+"_"+data.profiles[elem.chatting_room_seq][0].profile+"'>";
													}else{
														opr+=	"<img class='chat-list-img-1-1' src='./resources/img/icon/none.png'>";
													}
													if(data.profiles[elem.chatting_room_seq][1].profile != null){
														opr+=	"<img class='chat-list-img-1-2' src='./resources/profile/"+data.profiles[elem.chatting_room_seq][1].email+"_"+data.profiles[elem.chatting_room_seq][1].profile+"'>";
													}else{
														opr+=	"<img class='chat-list-img-1-2' src='./resources/img/icon/none.png'>";
													}
													if(data.profiles[elem.chatting_room_seq][2].profile != null){
														opr+=	"<img class='chat-list-img-1-3' src='./resources/profile/"+data.profiles[elem.chatting_room_seq][2].email+"_"+data.profiles[elem.chatting_room_seq][2].profile+"'>";
													}else{
														opr+=	"<img class='chat-list-img-1-3' src='./resources/img/icon/none.png'>";
													}
													if(data.profiles[elem.chatting_room_seq][3].profile != null){
														opr+=	"<img class='chat-list-img-1-4' src='./resources/profile/"+data.profiles[elem.chatting_room_seq][3].email+"_"+data.profiles[elem.chatting_room_seq][3].profile+"'>";
													}else{
														opr+=	"<img class='chat-list-img-1-4' src='./resources/img/icon/none.png'>";
													}
													
												}else if(data.profiles[elem.chatting_room_seq].length == 3){
													if(data.profiles[elem.chatting_room_seq][0].profile != null){
														opr+=	"<img class='chat-list-img-2-1' src='./resources/profile/"+data.profiles[elem.chatting_room_seq][0].email+"_"+data.profiles[elem.chatting_room_seq][0].profile+"'>";
													}else{
														opr+=	"<img class='chat-list-img-2-1' src='./resources/img/icon/none.png'>";
													}
													if(data.profiles[elem.chatting_room_seq][1].profile != null){
														opr+=	"<img class='chat-list-img-2-2' src='./resources/profile/"+data.profiles[elem.chatting_room_seq][1].email+"_"+data.profiles[elem.chatting_room_seq][1].profile+"'>";
													}else{
														opr+=	"<img class='chat-list-img-2-2' src='./resources/img/icon/none.png'>";
													}
													if(data.profiles[elem.chatting_room_seq][2].profile != null){
														opr+=	"<img class='chat-list-img-2-3' src='./resources/profile/"+data.profiles[elem.chatting_room_seq][2].email+"_"+data.profiles[elem.chatting_room_seq][2].profile+"'>";
													}else{
														opr+=	"<img class='chat-list-img-2-3' src='./resources/img/icon/none.png'>";
													}
																							
												}else if(data.profiles[elem.chatting_room_seq].length == 2){
													if(data.profiles[elem.chatting_room_seq][0].profile != null){
														opr+=	"<img class='chat-list-img-3-1' src='./resources/profile/"+data.profiles[elem.chatting_room_seq][0].email+"_"+data.profiles[elem.chatting_room_seq][0].profile+"'>";
													}else{
														opr+=	"<img class='chat-list-img-3-1' src='./resources/img/icon/none.png'>";
													}
													if(data.profiles[elem.chatting_room_seq][1].profile != null){
														opr+=	"<img class='chat-list-img-3-2' src='./resources/profile/"+data.profiles[elem.chatting_room_seq][1].email+"_"+data.profiles[elem.chatting_room_seq][1].profile+"'>";
													}else{
														opr+=	"<img class='chat-list-img-3-2' src='./resources/img/icon/none.png'>";
													}										
												}
												
											}
										});
						opr+=		"</div>"+
									"<div class='chat-list-letter-wrapper'>"+
										"<div id='chat-list-letter-title-"+elem.chatting_room_seq+"' class='chat-list-letter-title'>";
										if(elem.clicked == 0){
											opr+=	"<a id='chat-list-letter-a"+elem.chatting_room_seq+"' href='javascript:popupOpen("+elem.chatting_room_seq+",\""+chat_title_substr+"\");' class='chat-list-letter-a'>"+
														chat_title_substr+
													"</a>";
										}else{
											opr+=	chat_title_substr;
										}
											
						opr+=		"</div>"+
										"<div id='chat-list-letter-members-"+elem.chatting_room_seq+"' class='chat-list-letter-members'>"+data.nicknames[index]+"</div>"+
									"</div>"+
									"<div id='chat-list-update-"+elem.chatting_room_seq+"' class='chat-list-update'>"+
										"<i onclick='updateChatRoomName(this)' class='fas fa-pencil-alt'></i>"+
									"</div>"+
									"<div id='chat-list-cancel-"+elem.chatting_room_seq+"' class='chat-list-cancel'>"+
										"<i onclick='deleteChatRoom(this)' class='fas fa-times'></i>"+
									"</div>"+
								"</div>";
						$('#chat-list').append(opr);
					}
					

					
					if(elem.chatting_alarm != 0){
						$('#chat-list-alarm-'+elem.chatting_room_seq).css('display','block');
						$('#chat-list-alarm-'+elem.chatting_room_seq).html(elem.chatting_alarm);
					}
				});
			},
			error		: function(request,status,error){
				alert(error);
			}
		}
	);
}


