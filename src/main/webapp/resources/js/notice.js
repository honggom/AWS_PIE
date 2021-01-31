$(document).ready(function() {
	//페이지 버튼 개수 
	let totalNum = null;
	//현재 머물고 있는 페이지
	let currentPage = 1;
	let today = new Date();
	let hours = today.getHours();
	let minutes = today.getMinutes();
				//게시글 등록시 알람	
				function noticeAlarm(){
					$.ajax({
					type: "POST",
					url: "alramLastSeq.pie",
					success: function(data) {
						let alramOb = new Object();
						alramOb.email = $("#email").val()
						alramOb.nickName = $("#nick").val()
						alramOb.title = "게시물"
						alramOb.state = "등록"
						alramOb.alramTime = moment(today).format('YYYY-MM-DD' + " " + 'HH:mm')
						alramOb.project_seq = Number($("#projectNum").val())
						alramOb.alramseq = (data + 1)
						let alram = JSON.stringify(alramOb);
						$.ajax({
							type: "POST",
							url: "alramInsert.pie",
							contentType: "application/json; charset=UTF-8",
							dataType: "json",
							async: false,
							data: alram,
							success: function(data) {
								socket.send("등록")
							},
						})
					}
				})					
				}
	//게시물 총개수
	function getNoticeTotalNumber(){
		$.ajax({
		type: "post",
		url: "noticeTotalNumber.pie?project_seq="+$("#projectNum").val(),
		contentType: "application/json; charset=UTF-8",
		dataType: "json",
		async: false,
		success: function(data) {
			totalNum = data.totalNumber;
	}
	});
	}
	
	//글쓰기
	$('#write').click(function(){
	document.getElementById('noticeInsert_modal_contents').style.display='block' 
	$('#summernote').summernote({
		  toolbar: [
    ['style', ['bold', 'italic', 'underline', 'clear']],
    ['font', ['strikethrough', 'superscript', 'subscript']],
    ['fontsize', ['fontsize']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['height', ['height']]
  					],			 
		  height: 300,                 // 에디터 높이
		  minHeight: null,             // 최소 높이
		  maxHeight: null,             // 최대 높이
		  focus: true,                  // 에디터 로딩후 포커스를 맞출지 여부
		  lang: "ko-KR",					// 한글 설정
		  placeholder: '최대 2048자까지 쓸 수 있습니다'	//placeholder 설정      
	});
 });

		//글 등록하기
		$("#insertnotice").click(function(){
				let fileNumber = 0;
				var fileValue = $("#filename").val().split("\\");
				var fileName = fileValue[fileValue.length-1]; // 파일명
				let form = $("#uploadFormNotice")[0];
				let formData = new FormData(form)

				document.getElementById('notice_modal_background').style.display = 'none';
				let noticeInsertOb = new Object();
				noticeInsertOb.title = $('#noticeTitle').val()
				noticeInsertOb.content = $('#summernote').val()
				noticeInsertOb.project_seq = $("#projectNum").val()
				noticeInsertOb.nickName = $("#nick").val()
				noticeInsertOb.email = $("#email").val()
				noticeInsertOb.writeDate = moment(today).format('YYYY-MM-DD' + " " + 'HH:mm')
				noticeInsertOb.filename = fileName
				//파일 업로드 파일이 있을때만 적용
				if($("#filename").val() !== null && $("#filename").val() !== ""){
				$.ajax({
					type: "POST",
					url: "fileNotice.pie?projectNum=" + $("#projectNum").val() + "&nick=" + $("#nick").val(),
					data: formData,
					enctype: 'multipart/form-data',
					processData: false,
					contentType: false,
					async: false,
					cache: false,
					success: function(result) {
						fileNumber = result;
					noticeInsertOb.file_seq = fileNumber
						}
				})
				}else{
					noticeInsertOb.file_seq = fileNumber
				}
				let noticeInsert = JSON.stringify(noticeInsertOb);
				$.ajax({
					type: "POST",
					url: "noticeInsert.pie",
					contentType: "application/json; charset=UTF-8",
					dataType: "json",
					async: false,
					data: noticeInsert,
					success: function(data) {
						noticeAlarm()
						loadNotice(currentPage);
						getNoticeTotalNumber();
						makePageBtn(totalNum, currentPage);
					}
				})
						$("#noticeTitle").val("");
						$("#filename").val("");
						$(".note-editable").empty()
		})
		//글 목록 로드
		function loadNotice(page){
		$("#noticeList").empty();
		$.ajax({
			type: "GET",
			url:"noticeList.pie",
			contentType: "application/json; charset=UTF-8",
			async: false,
			data:{project_seq:$("#projectNum").val(),
					page: page},
			success: function(data) {
				createNotice(data)
					}
		})
					}
	//글 목록 출력
	function createNotice(data) {
	let html = "";
	$.each(data, function(index, notice) {
		let writeDate = moment(notice.writeDate).format('YYYY-MM-DD' + " " + 'HH:mm')
		html += 	'<div class="notice-item-wrapper">'+
					'<div class="notice-top-wrapper">'+
					'<div class="notice-username">'+notice.title+'</div>'+
					'</div>'+
					'<div class="notice-middle-wrapper">'+
					'<div class="notice-reply">'+
				   	'<i class="fas fa-pencil-alt"></i>'+notice.nickName+
					'</div>'+
					'<div class="notice-flag">'+
					'<i class="far fa-calendar"></i>'+writeDate+
					 '</div>'+
					 '</div>'+
					'<input type="hidden" value='+notice.notice_seq+'>'+
					 '</div>'
	});
	$('#noticeList').append(html)
	}
	//글 상세보기
	$(document).on("click",".notice-item-wrapper",function(){
			$.ajax({
			type: "GET",
			url:"noticeDetail.pie",
			contentType: "application/json; charset=UTF-8",
			async: false,
			data:{notice_seq:$(this).children('input').val()},
			success: function(data) {
				if(data.email !== $("#email").val()){
					$("#editnotice").hide();
					$("#deletenotice").hide();
				}
				if(data.file_seq !== 0){
				$.ajax({
					type:"POST",
					url:"getFileSeqName.pie",
					data:{file_seq:data.file_seq},
					success:function(result){
						$("#downloadFilename").empty()
						document.getElementById('downloadDiv').style.display='block'
						$("#downloadFilename").append(data.filename)
					$(".noticedownload").prop('href','fileDownload.pie?project_seq=' +$("#projectNum").val() + '&file_uploaded_name=' + result)
					}
				})
				}
				document.getElementById('noticeEdit_modal_contents').style.display='block'
				$("#noticeTitleView").val(data.title)
				$("#notice_seq_hidden").val(data.notice_seq)
				document.getElementById('noticeContentView').innerHTML= data.content
				document.getElementById('summernoteEdit').innerHTML= data.content
				}	
		})	
		//글 수정하기
	$("#editnotice").click(function(){
		Swal.fire("","수정이 가능합니다","info")
		document.getElementById('CommetnsWrap-notice').style.display='none'
		document.getElementById('noticeContentView').style.display='none'
		document.getElementById('noticeContentEdit').style.display='block'
		document.getElementById('editnotice').style.display='none'
		document.getElementById('okeditnotice').style.display='block'
		document.getElementById('deletenotice').style.display='none'
		document.getElementById('downloadDiv').style.display='none'
		$('#noticeTitleView').removeAttr("readonly");
		$('#summernoteEdit').summernote({
		  toolbar: [
   			 ['style', ['bold', 'italic', 'underline', 'clear']],
   			 ['font', ['strikethrough', 'superscript', 'subscript']],
   			 ['fontsize', ['fontsize']],
    		 ['color', ['color']],
   			 ['para', ['ul', 'ol', 'paragraph']],
   			 ['height', ['height']]
 			 ],			 
		  height: 300,               
		  minHeight: null,             
		  maxHeight: null,           
		  focus: true,                  
		  lang: "ko-KR",					
		  placeholder: '최대 2048자까지 쓸 수 있습니다'	
          
	});
	})
	})
	//게시물 수정
	$("#okeditnotice").click(function(){
				let fileNumber = 0;
				var fileValue = $("#filename").val().split("\\");
				var fileName = fileValue[fileValue.length-1]; // 파일명
				let form = $("#uploadFormNotice")[0];
				let formData = new FormData(form)
				//파일 업로드
				if($("#filename").val() !== null && $("#filename").val() !== ""){
				$.ajax({
					type: "POST",
					url: "fileNotice.pie?projectNum=" + $("#projectNum").val() + "&nick=" + $("#nick").val(),
					data: formData,
					enctype: 'multipart/form-data',
					processData: false,
					contentType: false,
					async: false,
					cache: false,
					success: function(result) {
						fileNumber = result;
						}
				})
				}
				let noticeEditOb = new Object();
				noticeEditOb.title = $('#noticeTitleView').val()
				noticeEditOb.content = $('#summernoteEdit').val()
				noticeEditOb.notice_seq = $("#notice_seq_hidden").val()
				noticeEditOb.filename = fileName
				noticeEditOb.file_seq = fileNumber
				let noticeEdit = JSON.stringify(noticeEditOb);
				$.ajax({
					type: "POST",
					url: "noticeUpdate.pie",
					contentType: "application/json; charset=UTF-8",
					dataType: "json",
					async: false,
					data: noticeEdit,
					success: function(data) {
						loadNotice(currentPage);
						getNoticeTotalNumber();
						makePageBtn(totalNum, currentPage);
					}
				})
	})
	//게시물 삭제
	$("#deletenotice").click(function(){
		let notice_seq = $("#notice_seq_hidden").val();
							Swal.fire({
					title: "일정을 삭제하시겠습니까?",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
  					cancelButtonColor: '#d33',
  					confirmButtonText: 'Yes'
				})
					.then((result) => {
						if (result.isConfirmed) {
						document.getElementById('noticeEdit_modal_contents').style.display='none'
						$.ajax({
						type: "POST",
						url: "noticeDelete.pie",
						data: {notice_seq:notice_seq},
						async: false,
						success: function(result) {
							swal.fire("완료", "일정이 삭제되었습니다", "success");
							loadNotice(currentPage);
							getNoticeTotalNumber();
							makePageBtn(totalNum, currentPage);
							}
					})
						} else {
						}
					});
	})
	//게시글 등록 취소시 실행되는 이벤트
	$("#insertCancel").click(function(){
		$("#noticeTitle").val("");
		$("#filename").val("");
		$(".note-editable").empty()
	})
	//게시글 수정 및 수정 취소시 실행되는 이벤트
	$("#editCancel, #okeditnotice").click(function(){
		document.getElementById('CommetnsWrap-notice').style.display='block'
		document.getElementById('noticeContentView').style.display='block'
		document.getElementById('noticeContentEdit').style.display='none'
		document.getElementById('editnotice').style.display='block'
		document.getElementById('okeditnotice').style.display='none'
		document.getElementById('deletenotice').style.display='block'
		document.getElementById('downloadDiv').style.display='none'
		$(".note-editable").empty()
	})
	loadNotice(1)
	getNoticeTotalNumber()
	makePageBtn(totalNum,currentPage)
	//페이지 버튼 
	function btn(num) {
		let btn = "<div class = 'notice-btn'>" + num + "</div>";
		return btn;
	}

	//현재 페이지 버튼 
	function current_page_btn(num) {
		let current_page_btn = "<div class = 'notice-current-page-btn'>" + num + "</div>";
		return current_page_btn;
	}
		//페이지 버튼 만드는 루프 
	function pageBtnLoop(total_page_btn, curPage) {

		//기존 페이지 버튼을 지워줌 
		$(".notice-page-btn-zone").empty();

		//시작 페이지 
		start_page = ((Math.ceil((curPage / 5))) * 5) - 4;

		//버튼을 최대 5개 까지만 만드는 카운트 
		let count = 0;

		//왼쪽 버튼을 만드는 조건문 
		if (start_page > 1) {
			let left_btn = "<div class = 'notice-left-btn'><i class='fas fa-angle-left'></i></div>";
			$(".notice-page-btn-zone").append(left_btn)
		}

		//오른쪽 버튼 생성 여부를 결정하는 카운트 변수 
		let forRightBtn = 0;

		//페이지 버튼을 만드는 루프 
		for (let i = start_page; i <= total_page_btn; i++) {

			//루프가 최대 5번 돌면 for문 탈출
			if (count === 5) {
				break;
			} else {
				if (i === Number(curPage)) {
					$(".notice-page-btn-zone").append(current_page_btn(i));
				} else {
					let btnDoc = btn(i);
					$(".notice-page-btn-zone").append(btnDoc);
				}
				count += 1;
			}
			forRightBtn = i;
		}
		//오른쪽 버튼을 만드는 조건문 
		if (total_page_btn > forRightBtn) {
			let right_btn = "<div class = 'notice-right-btn'><i class='fas fa-angle-right'></i></div>";
			$(".notice-page-btn-zone").append(right_btn);
		}

	}

	//해당 프로젝트의 전체 파일 개수를 기준으로 하여 페이징 버튼을 만들어주는 함수 
	function makePageBtn(totalCount, curPage) {
		//현재 페이지 
		curPage = Number(curPage);

		//총 파일 개수를 기준으로 몇개의 버튼(페이지)을 만들지 결정하는 변수 
		let total_page_btn = null;

		//나누고 나머지가 있으면 딱 떨어지는 수가 아님 
		if (totalCount % 10 === 0) {
			total_page_btn = totalCount / 10;
		} else {
			total_page_btn = Math.floor((totalCount / 10)) + 1;
		}
		pageBtnLoop(total_page_btn, curPage);
		currentPage = curPage;

	}
		$(document).on("click", ".notice-btn", function(e) {
		let page = $(this)[0].innerText
		loadNotice(page);
		makePageBtn(totalNum, page);
	});
		//오른쪽 버튼 클릭 이벤트 
	$(document).on("click", ".notice-right-btn", function(e) {
		currentPage = Number(currentPage) + 1;
		loadNotice(currentPage);
		makePageBtn(totalNum, currentPage);
	});

	//왼쪽 버튼 클릭 이벤트
	$(document).on("click", ".notice-left-btn", function(e) {
		currentPage = Number(currentPage) - 1;
		loadNotice(currentPage);
		makePageBtn(totalNum, currentPage);
	});
});