/*
파일명: kanban-board.js
설명: 칸반 보드에서 리스트와 카드 추가,수정,삭제 및 모달창 jqery&js
작성일: 2020-12-28 ~ 2021-01-11
작성자: 문지연,변재홍
*/
$(function() {

	//알람 전송 함수
	function alarm() {
		$.ajax({
			type: "POST",
			url: "alramLastSeq.pie",
			async: false,
			success: function(data) {
				let alramOb = new Object();
				alramOb.email = $("#email").val();
				alramOb.nickName = $("#nick").val();
				alramOb.title = "칸반카드";
				alramOb.state = "등록";
				alramOb.alramTime = moment(today).format('YYYY-MM-DD' + " " + 'HH:mm');
				alramOb.project_seq = Number($("#projectNum").val());
				alramOb.alramseq = (data + 1);
				let alram = JSON.stringify(alramOb);
				$.ajax({
					type: "POST",
					url: "alramInsert.pie",
					contentType: "application/json; charset=UTF-8",
					async: false,
					data: alram,
					success: function(data) {
						socket.send("등록");
						socketkanban.send("등록");
					}
				})
			}
		});
	}

	//칸반 객체를 컨트롤러에게 보내는 ajax 
	let pjNumByController = null;

	$.ajax({
		type: "post",
		contentType: "application/json; charset=UTF-8",
		dataType: "json",
		url: "getProjectNum.pie",
		async: false,
		success: function(data) {
			pjNumByController = data.projectNum;
		}
	});

	let projectNum = pjNumByController;

	//프로젝트 제목 가져오는 ajax 
	$.ajax(
		{
			type: "post",
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			url: "getProjectTitle.pie?projectNum=" + projectNum,
			async: false,
			success: function(data) {
				$("#projectTitle").html(data.projectTitle);

			}
		}
	)
	let lastNum = getLastNumFromController(projectNum);

	loadKanban(projectNum);

	function allSortable() {//리스트 단위 sortable 
		$("#listWrap").sortable({
			handle: ".listTitleWrap",
			start: function(event, ui) {	//드래그 시작시 동작하는 함수 
				$(this).attr('data-previndex', ui.item.index() + 1);
			},
			update: function(event, ui) {//드래그로 위치 변경이 생겼을 시 동작하는 함수 
				listIndexing(); //리스트 인덱싱 
				cardIndexing(); //리스트의 위치의 변화가 생기고 모든 카드의 id를 재할당하는 역할
				updateKanban(projectNum); //컨트롤러에게 칸반 객체 전달 & 파라미터는 프로젝트 번호 
			},
		});
	}
	//$(document).on("click", ".deleteList", function(e) {

	let new_list = null;//새로운 리스트 객체 

	function miniSortable() {//카드 단위 sortable 
		$(".cardWrap").sortable({
			placeholder: "card-placeholder",
			connectWith: ".cardWrap",//해당 셀렉터의 요소와 드래그를 가능하게 공유하겠다.  
			start: function(event, ui) {//드래그 시작시 동작하는 함수 
				$(this).attr('data-previndex', ui.item.index() + 1);//드래그 시작시 선택한 요소의 인덱스 값을 'data-previndex'으로 지정 
				old_list_id = $(this).attr('id');//드래그 시작시 선택한 요소의 리스트의 id 
			},
			update: function(event, ui) {//드래그로 위치 변경이 생겼을 시 동작하는 함수 
				new_list_id = event.target.id;//드래그로 새로 위치하게 된 리스트의 id 	
				new_list = event.target;//새로 위치하게 된 리스트 객체 		
			},
			stop: function(event, ui) {//드래그 종료시 동작하는 함수 
				let newIndex = ui.item.index() + 1;//새로운 위치의 인덱스 
				let oldIndex = $(this).attr('data-previndex');//전 위치의 인덱스 
				let old_item_id = ui.item.attr('id');//전 위치의 아이디 
				$(this).removeAttr('data-previndex');//요소 초기화(삭제)

				//움직인 카드의 요소의 개수를 알아내서 인덱싱하는 역할 
				let newListIndex = 1;
				$(new_list).children().each(function() {
					$(this).attr("id", $(this).parent().parent().attr("id") + "-" + newListIndex);
					newListIndex++;
				});

				//빠진 부분 카드의 요소의 개수를 알아내서 인덱싱하는 역할
				let oldListIndex = 1;
				$(event.target).children().each(function() {
					$(this).attr("id", $(this).parent().parent().attr("id") + "-" + oldListIndex);
					oldListIndex++;
				});
				updateKanban(projectNum);//컨트롤러에게 칸반 객체 전달 & 파라미터는 프로젝트 번호 

			},
		});
		$(".list").disableSelection();//텍스트가 드래그 되는 것을 방지하는 함수 
	}

	///////project Title
	const proTitle = $("#projectTitle");
	const proTitleEdit = $("#projectTitleEdit");

	/*Project Title*/
	proTitle.click(function(e) {
		e.preventDefault();
		proTitleEdit.children("#projectTitleInput").attr("placeholder", $(this).html());
		proTitle.hide();
		proTitleEdit.show();
		proTitleEdit.children("#projectTitleInput").focus();
	});

	//make proTitleInput disappear
	$(document).on("click", function(e) {
		if (!$(e.target).closest("#projectTitle").length) {
			proTitleEdit.hide();
			proTitle.show();
		}
	});

	//edit project Title
	proTitleEdit.submit(function(e) {
		e.preventDefault();
		let editedTitle = proTitleEdit.children("#projectTitleInput").val();
		let projectSeq = projectNum;

		let projectOb = new Object();
		projectOb.project_seq = projectSeq;
		projectOb.project_name = editedTitle;

		let project = JSON.stringify(projectOb);
		if (editedTitle.length > 0) {
			$.ajax({
				type: "post",
				url: "editProjectTitle.pie",
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				data: project,
				success: function(data) {

				}
			});
			proTitle.html(editedTitle);
			proTitleEdit.hide();
			proTitle.show();
		}
	});

	//카드의 인덱싱을 해주는 함수 
	function cardIndexing() {
		for (let i = 1; i <= lastNum; i++) {//첫번째 카드 리스트부터 마지막 리스트까지 
			let newCardIndex = 1;
			$("#" + i.toString() + " div:nth-child(2n)").children().each(function() {//카드의 id를 재할당해줌 
				$(this).attr("id", i + "-" + newCardIndex);
				newCardIndex++;
			});
		}
	}

	//리스트를 인덱싱 해주는 함수 
	function listIndexing() {

		function isNull(value) {
			return (value === undefined || value === null) ? true : false;
		}

		let listM = $(".list").first();

		if (isNull(listM)) {
			return;
		} else {
			for (let i = 1; i < $(".list").length + 1; i++) {
				listM.attr("id", i);
				listM = listM.next();
			}
		}

	}

	//리스트와 카드의 정보를 JSON 형태로 리턴하는 함수 
	function listUp() {
		let kanban = new Object();//모든 리스트와 카드를 담을 오브젝트 
		let listList = new Array();//각각의 리스트객체를 담을 리스트array 

		for (let i = 1; i <= lastNum; i++) {//첫번째 카드 리스트부터 마지막 리스트까지 
			let list = new Object();//하나의 리스트의 정보를 담을 리스트 객체 
			list.list_order_num = Number($("#" + i.toString()).attr("id"));//리스트의 순서 번호 
			list.list_seq = Number($("#" + i.toString()).attr("data-list-seq"));//리스트의 고유 번호 

			let cardList = new Array();//각각의 카드객체를 담을 카드 array 
			$("#" + i.toString() + " div:nth-child(2n)").children().each(function() {
				let card = new Object();//하나의 카드의 정보를 담을 카드 객체 
				card.card_order_num = $(this).attr("id"); //카드의 순서 번호  
				card.card_name = $(this).text();//카드의 제목 
				card.card_seq = Number($(this).attr("data-card-seq"));//카드의 고유 번호
				cardList.push(card);//카드 하나 하나를 카드리스트 배열에 담아준다.
			});

			list.cardList = cardList;//하나의 리스트에 여러개의 카드가 담긴 카드리스트(array)를 담아준다. 
			listList.push(list);//하나의 리스트 객체를 리스트array에 담아준다. 
		}
		kanban.kanban = listList;

		return kanban;
	}

	//칸반 리스트와 카드를 객체화 하여 컨트롤러에게 전달하는 함수
	function updateKanban(projectNum) {

		let wholeList = listUp();//모든 리스트와 카드 정보를 리턴하는 함수
		let kanbanJson = JSON.stringify(wholeList);//자바 컨트롤러가 받을 수 있는 형태로 바꿈 

		//칸반 객체를 컨트롤러에게 보내는 ajax 
		$.ajax({
			type: "post",
			url: "updateKanban.pie?projectNum=" + projectNum,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			data: kanbanJson,
			success: function(data) {
		}
		}
		)
	}

	//리스트 태그를 만들고 리턴해주는 함수 
	function makeList(list_order_num, data_list_seq, list_name) {
		let listTag = "<div class = 'list' id ='" + list_order_num + "' data-list-seq ='" + data_list_seq + "'>" +
			"<div class='listTitleWrap'><div class='listTitle'>" + list_name + "</div><span class='deleteList'>&times;</span>" +
			"<form class='listTitleEdit'><input type='text' class='listTitleInput' placeholder=''></form></div><div class ='cardWrap'>";
		return listTag;
	}

	//카드 태그를 만들고 리턴해주는 함수 	
	function makeCard(card_order_num, card_seq, card_name) {
		let cardTag = "<div class = 'cardContent' id ='" + card_order_num + "' data-card-seq ='" + card_seq + "'><p class='cardName'>" + card_name +
			"</p><i class='temp' style='display:none'></i><i class='far fa-trash-alt deleteCard' id='deleteCard' style='display:none;'></i>" +
			"<div class='icons' style='display:none'></div></div>";
		return cardTag;
	}

	//card add button
	function makeCardAddBtn() {
		let cardAddBtn = "<div class='cardAddWrap'><div class='addCardLabel'>+ Add another Card</div><form class='addCard' style='display: none;'>" +
			"<textarea class='addCardTitle' cols='30' rows='10' placeholder='Card Title'></textarea><button class='addCard-btn'>Add Card" +
			"</button><span class='close' id='closeCard'>&times;</span></form></div>";

		return cardAddBtn;
	}

	//makemempro
	function makeMemPro(email, nickName, profile) {
		let memTag = "<img class='cardMemProfile' id='cardMemProfile' title='" + nickName +
			"(" + email + ")' value=" + email +
			' src="./resources/profile/' + email + '_' + profile + '">';
		return memTag;
	}

	//cardmempro
	function cardMemIcon(email,nickName) {
		let memIcon = "<img class='cardMemProfile' id='cardMemProfile' title='"+nickName+
							"("+email+")' value="+email+
						' src="./resources/img/icon/none.png">';
		return memIcon;
	}

	//loadCheckList
	function loadChkList(ischecked, total) {
		let chkTag = "<i class='far fa-check-square' style='margin-right:7px;'> " + ischecked + "/" + total + "</i>";
		return chkTag;	
	}
	
	//count comments
	function countComm(total){
		let commTag = "<i class='far fa-comment-dots' style='margin-right:7px;'> " +total+"</i>";
		return commTag;
	}

	//칸반 페이지 입장시 해당 프로젝트의 번호로 칸반 리스트를 로드하는 함수 
	function loadKanban(projectNum) {
		$("#listWrap").empty();
		$.ajax(
			{
				type: "post",
				url: "loadKanban.pie?projectNum=" + projectNum,
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,//필수 안 해주면 순서 보장이 안 됨 
				success: function(data) {
					let kanban = data.listList;
					$.each(kanban, function(index, item) {
						let listTag = makeList(item.list_order_num, item.list_seq, item.list_name);//리스트 생성 
						$.each(kanban[index].cardList, function(cardIndex, item) {
							let cardTag = makeCard(item.card_order_num, item.card_seq, item.card_name);
							listTag += cardTag;//해당 리스트에 카드 추가 
						});
						let cardAddTag = makeCardAddBtn();
						listTag += "</div>";
						listTag += cardAddTag;
						listTag += "</div>";
						$("#listWrap").append(listTag); //리스트 한개 페이지에 추가 
					});
				}
			}
		)

		/*Load Card Member By Session EMail*/
		function getCardMemBySession() {
			$.ajax({
				type: "get",
				url: "getCardMemBySession.pie?sessionEmail=" + $('#session_email').val(),
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				success: function(data) {
					$.each(data, function(index, item) {
						if(item.profile==null){
						let memIcon = cardMemIcon(item.email,item.nickName);
						$("[data-card-seq=" + item.card_seq + "]").children('.cardName').append(memIcon);
					}else {
						let cardPro = makeMemPro(item.email, item.nickName, item.profile)
						$("[data-card-seq=" + item.card_seq + "]").children('.cardName').append(cardPro);
					}
					});
				}
			});
		}
		getCardMemBySession();

		//load CheckList on Card Contents
		function getCheckListByCard() {
			$.ajax({
				type: "post",
				url: "getCheckListByCard.pie?sessionEmail=" + $('#session_email').val(),
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				success: function(data) {
					$.each(data, function(index, item) {
						let chk = loadChkList(item.ischecked, item.total)
						$("[data-card-seq=" + item.card_seq + "]").children('.icons').show();
						$("[data-card-seq=" + item.card_seq + "]").children('.icons').append(chk);
					})
				}
			});
		}
		getCheckListByCard();
		
		function countCommnets() {
			$.ajax({
				type: "post",
				url: "getTotalCommByCard.pie?sessionEmail=" + $('#session_email').val(),
				contentType: "application/json; charset=UTF-8",
				dataType: "json",
				async: false,
				success: function(data) {
					$.each(data, function(index, item) {
						let comm = countComm(item.total)
						$("[data-card-seq=" + item.card_seq + "]").children('.icons').show();
						$("[data-card-seq=" + item.card_seq + "]").children('.icons').append(comm);
					})
				}
			});
		}
		countCommnets();
		
		allSortable();
		miniSortable();
		

	}

	/*Add a List*/
	const addListTitle = $("#addListLabel");
	const addListForm = $("#addList");
	addListTitle.click(function(e) {
		e.preventDefault();
		$(this).hide();
		$(this).parent().children("#addList").show();
		$(this).parent().children("#addListTitleInput").focus();
	});

	//list 만들기 
	addListForm.submit(function(e) {
		e.preventDefault();
		const listTitle = $("#addListTitleInput").val(); //리스트 제목 

		//컨트롤러에게 보낼 list 객체 
		let listOb = new Object();
		listOb.list_order_num = (lastNum + 1);
		listOb.list_name = listTitle;
		let list = JSON.stringify(listOb);
		let list_seq_by_controller = 0;

		//리스트 seq 가져오는 ajax 
		$.ajax({
			type: "post",
			url: "makeKanbanList.pie?projectNum=" + projectNum,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			data: list,
			success: function(data) {
				list_seq_by_controller = data.data;
			}
		}
		);

		if (listTitle.length > 0) {
			let listTag = makeList((lastNum + 1), list_seq_by_controller, listTitle); //만들기 
			listTag += "</div>";
			listTag += makeCardAddBtn();
			$("#listWrap").append(listTag);
			lastNum += 1;
			updateKanban(projectNum);
		}
		$(this).children("#addListTitleInput").val("");
		addListForm.hide();
		addListTitle.show();
		alarm();

		//sortable 
		$(".cardWrap").sortable({
			connectWith: ".cardWrap",
			placeholder: "card-placeholder"
		});
	});

	//sweet alert 
	$(document).on("click", ".deleteList", function(e) {
		swal.fire({
			title: 'Warning',
			text: 'Are u sure to delete the List?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Delete'
		}).then((result) => {

			//리스트 삭제 ajax 
			if (result.isConfirmed) {
				let listOb = new Object();//삭제할 리스트의 값을 임시로 담을 obj

				listOb.list_seq = $(this).parent().parent().attr("data-list-seq"); //삭제하는 리스트의 seq 
				listOb.list_order_num = $(this).parent().parent().attr("id"); //삭제하는 리스트의 정렬 번호 

				let cardArray = new Array();//해당 리스트에 속한 카드를 담을 array  
				$(this).parent().next().children().each(function() {//for문 돌면서 array에 카드를 담아줌 
					let cardOb = new Object();
					cardOb.card_seq = $(this).attr("data-card-seq")
					cardArray.push(cardOb);
				});
				listOb.cardList = cardArray; //리스트에 카드를 할당해줌 
				let list = JSON.stringify(listOb);//컨트롤러로 보낼 리스트 

				let listView = $(this).parent().parent();


				$.ajax({
					url: "deleteKanbanList.pie?projectNum=" + projectNum,
					contentType: "application/json; charset=UTF-8",
					type: "post",
					async: false,
					dataType: "json",
					data: list,
					success: function(data) {
						swal.fire("Done!", "It's succesfully deleted!", "success");

						//1. 리스트 화면에서 삭제 
						listView.remove();

						//2. 리스트 및 카드 재정렬 
						listIndexing();
						cardIndexing();

						//3. 마지막 번호 -1
						lastNum -= 1;

						//4. 데이터 다시 업데이트 
						updateKanban(projectNum);
						socketkanban.send("리스트삭제");
					},
					error: function(data) {
						swal.fire("Error", "Try Again", "error");

					}
				});
			}
		});
	});

	$("#closeList").click(function(e) {
		$("#addListTitleInput").val("");
		addListForm.hide();
		addListTitle.show();
	});

	//컨트롤러를 통해 리스트 seq를 가져오는 ajax 
	function getLastNumFromController(projectNum) {
		let lastNum = null;

		$.ajax({
			type: "post",
			url: "getLastListNum.pie?projectNum=" + projectNum,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				lastNum = data.data;
			}
		});

		return lastNum;
	}

	//컨트롤러를 통해 카드 seq를 가져오는 ajax
	function makeKanbanCard(jsonCard, projectNum) {
		let card = JSON.stringify(jsonCard);
		let card_seq = null;

		$.ajax({
			type: "post",
			url: "makeKanbanCard.pie?projectNum=" + projectNum,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			data: card,
			success: function(data) {
				card_seq = data.data;
			}
		}
		);
		return card_seq;
	}

	//$('.cardContent').mouseover(function() {

	/*Add Card Label*/
	$(document).on("click", ".addCardLabel", function(e) {
		e.preventDefault();
		$(this).hide();
		$(this).parent().children("form").show();
		$(this).parent().children("form").children("textarea").focus();
	});

	$(document).on("mouseleave", ".cardContent", function() {
		$(this).children('.deleteCard').fadeOut();
	});

	$(document).on("mouseover", ".cardContent", function() {
		let cardDelteBtn = $(this).children('.deleteCard');
		cardDelteBtn.fadeIn();
		cardDelteBtn.click(function(e) {
			e.stopPropagation();
			swal.fire({
				title: 'Warning',
				text: 'Are u sure to delete the Card?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Delete'
			}).then((result) => {
				if (result.isConfirmed) {
					let cardOb = new Object();

					cardOb.card_seq = $(this).parent().attr("data-card-seq");
					cardOb.card_order_num = $(this).parent().attr("id");

					let card = JSON.stringify(cardOb);//컨트롤러로 보낼 카드

					let cardView = $(this).parent();

					$.ajax({
						url: "deleteKanbanCard.pie?projectNum=" + projectNum,
						contentType: "application/json; charset=UTF-8",
						type: "post",
						async: false,
						dataType: "json",
						data: card,
						success: function(data) {
							swal.fire("Done!", "It's succesfully deleted!", "success");
							//1.delete card on the view
							cardView.remove();

							//2. resort card_id
							cardIndexing();

							//3. updateWholeInfo 
							updateKanban(projectNum);
							socketkanban.send("카드삭제");
						},
						error: function(data) {
							swal.fire("Error", "Try Again", "error");
						}
					});
					/*캘린더 삭제*/
					$.ajax({
						type: "POST",
						url: "/calendarDeleteKanban.pie",
						async: false,
						data: {
							card_seq: $(this).parent().attr("data-card-seq")
						},
						success: function(data) {
						}
					});
				}
			});
		});
	});
	$(document).on("submit", ".addCard", function(e, item) {
		e.preventDefault();
		const cardLabel = $(this).parent().children(".addCardLabel");
		const cardTitleVal = $(this).children(".addCardTitle").val();
		if (cardTitleVal.length > 0) {

			let upperCard = $(this).parent().prev().children().last().attr("id") //만들려는 카드의 바로 위 카드 
			let list_order_num = $(this).parent().parent().attr("id"); //만들려는 카드의 리스트의 정렬번호 

			if (upperCard === undefined) {//리스트에 처음으로 카드를 만드는 경우 
				let card_order_num = "";
				card_order_num += list_order_num + "-1";

				let card = new Object(); //컨트롤러에게 넘길 카드 객체 
				card.card_order_num = card_order_num;
				card.card_name = cardTitleVal;

				//db에서 셀렉트해서 card_seq 가져옴 
				let card_seq = makeKanbanCard(card, projectNum);
				let cardTag = makeCard(card_order_num, card_seq, cardTitleVal);
				$(this).parents(".list").children(".cardWrap").append(cardTag);//여기서 시작 

			} else {
				let card_order_num = "";
				card_order_num += list_order_num + "-";
				let card_order_num2 = ($(this).parent().prev().children().length) + 1;
				card_order_num += card_order_num2;

				let card = new Object(); //컨트롤러에게 넘길 카드 객체 
				card.card_order_num = card_order_num;
				card.card_name = cardTitleVal;

				//db에서 셀렉트해서 card_seq 가져옴 
				let card_seq = makeKanbanCard(card, projectNum);

				let cardTag = makeCard(card_order_num, card_seq, cardTitleVal);
				$(this).parents(".list").children(".cardWrap").append(cardTag);//여기서 시작 

			}
		}
		$(this).children(".addCardTitle").val("");
		$(this).hide();
		cardLabel.show();
		alarm();
		loadKanban(projectNum);
	});

	$(document).on("click", ".addCard-btn", function(e) {
		e.preventDefault();
		$(this).parent(".addCard").submit();
	});

	$(document).on("click", "#closeCard", function(e) {
		e.preventDefault();
		$(this).parent(".addCard").children(".addCardTitle").val("");
		$(this).parent(".addCard").hide();
		$(this).parents(".cardAddWrap").children(".addCardLabel").show();
	});

	/*List Title*/
	//clist list title
	$(document).on("click", ".listTitle", function(e) {
		e.preventDefault();
		let listTitleEdit = $(this).parent().children(".listTitleEdit");
		listTitleEdit.children(".listTitleInput").attr("placeholder", $(this).html());//플레이스홀더 선택한 제목 값으로 할당 
		$(this).hide();
		$(this).parent().children(".deleteList").hide();
		listTitleEdit.show();
		listTitleEdit.children(".listTitleInput").focus();
	});

	//make input form disappear
	$(document).on("click", function(e) {
		if (!$(e.target).closest(".listTitle").length) {
			$(".listTitleEdit").hide();
			$(".listTitle").show();
			$(".deleteList").show();
		}
	});

	//edit list title
	$(document).on("submit", ".listTitleEdit", function(e) {
		e.preventDefault();
		const listTitle = $(this).parent().children(".listTitle");
		const lt_val = $(this).children(".listTitleInput").val(); //수정한 리스트 제목 
		let listSeq = $(this).parent().parent().attr("data-list-seq"); //리스트의 seq값 

		let listOb = new Object();
		listOb.list_seq = listSeq;
		listOb.list_name = lt_val;

		let list = JSON.stringify(listOb);//컨트롤러에게 보낼 list 

		$.ajax({  //리스트 제목 수정 ajax
			type: "post",
			url: "editKanbanListTitle.pie",
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			data: list,
			success: function(data) {
			}
		});

		listTitle.html(lt_val);//화면상에 리스트 제목을 바꿈 
		$(this).hide();
		listTitle.show();
		$(this).parent().children(".deleteList").show();
	});

	$("#listWrap").sortable({
		placeholder: "list-placeholder",
		handle: ".listTitleWrap"
	});

	$(".cardWrap").sortable({
		placeholder: "card-placeholder"
	});

	/*Web Socket*/
	var socketkanban = null; //전역변수 선언
	$(document).ready(function() {
		connectWS();
	});
	function connectWS() {
		let ws = new WebSocket("ws://ec2-54-180-187-182.ap-northeast-2.compute.amazonaws.com:8080/Project_PIE/websocket/kanban/websocket");
		socketkanban = ws;
		ws.open = function(msg) {
		}

		ws.onmessage = function(event) {
			loadKanban(projectNum)
		};
		ws.onclose = function() {
		}
		ws.onerror = function() {
		}
	};
	connectWS();

});