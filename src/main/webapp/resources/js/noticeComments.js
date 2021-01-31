/*
파일명: kanbanComments.js
설명: 칸반 카드 모달 댓글 CRUD, AJAX
작성일: 2021-01-17 ~
작성자: 문지연
*/

$(document).ready(function(){

					
	function commentsIcon(notice_comments_seq,email,nickName,reg_date,comments){
		let commTag = '<div class="commMemWrap-notice" data-com-seq="'+notice_comments_seq+'"value="'+email+
						'"><img class="commPro-notice" src="./resources/img/icon/none.png">'+
						'<div class="writerWrap-notice"><p class="commWriter-notice">'+nickName+'</p><p class="commDate-notice">'+reg_date+'</p></div>'+
						'<div class="memCommentWrap-notice"><div class="memComment-notice">'+comments;
		return commTag;
	}
	
	function commentsPro(notice_comments_seq,email,profile,nickName,reg_date,comments){
		let commTag = '<div class="commMemWrap-notice" data-com-seq="'+notice_comments_seq+'"value="'+email+
						'"><img class="commPro-notice" src="./resources/profile/'+email+'_'+profile+'">'+
						'<div class="writerWrap-notice"><p class="commWriter-notice">'+nickName+'</p><p class="commDate-notice">'+reg_date+'</p></div>'+
						'<div class="memCommentWrap-notice"><div class="memComment-notice">'+comments;
		return commTag;
	}
	
	function FormWithIcon(){
		let formIcon = '</div><div class="commIcons-notice"><i class="fas fa-eraser editComm"></i>'+
						'<i class="far fa-trash-alt deleteComm-notice"></i></div></div>'+
						'<div class="editFormWrap-notice"><form class="editCommentsForm-notice" style="display:none;">'+
						'<textarea class="editAddComments-notice" cols="30" rows="10" placeholder="">'+
						'</textarea><div class="btnWrap-notice"><button class="editcancel-btn-notice">Cancel</button>'+
						'<button class="editAddComments-btn-notice">Save</button></div>'+
						'</form></div>';
		return formIcon;
	}
		
	function FormWoIcon(){
		let formTag = '</div></div><div class="editFormWrap-notice"><form class="editCommentsForm-notice" style="display:none;">'+
						'<textarea class="editAddComments-notice" cols="30" rows="10" placeholder="">'+
					  '</textarea><div class="btnWrap-notice"><button class="editcancel-btn-notice">Cancel</button>'+
					  '<button class="editAddComments-btn-notice">Save</button></div>'+
					  '</form></div></div>';
		return formTag;
	}
	
	//session EMail
	let myEmail = $('#email').val();
	let nickName = $('#nick').val();
	
	//get time for ajax
	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	let dateTime = date+' '+time;
	
	/*Insert Comments*/
	$(document).on("submit", ".commentsForm-notice", function(e) {
		e.preventDefault();
		let commentsOb = new Object();
		let comments = $(this).children('.addComments-notice').val();
		let notice_seq = $("#notice_seq_hidden").val();
		
		commentsOb.comments=comments;
		commentsOb.notice_seq=$("#notice_seq_hidden").val();
		commentsOb.email=myEmail;
		
		let noticeComments = JSON.stringify(commentsOb);

			$.ajax({
				type: "post",
				url: "insertNoticeComments.pie",
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				data: noticeComments,
				success: function(data) {
					let comments=data.comments;
					if(comments.profile==null){
						let commIcon = commentsIcon(comments.notice_comments_seq,comments.email,nickName,dateTime,comments.comments);
						if(comments.email==myEmail){
							commIcon += FormWithIcon()
							$('.comments-notice').append(commIcon);
						}else{
							commIcon += FormWoIcon();
							$('.comments-notice').append(commIcon);
						}
					}else {
						let commPro = commentsPro(comments.notice_comments_seq,comments.email,comments.profile,nickName,comments.reg_date,comments.comments);
						if(comments.email==myEmail){
							commPro += FormWithIcon()
							$('.comments-notice').append(commPro);
						}else{
							commPro += FormWoIcon()
							$('.comments-notice').append(commPro);
						}
					}
				}
			});
			$(this).children('.addComments-notice').val("");
			
	});
	
	/*Get comments*/
	$(document).on('click','.notice-item-wrapper',function(e){
		e.preventDefault();
		$('.comments-notice').show();
		$('.commentsForm-notice').show();
		
		let notice_seq=$("#notice_seq_hidden").val()
		$.ajax({
				type: "post",
				url: "loadNoticeComments.pie?notice_seq="+notice_seq,
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				success: function(data) {
					let commList = data.commList;
					$.each(commList, function(index, item) {
					if(item.profile==null){
						let commIcon = commentsIcon(item.notice_comments_seq,item.email,item.nickName,item.reg_date,item.comments);
						let editedIcon = commentsIcon(item.notice_comments_seq,item.email,item.nickName,item.reg_date+' (edited)',item.comments);
						if(item.email==myEmail&&item.edited===1){
							editedIcon += FormWithIcon();
							$('.comments-notice').append(editedIcon);
						}else if(item.email==myEmail){
							commIcon += FormWithIcon();
							$('.comments-notice').append(commIcon);
						}else if(item.edited===1){
							editedIcon += FormWoIcon();
							$('.comments-notice').append(editedIcon);
						}else{
							commIcon += FormWoIcon();
							$('.comments-notice').append(commIcon);
						}
					}else {
						let commPro = commentsPro(item.notice_comments_seq,item.email,item.profile,item.nickName,item.reg_date,item.comments);
						let editedPro = commentsPro(item.notice_comments_seq,item.email,item.profile,item.nickName,item.reg_date+' (edited)',item.comments);
						if(item.email==myEmail&&item.edited===1){
							editedPro += FormWithIcon();
							$('.comments-notice').append(editedPro);
						}else if(item.email==myEmail){
							commPro += FormWithIcon();
							$('.comments-notice').append(commPro);
						}else if(item.edited===1){
							editedPro += FormWoIcon();
							$('.comments-notice').append(editedPro);
						}else{
							commPro += FormWoIcon();
							$('.comments-notice').append(commPro);
						}
					}
				
				});
				}
			});
	});

	
	//delete comments
	$(document).on('click','.fa-trash-alt.deleteComm-notice',function(){
		let commSeq = Number($(this).parents('.commMemWrap-notice').attr('data-com-seq'));
		let deletedComm = $(this).parents('.commMemWrap-notice');
		
		$.ajax({
			url: "deleteNoticeComments.pie?notice_comments_seq="+commSeq,
			contentType: "application/json; charset=UTF-8",
			type: "post",
			async: "false",
			dataType: "json",
			success: function(data){
				deletedComm.animate({
				left:"-30%",
				height: 0,
				opacity: 0
			}, 200);
			setTimeout(function() { deletedComm.remove(); }, 1000);
			}
		});
	});
	
	//edit Comments
	$(document).on("click",".fa-eraser.editComm",function(){
		let commSeq = Number($(this).parents('.commMemWrap-notice').attr('data-com-seq'));
		let origin = $(this).parents('.commMemWrap-notice').children().children('.memComment-notice');
		let commentsWrap = $(this).parent().parent();
		
		$(this).parents().children().children('.editCommentsForm-notice').show();
		commentsWrap.hide();
		$('.commIcons-notice').hide();
		$('.commentsForm-notice').hide();
		$('.editAddComments-notice').attr('placeholder',origin.html());
		
		//edited val submit
		$(document).on("submit",".editCommentsForm-notice",function(e){
		e.preventDefault();
		let editedComm = $(this).children('.editAddComments-notice').val();
		let thisComm = $(this).children('.editAddComments-notice');
		
		let commOb = new Object();
		commOb.notice_comments_seq = commSeq;
		commOb.comments = editedComm;
		
		let comment = JSON.stringify(commOb);
		
		if(thisComm.val().length>0){
		$.ajax({
			url: "updateNoticeComment.pie",
			contentType: "application/json; charset=UTF-8",
			type: "post",
			async: "false",
			dataType: "json",
			data: comment,
			success: function(data){
				$('.commentsForm').show(); 
				thisComm.val("");
			}
		});
		$(this).hide();
		let memCommWrap = $(this).parent().prev();
		memCommWrap.show();
		$('.commIcons-notice').show();
		memCommWrap.children('.memComment-notice').text(editedComm);
		memCommWrap.prev().children('.commDate-notice').text(dateTime+' (edited)');
		}
		});
	});
	
	//close eidt Comment Form 
	$(document).on("click",".editcancel-btn",function(e){
		e.preventDefault();
		let thisCh = $(this).parents().children();
		thisCh.children('.editAddComments-notice').val("");
		thisCh.children('.editCommentsForm-notice').hide();
		thisCh.children('.memCommentWrap-notice').show();
		$('.commentsForm-notice').show(); 
		$('.commIcons-notice').show();
	});
	

	//게시판 상세창 종료및 삭제시 실행되는 이벤트
	$(document).on("click", "#editCancel, #deletenotice", function(e) {
		e.preventDefault();
		$(".comments-notice").empty();
		$('.commentsForm-notice').hide();
	});

});