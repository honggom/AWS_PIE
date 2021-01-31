/*
파일명: kanbanComments.js
설명: 칸반 카드 모달 댓글 CRUD, AJAX
작성일: 2021-01-17 ~
작성자: 문지연
*/

$(document).ready(function(){
	
	function commentsIcon(comments_seq,email,nickName,reg_date,comments){
		let commTag = '<div class="commMemWrap" data-com-seq="'+comments_seq+'"value="'+email+
						'"><img class="commPro" src="./resources/img/icon/none.png">'+
						'<div class="writerWrap"><p class="commWriter">'+nickName+'</p><p class="commDate">'+reg_date+'</p></div>'+
						'<div class="memCommentWrap"><div class="memComment">'+comments;
		return commTag;
	}
	
	function commentsPro(comments_seq,email,profile,nickName,reg_date,comments){
		let commTag = '<div class="commMemWrap" data-com-seq="'+comments_seq+'"value="'+email+
						'"><img class="commPro" src="./resources/profile/'+email+'_'+profile+'">'+
						'<div class="writerWrap"><p class="commWriter">'+nickName+'</p><p class="commDate">'+reg_date+'</p></div>'+
						'<div class="memCommentWrap"><div class="memComment">'+comments;
		return commTag;
	}
	
	function FormWithIcon(){
		let formIcon = '</div><div class="commIcons"><i class="fas fa-eraser editComm"></i>'+
						'<i class="far fa-trash-alt deleteComm"></i></div></div>'+
						'<div class="editFormWrap"><form class="editCommentsForm" style="display:none;"><textarea class="editAddComments" cols="30" rows="10" placeholder="">'+
						'</textarea><div class="btnWrap"><button class="editcancel-btn">Cancel</button>'+
						'<button class="editAddComments-btn">Save</button></div>'+
						'</form></div>';
		return formIcon;
	}
		
	function FormWoIcon(){
		let formTag = '</div></div><div class="editFormWrap"><form class="editCommentsForm" style="display:none;"><textarea class="editAddComments" cols="30" rows="10" placeholder="">'+
					  '</textarea><div class="btnWrap"><button class="editcancel-btn">Cancel</button>'+
					  '<button class="editAddComments-btn">Save</button></div>'+
					  '</form></div></div>';
		return formTag;
	}
	
	function countComm(total){
		let commTag = "<i class='far fa-comment-dots' style='margin-right:7px;'> " +total+"</i>";
		return commTag;
	}
	
	//session EMail
	let myEmail = $('#email').val();
	let nickName = $('#nick').val();
	
	//get time for ajax
	let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	let dateTime = date+' '+time;
	
	/*Insert Comments*/
	$(document).on("submit", ".commentsForm", function(e) {
		e.preventDefault();
		let commentsOb = new Object();
		let comments = $(this).children('.addComments').val();
		let card_seq = $(this).parents().children().children('.modal_card_seq').attr('value');
		
		
		$.ajax({
			type: "post",
			url: "getProAndSeq.pie?email="+myEmail,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				commentsOb.profile=data[0].profile;
				commentsOb.comments_seq=data[0].comments_seq;
				}
			});
		
		commentsOb.comments=comments;
		commentsOb.card_seq=card_seq;
		commentsOb.email=myEmail;
		
		let cardComments = JSON.stringify(commentsOb);
		
		let thisIcon = $("[data-card-seq="+card_seq+"]").children('.icons');
		let total = Number($(this).parents().children('.comments').children('.commMemWrap').length+1);

			$.ajax({
				type: "post",
				url: "insertComments.pie",
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				data: cardComments,
				success: function(data) {
					let comments=data.comments;
					if(comments.profile==null){
						let commIcon = commentsIcon(comments.comments_seq,comments.email,nickName,dateTime,comments.comments);
						if(comments.email==myEmail){
							commIcon += FormWithIcon()
							$('.comments').append(commIcon);
						}else{
							commIcon += FormWoIcon();
							$('.comments').append(commIcon);
						}
					}else {
						let commPro = commentsPro(comments.comments_seq,comments.email,comments.profile,nickName,dateTime,comments.comments);
						if(comments.email==myEmail){
							commPro += FormWithIcon()
							$('.comments').append(commPro);
						}else{
							commPro += FormWoIcon()
							$('.comments').append(commPro);
						}
					}
				}
			});
			$(this).children('.addComments').val("");
			
			if(total===1&&thisIcon.hasClass('.fa-check-square')){
				thisIcon.show();
				let com = countComm(total);
				thisIcon.children('.fa-check-square').append(" "+com);
			}else if(total===1){
				thisIcon.show();
				let com = countComm(total);
				thisIcon.append(com);
			}else{
				thisIcon.children('.fa-comment-dots').text(" "+total);
			}
			
			
	});
	
	/*Get comments*/
	$(document).on('click','.cardContent',function(e){
		e.preventDefault();
		$('.comments').show();
		$('.commentsForm').show();
		
		let cardSeq = Number($('.modal_card_seq').attr("value"));
		
		$.ajax({
				type: "post",
				url: "loadComments.pie?cardSeq="+cardSeq,
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				success: function(data) {
					let commList = data.commList;
					$.each(commList, function(index, item) {
					if(item.profile==null){
						let commIcon = commentsIcon(item.comments_seq,item.email,item.nickName,item.reg_date,item.comments);
						let editedIcon = commentsIcon(item.comments_seq,item.email,item.nickName,item.reg_date+' (edited)',item.comments);
						if(item.email==myEmail&&item.edited===1){
							editedIcon += FormWithIcon();
							$('.comments').append(editedIcon);
						}else if(item.email==myEmail){
							commIcon += FormWithIcon();
							$('.comments').append(commIcon);
						}else if(item.edited===1){
							editedIcon += FormWoIcon();
							$('.comments').append(editedIcon);
						}else{
							commIcon += FormWoIcon();
							$('.comments').append(commIcon);
						}
					}else {
						let commPro = commentsPro(item.comments_seq,item.email,item.profile,item.nickName,item.reg_date,item.comments);
						let editedPro = commentsPro(item.comments_seq,item.email,item.profile,item.nickName,item.reg_date+' (edited)',item.comments);
						if(item.email==myEmail&&item.edited===1){
							editedPro += FormWithIcon();
							$('.comments').append(editedPro);
						}else if(item.email==myEmail){
							commPro += FormWithIcon();
							$('.comments').append(commPro);
						}else if(item.edited===1){
							editedPro += FormWoIcon();
							$('.comments').append(editedPro);
						}else{
							commPro += FormWoIcon();
							$('.comments').append(commPro);
						}
					}
				
				});
				}
			});
	});

	
	//delete comments
	$(document).on('click','.fa-trash-alt.deleteComm',function(){
		let cardSeq = Number($(this).parents().children().children('.modal_card_seq').val());
		let commSeq = Number($(this).parents('.commMemWrap').attr('data-com-seq'));
		let deletedComm = $(this).parents('.commMemWrap');
		
		let afterDel = $(this).parents().children('.commMemWrap').length-1;
		let commIcon = $("[data-card-seq="+cardSeq+"]").children('.icons').children('.fa-comment-dots');
		
		$.ajax({
			url: "deleteCardComment.pie?commSeq="+commSeq,
			contentType: "application/json; charset=UTF-8",
			type: "post",
			async: "false",
			dataType: "json",
			success: function(data){
				
				if(afterDel===0){
					commIcon.remove();
				}else{
					commIcon.text(" "+afterDel);
				}
				
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
		let commSeq = Number($(this).parents('.commMemWrap').attr('data-com-seq'));
		let origin = $(this).parents('.commMemWrap').children().children('.memComment');
		let commentsWrap = $(this).parent().parent();
		
		$(this).parents().children().children('.editCommentsForm').show();
		commentsWrap.hide();
		$('.commIcons').hide();
		$('.commentsForm').hide();
		$('.editAddComments').attr('placeholder',origin.html());
		
		//edited val submit
		$(document).on("submit",".editCommentsForm",function(e){
		e.preventDefault();
		let editedComm = $(this).children('.editAddComments').val();
		let thisComm = $(this).children('.editAddComments');
		
		let commOb = new Object();
		commOb.comments_seq = commSeq;
		commOb.comments = editedComm;
		
		let comment = JSON.stringify(commOb);
		
		if(thisComm.val().length>0){
		$.ajax({
			url: "editCardComment.pie",
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
		$('.commIcons').show();
		memCommWrap.children('.memComment').text(editedComm);
		memCommWrap.prev().children('.commDate').text(dateTime+' (edited)');
		}
		});
	});
	
	//close eidt Comment Form 
	$(document).on("click",".editcancel-btn",function(e){
		e.preventDefault();
		let thisCh = $(this).parents().children();
		thisCh.children('.editAddComments').val("");
		thisCh.children('.editCommentsForm').hide();
		thisCh.children('.memCommentWrap').show();
		$('.commentsForm').show(); 
		$('.commIcons').show();
	});
	

	//close Modal
	$(document).on("click", ".closeModal", function(e) {
		e.preventDefault();
		$(".comments").empty();
		$('.commentsForm').hide();
	});

});