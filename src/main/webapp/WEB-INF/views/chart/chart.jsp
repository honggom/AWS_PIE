<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>PIE</title>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js"
	integrity="sha512-d9xgZrVZpmmQlfonhQUvTR7lMPtO7NkZMkA0ABN3PHCbKA5nqylQ/yWlFAyY6hYgdF1Qh6nYiuADWwKB4C2WSw=="
	crossorigin="anonymous"></script>
<script src="<c:url value="./resources/js/chart.js"/>"></script>
<link rel="stylesheet" href="./resources/css/chart.css">
</head>
<body>


	<!-- whole wrapper -->
	<div class="whole-chart-wrapper">
		<!-- chart-1 -->
		<div class="chart-1-wrapper">
			<div class='chart-letter-wrapper-1'>리스트 진행률 차트</div>
			<canvas id="chart-1"></canvas>
		</div>

<!-- 		<div class="list-progress-wrapper">
			<div class="list-progress-title-wrapper"></div>

			<div class="list-progress-content-wrapper">
				<table id="list-table">
					<th>리스트 명</th>
					<th>진행률</th>
				</table>
			</div>
		</div> -->

<!-- 		<div class="pie-wrapper">
		<img src="/resources/img/prepare.png">
		</div> -->

		<!-- chart-2 -->
		<div class="chart-2-wrapper">
			<div class='chart-letter-wrapper-2'>전체 진행률 파이 차트</div>
			<canvas id="chart-2"></canvas>
		</div>

		<!-- chart-3 -->
		<div class="chart-3-wrapper">
			<div class='chart-letter-wrapper-3'>개인 진행도 파이</div>
			<canvas id="chart-3"></canvas>

		</div>

		<div class="chart-3-wrapper-bar">
			<div class='chart-letter-wrapper-3-bar'>개인 진행도 바</div>
			<canvas id="chart-3-bar"></canvas>
		</div>


<!-- 		<div class="whole-pie-wrapper">
			<div class="whole-pie-title-wrapper"></div>

			<div class="whole-pie-cotent-wrapper">
				<table id="whole-pie-table">
					<th>명칭</th>
					<th>개수</th>
					<tr class="pie-tr">
						<td class="pie-td">리스트</td>
						<td class="pie-td td1">1</td>
					</tr>
					<tr class="pie-tr">
						<td class="pie-td">카드</td>
						<td class="pie-td td2">1</td>
					</tr>
					<tr class="pie-tr">
						<td class="pie-td">체크리스트</td>
						<td class="pie-td td3">1</td>
					</tr>
					<tr class="pie-tr">
						<td class="pie-td">멤버</td>
						<td class="pie-td td4">1</td>
					</tr>
					<tr class="pie-tr">
						<td class="pie-td">캘린더 일정</td>
						<td class="pie-td td5">1</td>
					</tr>
				</table>
			</div>
		</div> -->

		<!-- chart-4 -->
		<div class="chart-4-wrapper">
			<div class='chart-letter-wrapper-4'>파이 규모</div>
			<canvas id="chart-4"></canvas>
		</div>

	</div>

</body>
</html>