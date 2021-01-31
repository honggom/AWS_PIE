<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form"  uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>PIE</title>
<!-- calendar를 위한 lib -->

<link rel="stylesheet" href="./resources/css/calendar.css">
<!-- <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> -->
<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/redmond/jquery-ui.css">
<link href='resources/fullcalendar/packages/core/main.css' rel='stylesheet' />
<link href='resources/fullcalendar/packages/daygrid/main.css' rel='stylesheet' />
<link href='resources/fullcalendar/packages/timegrid/main.css' rel='stylesheet' />
<link href='resources/fullcalendar/packages/list/main.css' rel='stylesheet' />
<script src='resources/fullcalendar/packages/core/main.js'></script>
<script src='resources/fullcalendar/packages/core/locales/ko.js'></script>
<script src='resources/fullcalendar/packages/interaction/main.js'></script>
<script src='resources/fullcalendar/packages/daygrid/main.js'></script>
<script src='resources/fullcalendar/packages/timegrid/main.js'></script>
<script src='resources/fullcalendar/packages/list/main.js'></script>
<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@10"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
<script src="./resources/js/calendar.js"></script>

<!--  -->

</head>
<body class="calendarbody">
<div class="panel panel-default">
	<div class="input-group">
     <label class="checkbox-inline"><input class='filter' name="calendar" type="radio" checked>전체보기</label>
     <label class="checkbox-inline"><input class='filter' name="calendar" id="kanbanCalendar" type="radio">내꺼만보기</label>
     </div>
</div>
<div id="calendar"> </div>
<jsp:include page="/WEB-INF/views/calendar/calendar_modal.jsp"></jsp:include>

</body>
</html>