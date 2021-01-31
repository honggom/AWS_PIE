<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>PIE</title>
</head>
<body>
<div id="calendar_modal_background"></div>
 <!-- The Modal -->
<!--Details Modal-->
	<div id="calendarInsert_modal_contents" class="calendarDetailsModal">
		<div class="calendar-modal-detail">
			<!-- Modal close btn -->
			<span class="calendarCloseModal" id="insertCancelKanBan"
			onclick="document.getElementById('calendarInsert_modal_contents').style.display='none'">&times;</span>
			
			<div class="calendarCheckBox"></div>
			<h3 class="CheckBox">
			<i class="far fa-check-square"></i> AllDay
			<input class="" type="checkbox" id="allDay" name="allDay" checked />
			</h3>	
			<!-- Card Title -->
			<div class="calendars"></div>
			<h3 class="Title">
			<i class="fas fa-pen"></i> 일정명
			</h3>
			<div id="calendarInput" class="calendarTitle">
				<input type="text" id="title" name="title" placeholder=""> 
			</div>
			<!-- Start Date -->
			<div class="calendars"></div>
			<h3 class="StartDate">
					<i class="fas fa-calendar-alt"></i> 시작일
				</h3>
			<div id="calendarInput" class="calendarStart">
				<input type="text" id="startDate" name="start" placeholder="">
			</div>
			<!-- end Date -->
			<div class="calendars"></div>
			<h3 class="EndDate">
			<i class="fas fa-calendar-alt"></i> 종료일
			</h3>
			<div id="calendarInput" class="calendarEnd">
			<input type="text" id="endDate" name="end" placeholder="">
			</div>
			<!-- Card Details -->
			<div id="calendarDetailsWrap">
				<h2 class="calendarDetails">
					<i class="fas fa-align-left"></i> 내용
				</h2>
			</div>
				<div class="calendarContent">
					<textarea class="addCalendarDetails" id="content" name="content"cols="30" rows="10" placeholder="enter card Details"></textarea>

				</div>

			
			<div class="select">
				<div id="selectColorWrap">
					<h2 class="selectColorTitle">
						<i class="fas fa-palette"></i>색상
					</h2>
					<div id="calendarSelect" class="calendarSelect">
					<select class="calendar-input" name="color" id="eventColor" >
             			 <option value="#D25565" style="color:#D25565;" >빨간색</option>
			             <option value="#9775fa" style="color:#9775fa;" >보라색</option>
			             <option value="#ffa94d" style="color:#ffa94d;" >주황색</option>
			             <option value="#74c0fc" style="color:#74c0fc;" >파란색</option>
			             <option value="#f06595" style="color:#f06595;" >핑크색</option>
			             <option value="#63e6be" style="color:#63e6be;" >연두색</option>
			             <option value="#a9e34b" style="color:#a9e34b;" >초록색</option>
			             <option value="#4d638c" style="color:#4d638c;" >남색</option>
			             <option value="#495057" style="color:#495057;" >검정색</option>
		            </select>
				</div>
				</div>
			</div>
				<button class="addDetailsInsert-btn" id="insertCalendarKanBan"
				onclick="document.getElementById('calendarInsert_modal_contents').style.display='none'">등록</button>
		</div>
	</div>

<!--Details Modal-->
	<div id="calendarEdit_modal_contents" class="calendarDetailsModal">
		<div class="calendar-modal-detail">
			<span class="calendarCloseModal" id="editCancel"
		onclick="document.getElementById('calendarEdit_modal_contents').style.display='none'">&times;</span>
			
			<div class="calendarCheckBox"></div>
			<h3 class="CheckBox">
			<i class="far fa-check-square"></i> AllDay
			<input class="" type="checkbox" id="allDayView" name="allDay"  disabled/>
			</h3>	
			<!-- Card Title -->
			<div class="calendars"></div>
			<h3 class="Title">
			<i class="fas fa-pen"></i> 일정명
			</h3>
			<div id="calendarInput" class="calendarTitle">
				<input type="text" id="titleView" name="title" readonly /> 
			</div>
			<!-- Start Date -->
			<div class="calendars"></div>
			<h3 class="StartDate">
					<i class="fas fa-calendar-alt"></i> 시작일
				</h3>
			<div id="calendarInput" class="calendarStart">
				<input type="text" id="startDateView" name="start" readonly />
			</div>
			<!-- end Date -->
			<div class="calendars"></div>
			<h3 class="EndDate">
			<i class="fas fa-calendar-alt"></i> 종료일
			</h3>
			<div id="calendarInput" class="calendarEnd">
			<input type="text" id="endDateView" name="end" readonly />
			</div>
			<!-- Card Details -->
			<div id="calendarDetailsWrap">
				<h2 class="calendarDetails">
					<i class="fas fa-align-left"></i> 내용
				</h2>
			</div>
				<div class="calendarContent">
					<textarea class="addCalendarDetails" id="contentView" name="content"cols="30" rows="10" placeholder="enter card Details" readonly></textarea>

				</div>

			
			<div class="select">
				<div id="selectColorWrap">
					<h2 class="selectColorTitle">
						<i class="fas fa-palette"></i>색상
					</h2>
					<div id="calendarSelect" class="calendarSelect">
					<select class="calendar-input" name="color" id="eventColorView" disabled/ >
             			 <option value="#D25565" style="color:#D25565;" >빨간색</option>
			             <option value="#9775fa" style="color:#9775fa;" >보라색</option>
			             <option value="#ffa94d" style="color:#ffa94d;" >주황색</option>
			             <option value="#74c0fc" style="color:#74c0fc;" >파란색</option>
			             <option value="#f06595" style="color:#f06595;" >핑크색</option>
			             <option value="#63e6be" style="color:#63e6be;" >연두색</option>
			             <option value="#a9e34b" style="color:#a9e34b;" >초록색</option>
			             <option value="#4d638c" style="color:#4d638c;" >남색</option>
			             <option value="#495057" style="color:#495057;" >검정색</option>
		            </select>
				</div>
				</div>
			</div>
			<input type="text" name="id" id="seqView" hidden/>
				<button class="addDetailsEdit-btn" id="editCalendar">수정</button>
				<button class="addDetailsEdit-btn" id="deleteCalendar">삭제</button>
				<button class="addDetailsEdit-btn" id="okeditCalendar"
			onclick="document.getElementById('calendarEdit_modal_contents').style.display='none'" style="display:none;">완료</button>
			<button class="addDetailsEdit-btn" id="editCancelCalendar"
			onclick="document.getElementById('calendarEdit_modal_contents').style.display='none'" style="display:none;">취소</button>

		</div>
	</div>

</body>
</html>