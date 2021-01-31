var id;
var title;
var start;
var end;
var allDay;
var color;
var content;
var events = [];

let today = new Date();
let hours = today.getHours();
let minutes = today.getMinutes();
//캘린더 Drag&Drop 날짜 변경
function editCalendar(info) {
	id = info.event.id;
	start = info.event.start;
	end = info.event.end;
	if (info.event.allDay == true) {
		if (info.event.start !== info.event.end)
			endDate = moment(info.event.end).subtract(1, 'days')._d;
	}
	var msg;
	$.ajax({
		type: 'POST',
		data: {
			id: id,
			start: start,
			end: end
		},
		datetype: 'json',
		async: false,
		url: "calendarEdit.pie",
		success: function(data) {
		}
	})
}
//캘린더 삭제
function deleteCalendar(info) {
	if (info.event.extendedProps.card_seq == 0) {
		$.ajax({
			type: "POST",
			url: "calendarDelete.pie",
			data: {
				id: info.event.id
			},
			success: function(data) {
			}
		});
	} else {
		$.ajax({
			type: "POST",
			url: "calendarDelete.pie",
			data: {
				id: info.event.id
			},
			success: function(data) {
			}
		});
	}
}
//캘린더 리스트 
var eventsFeed = function(info, successCallback, failureCallback) {
	if ($("input:radio[id=kanbanCalendar]").is(":checked") == true) { //칸반에 본인이 등록된 캘린더만 보기
		$.ajax({
			type: "GET",
			url: "calendarListKanban.pie",
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			data: {
				email: $("#email").val(),
				project_seq: $("#projectNum").val()
			},
			success: function(data) {
				var fixedDate = data.map(function(array) {
					if (array.allDay === true && array.start !== array.end) {
						array.end = moment(array.end).add(1, 'days'); // 이틀 이상 AllDay 일정인 경우 달력에 표기시 하루를 더해야 정상출력
					}
					array.end = moment(array.end).format('YYYY-MM-DD' + " " + 'HH:mm')
					return array;
				})
				successCallback(fixedDate);
			}
		})
	} else {															//전체 캘린더 보기
		$.ajax({
			type: "GET",
			url: "calendarList.pie",
			data: {
				project_seq: $("#projectNum").val()
			},
			dataType: 'json',
			success: function(data) {
				var fixedDate = data.map(function(array) {
					if (array.allDay === true && array.start !== array.end) {
						array.end = moment(array.end).add(1, 'days'); // 이틀 이상 AllDay 일정인 경우 달력에 표기시 하루를 더해야 정상출력
					}
					array.end = moment(array.end).format('YYYY-MM-DD' + " " + 'HH:mm')
					return array;
				})
				successCallback(fixedDate);
			}
		})
	}
};
// 수정 버튼시 실행되는 이벤트
function editButton() {
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
// 등록 버튼시 실행되는 이벤트
function insertButton() {
	$('#endDate').val("")
	$('#title').val("")
	$('#content').val("")
	$('#eventColor').val("#D25565")
}
// fullCalendar 
document.addEventListener('DOMContentLoaded', function() {
	var calendarEl = document.getElementById('calendar');

	var calendar = new FullCalendar.Calendar(calendarEl, {
		plugins: ['interaction', 'dayGrid', 'timeGrid', 'list', 'ui'],
		themeSystem: 'jquery-ui',
		header: {
			left: 'prev,today,next',
			center: 'title',
			right: 'dayGridMonth,listMonth'
		},
		buttonText: {
			today: '오늘',
			month: '월',
			week: '주',
			day: '일',
			list: '주간 일정표'
		},
		selectable: true, //클릭 및 드래그 선택 기능
		selectMirror: true, //???
		navLinks: true, // can click day/week names to navigate views
		businessHours: true, // display business hours
		editable: true,
		eventLimit: true,
		displayEventTime: false,
		displayEventEnd: true,
		forceEventDuration: true,
		minTime: '00:00:00',
		maxTime: '24:00:00',
		timeFormat: 'HH:mm',
		slotLabelFormat: 'HH:mm',
		dayMaxEvents: true,
		locales: 'ko',
		dateClick: function(info) {         //캘린더의 날짜 클릭시 실행
			document.getElementById('calendarInsert_modal_contents').style.display = 'block'
			$('#startDate').val(info.dateStr + " " + hours + ":00")
			$("#insertCancel").unbind('click');
			$('#insertCancel').click(function() {
				insertButton()
			})
			$("#insertCalendar").unbind('click');
			$('#insertCalendar').click(function() {
				if ($("input:checkbox[name=allDay]").is(":checked") == true) {
					allDay = true
				} else {
					allDay = false
				}
				/* 캘린더 등록*/
				let calendarInsertOb = new Object();
				calendarInsertOb.start = $('#startDate').val()
				calendarInsertOb.end = $('#endDate').val()
				calendarInsertOb.title = $('#title').val()
				calendarInsertOb.content = $('#content').val()
				calendarInsertOb.allDay = allDay
				calendarInsertOb.color = $('#eventColor').val()
				calendarInsertOb.project_seq = $("#projectNum").val()
				calendarInsertOb.card_seq = 0
				let calendarInsert = JSON.stringify(calendarInsertOb);
				$.ajax({
					type: "POST",
					url: "calendarInsert.pie",
					contentType: "application/json; charset=UTF-8",
					dataType: "json",
					async: false,
					data: calendarInsert,
					success: function(data) {
						calendar.refetchEvents();
						insertButton()
					}
				})
				/* 캘린더 등록 알람*/
				$.ajax({
					type: "POST",
					url: "alramLastSeq.pie",
					success: function(data) {
						let alramOb = new Object();
						alramOb.email = $("#email").val()
						alramOb.nickName = $("#nick").val()
						alramOb.title = "캘린더"
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
			})
		},
		//일정 Drag&Drop하기
		eventDrop: function(info) {
			swal.fire({
				title: "일정을 변경하시겠습니까?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes'
			})
				.then((result) => {
					if (result.isConfirmed) {
						swal.fire("완료", "일정이 변경되었습니다", "success");
						var msg = editCalendar(info);
					} else {
						info.revert();
					}
				});
		},
		//일정 사이즈 변경하기
		eventResize: function(info) {
			swal.fire({
				title: "일정을 변경하시겠습니까?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes'
			})
				.then((result) => {
					if (result.isConfirmed) {
						swal.fire("완료", "일정이 변경되었습니다", "success");
						var msg = editCalendar(info);
					} else {
						info.revert();
					}
				});
		},
		//캘린더에 일정 출력하기
		eventSources: [{
			events: eventsFeed

		}],
		//일정 클릭시 실행되는 이벤트
		eventClick: function(info) {
			document.getElementById('calendarEdit_modal_contents').style.display = 'block'
			start = info.event.start;
			end = info.event.end;
			title = info.event.title;
			content = info.event.extendedProps.content;
			if (info.event.allDay === true) {
				$("#allDayView").prop("checked", true)
			} else {
				$("#allDayView").prop("checked", false)
			}
			$('#eventColorView').val(info.event.borderColor)
			if (info.event.allDay === true) {
				if (info.event.start !== info.event.end)
					end = moment(info.event.end).subtract(1, 'days')._d;
			}
			$('#startDateView').val(moment(start).format('YYYY-MM-DD' + " " + 'HH:mm'));
			$('#endDateView').val(moment(end).format('YYYY-MM-DD' + " " + 'HH:mm'));
			$('#titleView').val(title);
			$('#contentView').val(content);
			
			//일정 삭제
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
							deleteCalendar(info)
							var event = calendar.getEventById(info.event.id);
							event.remove();
							swal.fire("완료", "일정이 삭제되었습니다", "success");
						} else {
						}
					});
			})
			
			//일정 수정
			$("#editCancel").unbind('click');
			$('#editCancel').click(function() {
				editButton()
			})
			$("#editCalendar").unbind('click');
			$('#editCalendar').click(function() {
				Swal.fire("","일정 수정이 가능합니다","info");
				$('#seqView').val(info.event.id)
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
				calendarEditOb.id = $('#seqView').val()
				calendarEditOb.start = $('#startDateView').val()
				calendarEditOb.end = $('#endDateView').val()
				calendarEditOb.title = $('#titleView').val() + "(칸반)"
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
						calendar.refetchEvents();
						editButton()
					}
				})
				/*캘린더 수정 알람*/
				$.ajax({
					type: "POST",
					url: "alramLastSeq.pie",
					success: function(data) {
						let alramOb = new Object();
						alramOb.email = $("#email").val()
						alramOb.nickName = $("#nick").val()
						alramOb.title = "캘린더"
						alramOb.state = "수정"
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
								socket.send("수정")
							},
						})
					}
				})

			})

		}
	});
	$('.filter').on('change', function() {
		calendar.refetchEvents();
	});
	calendar.render();
});

$(document).ready(function() {
	$("#startDate, #endDate").
		flatpickr({ enableTime: true, time_24hr: true, dateFormat: "Y-m-d H:i" });
	window.onclick = function(event) {
		if (event.target === document.getElementById('calendar_modal_background')) {
			editButton();
			insertButton();
			document.getElementById('calendar_modal_background').style.display = 'none';
			document.getElementById('calendarEdit_modal_contents').style.display = 'none';
			document.getElementById('calendarInsert_modal_contents').style.display = 'none';

		}
	}


});