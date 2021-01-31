<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet"
	href="http://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<!-- <script src="https://code.jquery.com/jquery-1.12.4.js"></script> -->
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="./resources/css/cardMember.css">
<link rel="stylesheet" href="./resources/css/kanban-board.css">
<link rel="stylesheet" href="./resources/css/kanbanDetailModal.css">
<script src="./resources/js/kanban-board.js"></script>
<script src="./resources/js/kanbanDetailModal.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<link rel="stylesheet" href="./resources/css/calendar.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script src="./resources/js/kanbanCalendar.js"></script>
<script src="./resources/js/kanbanComments.js"></script>
<link rel="stylesheet" href="./resources/css/kanbanComments.css">
<title>PIE</title>
</head>
<body>
<jsp:include page="/WEB-INF/views/calendar/calendar_kanban_modal.jsp"></jsp:include>
	<div id="kanbanPage-wrapper">
		<!-- A title of a project -->
		<div id="projectTitleWrap">
			<div id="projectTitle"></div>
			<form id="projectTitleEdit">
				<input type="text" id="projectTitleInput" placeholder=""> <input
					type="submit" style="display: none;">
			</form>
		</div>
		<!--KANBAN BOARD LISTS-->
		<div id="listWrap">


		<!--Add another List-->
		</div>
		<div id="addListWrap">
			<div id="addListLabel">+ Add another List</div>
			<form id="addList">
				<input type="text" id="addListTitleInput"
					placeholder="Enter a List Title">
				<button class="addList-btn">Add List</button>
				<span class="close" id="closeList">&times;</span>
			</form>
		</div>
	</div>

	<!--Details Modal-->
	<div id="detailsModal" class="detailsModal">
		<div class="modal-detail">
			<!-- Modal close btn -->
			<span class="closeModal" id="closeModal">&times;</span>
			
			<!-- Card Title -->
			<div class="cardTitleMo"></div>
			<form id="cardTitleForm" class="cardTitleForm">
				<input type="text" id="cardTitleInput" placeholder=""> 
				<input type="hidden" class="modal_card_seq" name="modal_card_seq" value="">
				<input type="submit" style="display: none;">
			</form>
			
			<!-- Card Member List -->
			<div class="memList">
				<div id="memTitle" style="display: none;">Card Members</div>
			</div>
			
			<!-- Side Buttons -->
			<div class="side">
				<div class="cardMembersBtn">
					<i class="fas fa-user-check"></i> Add Members
				</div>
				<div class="setDueDateBtn" style="display:">
					<i class="far fa-calendar" ></i> Set Date
				</div>
				<div class="getDueDateBtn" style="display:">
					<i class="far fa-calendar-check" ></i> Get Date
				</div>
			</div>
			
			<!-- Card Details -->
			<div id="cardDetailsWrap">
				<h2 class="cardDetails">
					<i class="far fa-clipboard"></i> Details
					<i class="far fa-edit" style="display:none;"></i>
				</h2>
				<div class="cardContents" style="display:none;"></div>
			</div>
				<form class="cardDetailsForm" style="display:neone;">
					<textarea class="addCardDetails" cols="30" rows="10" placeholder="enter card Details"></textarea>
					<button class="addDetails-btn">Save</button>
					<span class="closeDetails" id="closeDetails"></span>
				</form>
			
			
			<!-- checkList Wrap -->
			<div class="main">
				<div id="checkListWrap">
					<h2 class="checkListTitle">
						<i class="fa fa-check"></i> CheckList
					</h2>
					<div class="progressbar-container">
						<div class="progressbar"></div>
						<div class="progressbar-label"></div>
					</div>
					
					<form id="checkListForm">
						<div id="add-todo">
							<i class="fa fa-plus"></i> Add a CheckList
						</div>
					</form>
				</div>
			</div>
			
			<!-- Comments Wrap -->
			<div class = CommetnsWrap>
				<h2 class="commentsTitle">
					<i class="far fa-comments"></i> Comments
				</h2>
				<div class="comments" style="display:none;"></div>
				<form class="commentsForm">
					<textarea class="addComments" cols="30" rows="10" placeholder="enter comments"></textarea>
					<button class="addComments-btn">Save</button>
				</form>
			</div>
		</div>
	</div>
	
	<!-- invite Card Members Modal -->
		<div id="inviteModal">
			<div class="invite-detail" data-project-card="" data-invite-card="">
			<!-- MemModal close btn -->
			<span class="closeMemModal" id="closeMemModal">&times;</span>
				<div class="projectMemList"></div>
			</div>
		</div>
	
</body>
</html>