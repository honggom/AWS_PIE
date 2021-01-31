let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes();
$(document).ready(function() {
	function editButton(){
			$('#titleView').attr("readonly", true);
			$('#startDateView').attr("readonly", true);
			$('#endDateView').attr("readonly", true);
			$('#contentView').attr("readonly", true);
			$('#allDayView').attr("disabled", true);
			$('#eventColorView').attr("disabled", true);
			$('#editCalendar').css("display", "");
			$('#okeditCalendar').css("display", "none");
			$('#editCancelCalendar').css("display", "none");
			$('#deleteCalendar').css("display", "");
			$("#startDateView, #endDateView").flatpickr({ clickOpens: false });
			$('#endDateView').val("")
			$('#titleView').val("")
			$('#contentView').val("")
			}
		function insertButton(){
           	$('#endDate').val("")
           	$('#title').val("")
           	$('#content').val("")
           	$('#eventColor').val("#D25565")	
			}
$('.setDueDateBtn').click(function(){
		document.getElementById('calendarInsert_modal_contents').style.display='block'
          $("#insertCancelKanBan").unbind('click');
          $('#insertCancelKanBan').click(function(){
        	  insertButton()			
				})
			$.ajax({
			type: "post",
			url: "getCardContent.pie?cardSeq="+$(".modal_card_seq").val(),
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data){
				$('#title').val(data[0].card_name);
				$('#content').val(data[0].card_content);			
				}	
			})		
		$("#insertCalendarKanBan").unbind('click');		
		$('#insertCalendarKanBan').click(function(){
			  if($("input:checkbox[name=allDay]").is(":checked") == true) {
				  allDay=true
				}else{
				  allDay=false
					 }
		  /* 캘린더 등록*/
				let calendarInsertOb = new Object();
				calendarInsertOb.start = $('#startDate').val()
				calendarInsertOb.end = $('#endDate').val()
				calendarInsertOb.title = $('#title').val()+"(칸반)"
				calendarInsertOb.content = $('#content').val()
				calendarInsertOb.allDay = allDay
				calendarInsertOb.color = $('#eventColor').val()
				calendarInsertOb.project_seq = $("#projectNum").val()
				calendarInsertOb.card_seq = $(".modal_card_seq").val()
				let calendarInsert = JSON.stringify(calendarInsertOb);
				$.ajax({
					type: "POST",
					url: "calendarInsert.pie",
					contentType: "application/json; charset=UTF-8",
					dataType: "json",
					async: false,
					data: calendarInsert,
					success: function(data) {
						insertButton()
					}
				})
				 	$.ajax({
					type: "POST",
					url: "alramLastSeq.pie",
					success: function(data) {
				let alramOb = new Object();
				alramOb.email=$("#email").val()
				alramOb.nickName=$("#nick").val()
				alramOb.title="캘린더"
				alramOb.state="등록"
				alramOb.alramTime=moment(today).format('YYYY-MM-DD' + " " + 'HH:mm')
				alramOb.project_seq=Number($("#projectNum").val())
				alramOb.alramseq = (data+1)
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
			})
			});
$('.getDueDateBtn').click(function(){
	$.ajax({
			type : "GET",
			url  : "calendarListKanbanDetail.pie",
			data:{	card_seq:$(".modal_card_seq").val()},
				success : function(data){	
				$("#titleView").val(data.title);
				$("#startDateView").val(data.start);
				$("#endDateView").val(data.end);
				$("#contentView").val(data.content);
				if (data.allDay === true) {
				$("#allDayView").prop("checked", true)
				} else {
				$("#allDayView").prop("checked", false)
				}
				$('#eventColorView').val(data.color);
				$("#seqView").val(data.id);
				}
		})
	document.getElementById('calendarEdit_modal_contents').style.display='block'
	$("#deleteCalendar").unbind('click');
			$('#deleteCalendar').click(function() {
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
							swal.fire("완료", "일정이 삭제되었습니다", "success");
							document.getElementById('calendarEdit_modal_contents').style.display = 'none';
							$.ajax({
							type: "POST",
							url: "calendarDelete.pie",
							data: {
							id: $("#seqView").val()
										},
							success: function(data) {
							}
							});
						} else {
							document.getElementById('calendarEdit_modal_contents').style.display = 'none';
						}
					});
			})
			$("#editCancel").unbind('click');
			$('#editCancel').click(function() {
				editButton()
			})
			$("#editCalendar").unbind('click');
			$('#editCalendar').click(function() {
				Swal.fire("","수정이 가능합니다","info")
				$('#titleView').removeAttr("readonly");
				$('#startDateView').removeAttr("readonly");
				$('#endDateView').removeAttr("readonly");
				$('#contentView').removeAttr("readonly");
				$('#allDayView').removeAttr("disabled");
				$('#eventColorView').removeAttr("disabled");
				$('#editCalendar').css("display", "none");
				$('#okeditCalendar').css("display", "");
				$('#editCancelCalendar').css("display", "");
				$('#deleteCalendar').css("display", "none");
				$("#startDateView, #endDateView").flatpickr({ enableTime: true, time_24hr: true, dateFormat: "Y-m-d H:i" }, 'disableMobile', false);
			})
			$('#editCancelCalendar').click(function() {
				editButton()
			})
					$("#okeditCalendar").unbind('click');
			$('#okeditCalendar').click(function() {
				if ($("input:checkbox[id=allDayView]").is(":checked") == true) {
					allDay = true
				} else {
					allDay = false
				}
				/*캘린더 수정*/
				let calendarEditOb = new Object();
				calendarEditOb.id	= $('#seqView').val()
				calendarEditOb.start = $('#startDateView').val()
				calendarEditOb.end = $('#endDateView').val()
				calendarEditOb.title = $('#titleView').val()+"(칸반)"
				calendarEditOb.content = $('#contentView').val()
				calendarEditOb.allDay = allDay
				calendarEditOb.color = $('#eventColorView').val()
				let calendarEdit = JSON.stringify(calendarEditOb);
				$.ajax({
					type: "POST",
					url: "calendarUpdate.pie",
					contentType: "application/json; charset=UTF-8",
					dataType: "json",
					async: false,
					data: calendarEdit,
					success: function(data) {
						editButton()
					}
				})
					$.ajax({
					type: "POST",
					url: "alramLastSeq.pie",
					success: function(data) {
				let alramOb = new Object();
				alramOb.email=$("#email").val()
				alramOb.nickName=$("#nick").val()
				alramOb.title="캘린더"
				alramOb.state="수정"
				alramOb.alramTime=moment(today).format('YYYY-MM-DD' + " " + 'HH:mm')
				alramOb.project_seq=Number($("#projectNum").val())
				alramOb.alramseq = (data+1)
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

			})
	});

 $("#startDate, #endDate").flatpickr({enableTime: true,time_24hr: true, dateFormat: "Y-m-d H:i"});
window.onclick = function(event) {
		if (event.target === document.getElementById('calendar_modal_background')) {
			editButton();
			insertButton();
			document.getElementById('calendarEdit_modal_contents').style.display = 'none';
			document.getElementById('detailsInsertModal').style.display = 'none';
			
		}
	}
});