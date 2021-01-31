/*
파일명: chart.js
설명: 차트 생성 및 진행률 처리 js
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/

$(document).ready(function() {

	let project_seq = Number($("#projectNum").val());

	$(".td1").text(getListCount(project_seq));
	$(".td2").text(getCardCount(project_seq));
	$(".td3").text(getCheckListCount(project_seq));
	$(".td4").text(getMemberCount(project_seq));
	$(".td5").text(getCalendarCount(project_seq));

	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}
	let memberNames = new Array();
	let memberDones = new Array();
	let memberColors = new Array();
	getMemberProgress(project_seq);

	//랜덤 컬러로 만드는 함수
	function rancolor() {
		let randomColor = new Array();
		for (let i = 0; i < 6; i++) {
			randomColor.push('rgba(' + getRandomArbitrary(0, 255) + ',' +
				getRandomArbitrary(0, 255) + ',' +
				getRandomArbitrary(0, 255) + ')');
		}
		return randomColor;
	}

	//랜덤 컬러로 만드는 함수
	function rancolor2() {
		let randomColor = new Array();
		for (let i = 0; i < 2; i++) {
			randomColor.push('rgba(' + getRandomArbitrary(0, 255) + ',' +
				getRandomArbitrary(0, 255) + ',' +
				getRandomArbitrary(0, 255) + ')');
		}
		return randomColor;
	}

	/* 2번 차트*/
	let done = 0;
	let inProgress = 0;
	getTotalProgress(project_seq);
	/* 2번 차트*/

	/* 4번 차트*/
	let names = new Array();
	let dones = new Array();
	let colors = new Array();
	getListProgress(project_seq);
	/* 4번 차트*/


	//리스트 만들기
	function makeList_li(listName, listContent) {
		if (listContent === "NaN") {
			listContent = 0;
		}
		let list = "<tr class = 'list-tr'>" +
			"<td class = 'list-td'>" + listName + "</td>" +
			"<td>" + listContent + "%</td>"  +
			"</tr>";
		return list;
	}


	for (let i = 0; i < names.length; i++) {
		let list_li = makeList_li(names[i], dones[i]);
		$("#list-table").append(list_li);
	}


	let chart1 = document.getElementById('chart-1');
	let cht1 = new Chart(chart1, {
		type: 'bar',
		data: {
			labels: names,
			datasets: [{
				label: '진행률',
				data: dones,
				backgroundColor: colors,
				borderColor: '#f2dd68',
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				position: "bottom",
				labels: {
					fontColor: "#f2dd68"
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});

	let chart2 = document.getElementById('chart-2');
	let cht2 = new Chart(chart2, {
		type: 'pie',
		data: {
			labels: ['진행완료', '미진행'],
			datasets: [{
				data: [done, inProgress],
				barPercentage: 1,
				backgroundColor: ["f2dd68", "#31353d"],
				borderColor: '#f2dd68',
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				position: "bottom",
				labels: {
					fontColor: "#f2dd68"
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});

	let chart3 = document.getElementById('chart-3');
	let cht3 = new Chart(chart3, {
		type: 'polarArea',
		data: {
			labels: memberNames,
			datasets: [{
				label: '파이원 진행도',
				data: memberDones,
				backgroundColor: memberColors,
				borderColor: '#f2dd68',
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				position: "bottom",
				labels: {
					fontColor: "#f2dd68"
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});


	let chart3bar = document.getElementById('chart-3-bar');
	let chtbar3 = new Chart(chart3bar, {
		type: 'bar',
		data: {
			labels: memberNames,
			datasets: [{
				label: '파이원 진행도',
				data: memberDones,
				backgroundColor: memberColors,
				borderColor: '#f2dd68',
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				position: "bottom",
				labels: {
					fontColor: "#f2dd68"
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});


	let chart4 = document.getElementById('chart-4');
	let cht4 = new Chart(chart4, {
		type: 'bar',
		data: {
			labels: ['리스트', '카드', '체크리스트', '멤버', '캘린더 일정'],
			datasets: [{
				label: '총 수',
				data: [getListCount(project_seq),
				getCardCount(project_seq),
				getCheckListCount(project_seq),
				getMemberCount(project_seq),
				getCalendarCount(project_seq)],
				backgroundColor: rancolor(),
				borderColor: '#f2dd68',
				borderWidth: 1
			}]
		},
		options: {
			legend: {
				position: "bottom",
				labels: {
					fontColor: "#f2dd68",
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		}
	});

	/*파이규모 시작*/
	//리스트 총 개수 가져오기
	function getListCount(projectNum) {

		let list_count = 0;

		$.ajax({
			type: "post",
			url: "getListCount.pie?projectNum=" + projectNum,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				list_count = data.list_count;
			}
		});
		return list_count;
	}

	//카드 총 개수 가져오기
	function getCardCount(projectNum) {

		let card_count = 0;

		$.ajax({
			type: "post",
			url: "getCardCount.pie?projectNum=" + projectNum,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				card_count = data.card_count;
			}
		});
		return card_count;
	}

	//체크리스트 총 개수 가져오기
	function getCheckListCount(projectNum) {

		let checklist_count = 0;

		$.ajax({
			type: "post",
			url: "getCheckListCount.pie?projectNum=" + projectNum,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				checklist_count = data.checklist_count;
			}
		});
		return checklist_count;
	}

	//멤버 총 수 가져오기
	function getMemberCount(projectNum) {

		let member_count = 0;

		$.ajax({
			type: "post",
			url: "getMemberCount.pie?projectNum=" + projectNum,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				member_count = data.member_count;
			}
		});
		return member_count;
	}

	//캘린더 총 수 가져오기
	function getCalendarCount(projectNum) {

		let calendar_count = 0;

		$.ajax({
			type: "post",
			url: "getCalendarCount.pie?projectNum=" + projectNum,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				calendar_count = data.calendar_count;
			}
		});
		return calendar_count;
	}
	/*파이규모 끝*/


	/*전체 진행도 시작*/
	function getTotalProgress(projectNum) {

		$.ajax({
			type: "post",
			url: "getTotalProgress.pie?projectNum=" + projectNum,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				inProgress = Number(data.progress.inProgress);
				done = Number(data.progress.done);
			}
		});
	}
	/*전체 진행도 끝*/


	/*개인 진행도 시작*/
	function getMemberProgress(projectNum) {

		$.ajax({
			type: "post",
			url: "getMemberProgress.pie?projectNum=" + projectNum,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				$.each(data.mp, function(index, item) {
					memberNames.push(item.email);
					memberDones.push(Number(item.done));
					memberColors.push('rgba(' + getRandomArbitrary(0, 255) + ',' +
						getRandomArbitrary(0, 255) + ',' +
						getRandomArbitrary(0, 255) + ')');
				});
			}
		});
	}
	/*개인 진행도 끝*/


	/*리스트 진행도 시작*/
	function getListProgress(projectNum) {

		$.ajax({
			type: "post",
			url: "getListProgress.pie?projectNum=" + projectNum,
			contentType: "application/json; charset=UTF-8",
			dataType: "json",
			async: false,
			success: function(data) {
				$.each(data.list_progress, function(index, item) {
					names.push(item.list_name);
					dones.push(item.done);
					colors.push('rgba(' + getRandomArbitrary(0, 255) + ',' +
						getRandomArbitrary(0, 255) + ',' +
						getRandomArbitrary(0, 255) + ')');
				});
			}
		});
	}
	/*리스트 진행도 끝*/
});

