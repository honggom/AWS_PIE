/*
파일명: chattingEmoji.js
설명: 채팅방 내에 이모지 기능이 적용되도록 구현하였습니다.
작성일: 2021-01-17
기능구현: 도재구
*/

$( () => {
	getEmoticons($('.emoji-area'));
	getChattingUserList();
	
	let emoji_content = $('.emoji-content');
	let mension_content = $('.mension-content');

	// 모달처럼 이모티콘 닫기
	$(document).on('click', (ev) => {
		if(emoji_content.hasClass('appear')){
			switchAnimation(emoji_content);
		}
		if(mension_content.hasClass('appear')){
			popupMension(mension_content);
		}
	});




	// 이모티콘 태그 토글 : 캡쳐링 방지
	$('.smile-o').on('click', (ev) =>{
		ev.stopPropagation();
		switchAnimation(emoji_content);
	});

	$('.fa-at').on('click', (event) => {
		event.stopPropagation();
		popupMension(mension_content);
	});

	// 캡쳐링 방지
	emoji_content.on('click', (ev) => {
		ev.stopPropagation();
	});
	
	mension_content.on('click', (event) => {
		event.stopPropagation();
	});


});

function getChattingUserList(){
	$.ajax({
		type : "GET",
		url  : "chat/users?select="+$('#select').val(),
		async: false,
		error: function(request,status,error){
			alert(error);
		},
		success : function(data){}
	});
}

function getEmoticons(target){
   $.ajax(
      {
         url : "./resources/json/emoticon.json",
         type : "GET",
         dataType : "json",
         beforeSend : () => {
            // 보내기 전
         },
         complete: (jqXHR, textStatus) => {},
         success : (data) => {
            
            $.each(data, (key, value) => {
               
               // 이모티콘 테마 태그
               let emojiBlock = '<hr class="hr-small">'
                           + '<div class="emoji-head" title="'+ key + '">'
                           + '<h5 class="emoji-theme">' + key + '</h5>'
                           + '</div>'
                           + '<hr class="hr-small">'
                           + '<div class="each-list">';

               for(let seq in value){
                  emojiBlock += '<div class="list-item"'
                             + 'id="' + value[seq].no + '" title="' + value[seq].description + '">' 
                             + '<span class="emoticon" onclick="inputEmoji(this)">' + value[seq].emoji + '</span>'
                             + '</div>';
               }
               
               emojiBlock += '<hr class="hr-small">';
               
               target.append(emojiBlock);
            });
         },

         error : (xhr) => {}
      }
   );
}

// 이모티콘 커서 위치 조정 함수
$.fn.setCursorPosition = function( pos )
{
  this.each( function( index, elem ) {
    if( elem.setSelectionRange ) {
      elem.setSelectionRange(pos, pos);
    } else if( elem.createTextRange ) {
      var range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  });

  return this;
};


// 이모티콘 리스너
function inputEmoji(me){

	let element = document.getElementById('message');
	let strOriginal = $('#message').text();
	var selection = window.getSelection();
	let strFront = "";
	let strEnd = "";
	      
	strFront = strOriginal.substring(0, strOriginal.length);
	//strEnd = strOriginal.substring(strOriginal.indexOf(me.innerHTML), strOriginal.length);
	
	$('#message').text(strFront + me.innerHTML);
	$('#message').focus();
	selection.selectAllChildren(element);
	selection.collapseToEnd();
	$('.chat-msgWrite-btn-not').attr('class','chat-msgWrite-btn');
	
}


// 이모티콘 켜기/끄기
function switchAnimation(target) {
	let element = document.getElementById('message');
	let selection = window.getSelection();
	
	if(!$('.emoji-content').hasClass('disappear2')){
		if(target.hasClass('appear')){
			target.addClass('disappear');
			setTimeout( () => {
				target.removeClass('appear'); 
				target.css('display','none'); 
			}, 580 );
			
		}else {
			target.removeClass('disappear').addClass('appear');
			target.css('display','block');
			$('#message').focus();
			selection.selectAllChildren(element);
			selection.collapseToEnd();
		}
	}
}