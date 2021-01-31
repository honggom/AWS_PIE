/*
파일명: kanbanDetailModal.js
설명: 칸반 카드 상세페이지 내 구현될 체크리스트, 담당자 등록 jqery&js
작성일: 2021-01-04 ~ 2021-01-
작성자: 문지연
*/

$(document).ready(function() {

	function makeChkList(check_seq, check_name, ischecked) {
		let chkTag = '<span class="todo-wrap"><input type="checkbox" id="checkList" data-check-seq="' +
			check_seq + '" isChecked="' + ischecked + '"/><label for="' + check_seq +
			'" class="todo"><i class="fa fa-check"></i>' + check_name + '</label>' +
			'<span class="delete-item" title="remove"><i class="fa fa-times-circle"></i></span></span>';
		return chkTag;
	}
	
	function cardMemIcon(email,nickName) {
		let memIcon = "<img class='selectedMemPro' id='selectedMemPro' title='"+nickName+
							"("+email+")' value="+email+
						' src="./resources/img/icon/none.png">';
		return memIcon;
	}
	
	function cardMemPro(email,nickName,profile){
		let memPro = "<img class='selectedMemPro' id='selectedMemPro' title='"+nickName+
							"("+email+")' value="+email+
						' src="./resources/profile/'+email+'_'+profile+'">';
		return memPro;
	}
	
	function cardProfile(email,nickName,profile){
		let cardPro = "<img class='selectedMemPro' id='selectedMemPro' title='"+nickName+
							"("+email+")' value="+email+
						' src="'+profile+'">';
		return cardPro;
	}
	
	function loadChkList(ischecked,total){
		let chkTag = "<i class='far fa-check-square'> "+ischecked+"/"+total+"</i>";
		return chkTag;
	}
	
	$('#selectedMemPro').tooltip({
		show: {
			effect: "slideDown",
			delay: 150
		}
	});

	//show progress bar by checked boxes
	function progressBar() {
		let total = $('.todo-wrap').length;
		let checked = $('.todo-wrap').find('input[ischecked="1"]').length;
		let percentage = parseInt(((checked / total) * 100), 10);
		
		$('.progressbar').progressbar({
			value: percentage
		});
		
		if(isNaN(percentage)||percentage<0){
			$('.progressbar-label').text(0 + "%");
		}else{
			$('.progressbar-label').text(percentage + "%");
		}
		
	}
	//get Modal Id
	const details = document.getElementById("detailsModal");
	
	//Open clicked Modal
	$(document).on("click", ".cardContent", function(e) {
		e.preventDefault();
		details.style.display = "block";
		//set clicked Card Content cardSeq as a value
		$('.modal_card_seq').attr("value", $(this).data().cardSeq);
		let cardSeq = Number($('.modal_card_seq').attr("value"));
			/*캘린더연동 유무*/
			$.ajax({
			type : "GET",
			url  : "calendarListKanbanDetail.pie",
			data:{	card_seq:cardSeq },
				success : function(data){	
				if(data === ""){
				$('.getDueDateBtn').css("display","none")
				$('.setDueDateBtn').css("display","")
				}else{
				$('.getDueDateBtn').css("display","")
				$('.setDueDateBtn').css("display","none")	
				}		
				}
		})
		//get cardMember 
		
		$.ajax({
			type:"get",
			url:"showMemberByCard.pie?cardSeq="+cardSeq,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				$.each(data, function(index, item) {
					if(item.profile==null){
						let memIcon = cardMemIcon(item.email,item.nickName);
						$('.memList').append(memIcon);
					}else {
						let memPro = cardMemPro(item.email,item.nickName,item.profile);
						$('.memList').append(memPro);
					}
					
					if(data.length>0){
					$('#memTitle').text($(this).context).show();
					}
				});
			}
		});

		
		//get card Name&Content 
		$.ajax({
			type: "post",
			url: "getCardContent.pie?cardSeq="+cardSeq,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data){
				$('.cardTitleMo').text(data[0].card_name);
				if($.trim(data[0].card_content)==""){
					$('.cardDetailsForm').show();
					$('.fa-edit').hide();
					$('.cardContents').hide();
				}else{
					$('.cardContents').show();
					$('.cardContents').text(data[0].card_content);
					$('.fa-edit').show();
					$('.cardDetailsForm').hide();
				}
				
			}
			
		})
		
		//get saved checkList
		$.ajax({
			type: "post",
			url: "loadCheckList.pie?cardSeq=" + cardSeq,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				let chkList = data.chkList;
				$.each(chkList, function(index, item) {
					let chkTag = makeChkList(item.check_seq, item.check_name, item.ischecked);
					$("#add-todo").parent().prepend(chkTag);
				});
			}
		});

		//show checked status
		$('.todo-wrap').each(function() {
			let chkVal = $(this).children('input').attr('ischecked');
			if (chkVal == 1) {
				$(this).children('input').prop('checked', true);
			}
		});

		//show progress Bar
		progressBar();
	});
	
	
	//edit card Content
	$(document).on("click", ".fa-edit", function(e) {
		let cardText = $('.fa-edit').parents().children().children('.cardContents').html();
		e.preventDefault();
		$('.fa-edit').hide();
		$('.cardContents').hide();
		$('.cardDetailsForm').show();
		$('.addCardDetails').focus();
		
	});
	//close Modal
	$(document).on("click", ".closeModal", function(e) {
		e.preventDefault();
		details.style.display = "none";
		$(".todo-wrap").remove();
		$('.selectedMemPro').remove();
		$('.addCardDetails').val("");
		$('#memTitle').hide();
	});

	window.onclick = function(e) {
		if (e.target == details) {
			details.style.display = "none";
			$(".todo-wrap").remove();
			$('.selectedMemPro').remove();
			$('.addCardDetails').val("");
			$('#memTitle').hide();
		}
	}

	//open edit card Title form in Modal
	$(document).on("click", ".cardTitleMo", function(e) {
		e.preventDefault();
		let cardTitleForm = $(this).parent().children("#cardTitleForm");
		cardTitleForm.children("#cardTitleInput").attr("placeholder", $(this).html());
		$(".cardTitleMo").hide();
		cardTitleForm.show();
		cardTitleForm.children("#cardTitleInput").focus();
	});

	//make edit card Title disappear
	$(document).on("click", function(e) {
		if (!$(e.target).closest(".cardTitleMo").length) {
			$("#cardTitleForm").hide();
			$(".cardTitleMo").show();
		}
	});

	//edit card Title in Modal
	$(document).on("submit", ".cardTitleForm", function(e) {
		e.preventDefault();
		let editedCardTitle = $(this).parents().children().children("#cardTitleInput").val();
		let modal_card_seq = $(this).parents().children().children('.modal_card_seq').attr('value');
		
		let cardOb = new Object();
		cardOb.card_seq = modal_card_seq;
		cardOb.card_name = editedCardTitle;

		let card = JSON.stringify(cardOb);
		let thisCard = $("[data-card-seq=" + modal_card_seq + "]");
		if (editedCardTitle.length > 0) {
			$.ajax({
				type: "post",
				url: "editKanbanCardTitle.pie",
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				data: card,
				success: function(data) {
					thisCard.children('.cardName').text(data.data.card_name);
				}
			});
			$('.cardTitleMo').html(editedCardTitle);
			$(this).parents().children().children("#cardTitleInput").val("");
			$('.cardTitleForm').hide();
			$('.cardTitleMo').show();
		}
	});
	
	/*Card Details*/
	$(document).on("submit", ".cardDetailsForm", function(e) {
		e.preventDefault();
		let cardOb = new Object();
		let contents = $(this).children('.addCardDetails').val();
		let cardSeq = $(this).parents().children().children('.modal_card_seq').attr('value');
		cardOb.card_content=contents;
		cardOb.card_seq=cardSeq;
		
		let card = JSON.stringify(cardOb);
		if (contents.length > 0) {
			$.ajax({
				type: "post",
				url: "updateCardContent.pie",
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				data: card,
				success: function(data) {}
			});
			$('.cardContents').html(contents);
			$('.cardDetailsForm').hide();
			$('.cardContents').show();
			$('.fa-edit').show();
		}
		
		if(contents.length==0){
			$.ajax({
				type: "post",
				url: "updateCardContent.pie",
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				data: card,
				success: function(data) {}
			});
			$('.cardDetailsForm').show();
			$('.cardContents').hide();
		}
	});

	/*CheckList in Modal*/
	$('#add-todo').click(function() {
		let lastSibling = Number($('#checkListForm > .todo-wrap:last-of-type > input').attr('data-check-seq'));
		let cardSeq = Number($(this).parents().children().children('.modal_card_seq').val());

		$.ajax({
			type: "post",
			url: "getLastCheckSeqNum.pie",
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				lastSibling = data.data;
			}
		});

		let newId = Number(lastSibling) + 1;

		$(this).before('<span class="editing todo-wrap"><input type="checkbox" id="checkList" data-check-seq="' +
			newId + '"/><label for="' + newId +
			'" class="todo"><i class="fa fa-check"></i><input type="text" class="input-todo" id="input-todo' +
			newId + '"/></label></div>');
		$('#input-todo' + newId + '').parent().parent().animate({
			height: "60px"
		}, 200)
		$('#input-todo' + newId + '').focus();

		$('#input-todo' + newId + '').enterKey(function() {
			$(this).trigger('enterEvent');
		})

		$('#input-todo' + newId + '').on('blur enterEvent', function(e) {
			//prevent enter submit when it's null
			$(document).on("keydown", "form", function(event) {
				return event.key != "Enter";
			});

			//add checkList
			let checkTitle = $('#input-todo' + newId + '').val();
			if (checkTitle.length > 0) {
				e.preventDefault();
				$(this).before(checkTitle);
				$(this).parent().parent().removeClass('editing');
				$(this).parent().after('<span class="delete-item" title="remove"><i class="fa fa-times-circle"></i></span>');
				$(this).remove();
				
				let total=Number($('#checkListWrap').children().children('.todo-wrap').length);

				let checkOb = new Object;
				checkOb.check_seq = newId;
				checkOb.check_name = checkTitle;
				checkOb.card_seq = cardSeq;

				let check = JSON.stringify(checkOb);
				
				let thisCard = $("[data-card-seq="+cardSeq+"]").children('.icons');
				
				$.ajax({
					type: "post",
					url: "insertCheckList.pie",
					contentType: "application/json; charset=UTF-8",
					dataType: "json",
					async: false,
					data: check,
					success: function(data) {
						progressBar();
						if(total===1&&thisCard.children('.fa-comment-dots')){
							thisCard.show();
							let chk = loadChkList(0,1);
							thisCard.prepend(chk+" ");
						}else if(total===1){
							thisCard.show();
							let chk = loadChkList(0,1);
							thisCard.append(chk);
						}else {
							let checked = $('#checkListWrap').children().children('.todo-wrap').find('input[ischecked="1"]').length;
							thisCard.children('.fa-check-square').text(" "+checked+"/"+total);
						}
						$('.todo-wrap').css('height','auto');
						
					}
				});
			} else {
				$('.editing').animate({
					height: '0px'
				}, 200);
				setTimeout(function() {
					$('.editing').remove()
				}, 400);
			}
			
		})
	});

	//change checked status & progress bar
	$(document).on('click', '.fa-check', function() {
		let chkBox = $(this).parent().prev();
		let chk = chkBox.is(':checked');
		let checkSeq = chkBox.attr('data-check-seq');
		let cardSeq = $(this).parents().children().children('.modal_card_seq').attr('value');
		
		let total=Number($(this).parents().children('.todo-wrap').length);
		
		let thisCard = $("[data-card-seq="+cardSeq+"]").children('.icons').children('.fa-check-square');
		
		if (chk) {
			chkBox.prop('checked', false);
			chkBox.attr('ischecked', '0');
			let checked=$(this).parents().children('.todo-wrap').find('input[ischecked="1"]').length;
			thisCard.text(" "+checked+"/"+total);
			progressBar();
		} else {
			chkBox.prop('checked', true);
			chkBox.attr('ischecked', '1');
			let checked=$(this).parents().children('.todo-wrap').find('input[ischecked="1"]').length;
			thisCard.text(" "+checked+"/"+total);
			progressBar();
		}


		let chkOb = new Object();
		chkOb.ischecked = chkBox.attr('ischecked');
		chkOb.check_seq = checkSeq;

		let check = JSON.stringify(chkOb);

		$.ajax({
			type: "post",
			url: "editCheckedStatus.pie",
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			data: check,
			success: function(data) {}
		})


	});

	/*Remove CheckList in Modal*/
	$(document).on('click', '.delete-item', function() {
		let cardSeq = Number($(this).parents().children().children('.modal_card_seq').val());
		let checkSeq = Number($(this).prev().attr('for'));
		let ischecked = Number($(this).prev().prev().attr('ischecked'));
		let checkOb = new Object();
		checkOb.card_seq = cardSeq;
		checkOb.check_seq = checkSeq;
		checkOb.ischecked = ischecked;

		let check = JSON.stringify(checkOb);
		let deletedItem = $(this).parent();
		
		//change progress bar
		let total = $('#checkListWrap').children().children('.todo-wrap').length-1;
		let checked = 0;
		if(ischecked===1){
			checked = $(this).parents().children('.todo-wrap').find('input[ischecked="1"]').length-1;
		}else{
			checked = $(this).parents().children('.todo-wrap').find('input[ischecked="1"]').length
		}
		let percentage = parseInt(((checked/ total) * 100), 10);

		$('.progressbar').progressbar({
			value: percentage
		});
		if(isNaN(percentage)||percentage<0){
			$('.progressbar-label').text(0 + "%");
		}else{
			$('.progressbar-label').text(percentage + "%");
		}
		
		let thisCard = $("[data-card-seq="+cardSeq+"]").children('.icons');
		let chkNum = Number($('#checkListWrap').children().children('.todo-wrap').find('input[ischecked="1"]').length);
		
		$.ajax({
			url: "deleteChkList.pie?cardSeq=" + cardSeq,
			contentType: "application/json; charset=UTF-8",
			type: "post",
			async: "false",
			dataType: "json",
			data: check,
			success: function(data) {
				if(total===0){
					thisCard.children('.fa-check-square').remove();
				}else if(ischecked===1){
					thisCard.children('.fa-check-square').text(" "+(chkNum-1)+"/"+total);
						if(chkNum<0){
						thisCard.children('.fa-check-square').text(" 0"+"/"+total);
						}
				}else {
					thisCard.children('.fa-check-square').text(" "+chkNum+"/"+total);
				}
				
					deletedItem.animate({
					left: "-30%",
					height: 0,
					opacity: 0
				}, 200);
				setTimeout(function() { $(deletedItem).remove(); }, 1000);
				}

		});
	});

	/*Enter Key Event Handler*/
	$.fn.enterKey = function(fnc) {
		return this.each(function() {
			$(this).keypress(function(ev) {
				var keycode = (ev.keyCode ? ev.keyCode : ev.which);
				if (keycode == '13') {
					fnc.call(this, ev);
				}
			})
		})
	}
	
	
	/*Open Card Members Modal*/
	const memModal = document.getElementById("inviteModal");
	

	//Open add Members Modal
	$(document).on("click", ".cardMembersBtn", function(e) {
		e.preventDefault();
		memModal.style.display = "block";
		
		//get CardSeq
		cardSeq=$(this).parents().children().children(".modal_card_seq").val();
		$(".invite-detail").attr("data-invite-card",cardSeq);
		
		//get project Member List
		$.ajax({
			type: "get",
			url: "getProjectMemList?sessionEmail="+$('#session_email').val()+"&cardSeq="+cardSeq,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				let memberLi = "Project Member List";
				$.each(data, function(index, item) {
					memberLi += "<div id='membersWrap-"+index+"' class='membersWrap'>"+
					"<div class='memberWrap'>"+
						"<div class='member-SubWrap'>";
					if(item.profile==null){
						memberLi += "<div class='memProfile'><img class='memPic' value="+item.email+
									" src='./resources/img/icon/none.png'></div>";
					}else {
						memberLi += "<div class='memProfile'><img class='memPic' value="+item.email+
									' src="./resources/profile/'+item.email+'_'+item.profile+'"></div>'
					}
								
					memberLi+="<div class='memDetailWrap'>"+
								"<div id='memNickName-"+index+"' class='memNickName'>"+
									item.nickName+
								"</div>"+
								"<div id='memEmail-"+index+"' class='memEmail'>"+
									item.email+
								"</div>"+
							"</div>"+
						"</div>"+
						"<div id='memSelectBtn-"+index+"' class='memSelectBtn'>"+
							"<i class='fas fa-plus'></i>"+
						"</div>"+
					"</div>"+
				"</div>";
		});
		$('.projectMemList').append(memberLi);	
			}
		
		});
		
		//click Member to add 
		$('.fa-plus').click(function(){
			let div = $(this).closest('div');
			let div_index = div.attr("id").lastIndexOf("-")+1;
			let div_substr = div.attr("id").substring(div_index);
			let selectedWrap = div.parent().parent();
		//get clicked member Email
		let nickName = $('#memNickName-'+div_substr).html();
		let email = $('#memEmail-'+div_substr).html();
		let profile = $('#memNickName-'+div_substr).parent().prev().children('.memPic').attr('src');		
			
		let cardMemOb = new Object();
		cardMemOb.card_seq = cardSeq;
		cardMemOb.email = email;

		let cardMem = JSON.stringify(cardMemOb);
		
		let thisCard = $("[data-card-seq="+cardSeq+"]");
		$.ajax({
			type: "post",
			url: "insertCardMem.pie",
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			data: cardMem,
			success: function(data) {
			//show title
			$('#memTitle').show();
			//delete selectd MemInfo from View
			selectedWrap.animate({
					left: "-30%",
					height: 0,
					opacity: 0
				}, 200);
				setTimeout(function() { $(selectedWrap).remove(); }, 1000);
			//show card Member
			let cardMem = cardProfile(email,nickName,profile);
			$(".memList").append(cardMem);
			
			if($('#session_email').val()==email){
				thisCard.children('.temp').show();
				thisCard.children('.temp').append(cardMem);
				thisCard.children('.temp').children('.selectedMemPro').attr('class','cardMemProfile');
				}
			}
			});
		
		
		});
		
		});

	//close Mem Modal
	$(document).on("click", ".closeMemModal", function(e) {
		e.preventDefault();
		memModal.style.display = "none";
		$('.projectMemList').empty();	
	});
	
	window.onclick = function(e) {
		if (e.target == memModal) {
			memModal.style.display = "none";
			$('.projectMemList').empty();	
		}
	}
	
	//sweet alert 
	$(document).on("click", ".selectedMemPro", function(e) {
		swal.fire({
			title: 'Warning',
			text: 'Are u sure to delete this Member from the card?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Delete'
		}).then((result) => {
			//selected Member delete ajax
			if (result.isConfirmed) {
				let cardMemOb = new Object();
				let email = $(this).attr('value');
				let cardSeq = Number($(this).parents().children().children('.modal_card_seq').attr('value'));
				cardMemOb.email=email;
				cardMemOb.card_seq = cardSeq;
				
				let cardMem = JSON.stringify(cardMemOb);
				let deletedMem = $(this);
				let myProfile = $("[data-card-seq="+cardSeq+"]").children('.cardMemProfile');
				$.ajax({
					url:"deleteCardMem.pie",
					contentType: "application/json; charset=UTF-8",
					type: "post",
					async: "false",
					dataType: "json",
					data: cardMem,
					success: function(data) {
						swal.fire("Done!", "It's succesfully deleted!", "success");
						deletedMem.animate({
							bottom: "-30%",
							height: 0,
							opacity: 0
						}, 200);
						setTimeout(function() { 
							$(deletedMem).remove();  
						}, 200);
						if($('.selectedMemPro').length===1){
						$('#memTitle').hide();
						}
						if($('#session_email').val()===email){
							setTimeout(function() { 
							myProfile.remove();  
						}, 200);
					}
					}
				});
			}
		});
	});	
});