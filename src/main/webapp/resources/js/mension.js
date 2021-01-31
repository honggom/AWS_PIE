/*
파일명: mension.js
설명: 채팅방에서 멘션기능을 쓸수 있습니다.
	 (@ + 이름)을 표시하여 채팅 메시지를 전송하면 특정 사람이 멘션을 받을 수 있습니다.
	우측 사이드바에 멘션을 눌렀을 때 실행되는 함수입니다.
작성일: 2021-01-12
작성자: 도재구
*/

$(document).ready(function(){
	//페이지를 로드할 때마다 멘션 알림 숫자를 확인합니다.
	firebase.database().ref().child('mension').orderByChild('mension_email').equalTo($('#session_email').val()).once('value',function(data){
		let data_arr = [];
		for(let i in data.val()){
			data_arr.push(data.val()[i]);
		}

		let countAlarm = 0;
		$.each(data_arr,function(index, elem){
			countAlarm += elem.count;
		});
		
		$('#mensionAlarmCount').html(countAlarm);
		$('#mensionAlarmCount').css('display','block');
		if($('#mensionAlarmCount').text() == 0){
			$('#mensionAlarmCount').css('display','none');
		}
	});
});

//멘션 아이콘을 클릭하면 알림 숫자가 초기화 됩니다.
function mensionClicked(){
	firebase.database().ref().child('mension').orderByChild('mension_email').equalTo($('#session_email').val()).once('value',function(data){
		let data_arr2 = [];
		for(let i in data.val()){
			data_arr2.push(data.val()[i]);
		}
		$.each(data_arr2,function(index, elem){
			firebase.database().ref().child('mension/'+elem.mension_seq).update({
				count : 0
			});
		});
		$('#mensionAlarmCount').css('display','none');
	});
}

function mensionList(){
	//SELECT mension
	firebase.database().ref().child('mension').orderByChild('mension_email').equalTo($('#session_email').val()).once('value',function(data){
		let data_arr = [];
		for(let i in data.val()){
			data_arr.push(data.val()[i]);
		}
		
		$('#mension-items-wrapper').empty();
		
		if(data.val() != null){
			$.each(data_arr,function(index, elem){
					let opr = '';
					$.ajax({
							type : "GET",
							url  : "mension",
							async: false,
							data : { 
								'chatting_room_seq' : elem.chatting_room_seq, 
								'sender_email' : elem.email
							},
							success : function(roomdata){
								if(roomdata.length != 0){
									opr += 	'<div onclick="popupOpen('+elem.chatting_room_seq+',\''+roomdata[0].chatting_room_name+'\')" class="mension-item-wrapper">'+
												'<div class="mension-top-wrapper">'+
													'<div class="mension-user">';
														if(roomdata != null){
															opr+= "<img class='mension-img' src='./resources/profile/"+roomdata[0].email+"_"+roomdata[0].profile+"'>";
														}else{
															opr+= '<i class="fas fa-user"></i>';
														}
									opr+=			'</div>'+
													'<div class="mension-username">'+elem.nickName+'</div>'+
													'<div class="mension-roomname">'+roomdata[0].chatting_room_name+'</div>'+
													//'<div class="mension-cancel"><i class="fas fa-times"></i></div>'+
												'</div>'+
												'<div class="mension-middle-wrapper">'+
													'<div class="mension-time">'+elem.message_date+'&nbsp;'+elem.message_time+'</div>'+
												'</div>'+
												'<div class="mension-bottom-wrapper">'+
													elem.message_content+
												'</div>'+
											'</div>';
								}
								
							}
					});
					$('#mension-items-wrapper').append(opr);
			});
		}
	});
	
	
}