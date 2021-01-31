var usersBtn = document.getElementById('sidebar-users');
usersBtn.onclick = () => {
	logonSocket.send('로그인유저');
}

let done = 0;
let inProgress = 0;

$(document).ready(function() {
	function createUsers(data) {
		$.each(data, function(index, users) {
			getProgressByNameAndProjectSeq(users.email, Number($("#projectNum").val()));
			if (users.profile === null) {
				$('#users').append('<div class="users-item-wrapper">\
							<div class="users-top-wrapper">\
							<div id="users-select-user-on-'+ index + '" class="users-select-user-on"></div>\
							<div class="users-user"><img id="usersimg" src="./resources/img/icon/none.png"/></div>\
							<div class="users-username">'+ users.nickName + '</div>\
							</div>\
							<div class="users-middle-wrapper">\
							<div class="users-reply">\
							<i class="far fa-envelope"></i>메일:'+ users.email + '</div>\
							</div>\
							<div class = "chart-wrapper"><canvas id="myChart-'+ users.email + '"></canvas></div>\
							</div>');
			} else {
				$('#users').append('<div class="users-item-wrapper">\
							<div class="users-top-wrapper">\
							<div id="users-select-user-on-'+ index + '" class="users-select-user-on"></div>\
							<div class="users-user"><img id="usersimg" src="./resources/profile/'+ users.email + '_' + users.profile + '"/></div>\
							<div class="users-username">'+ users.nickName + '</div>\
							</div>\
							<div class="users-middle-wrapper">\
							<div class="users-reply">\
							<i class="far fa-envelope"></i>메일:'+ users.email + '</div>\
							</div>\
							<div class = "chart-wrapper"><canvas id="myChart-'+ users.email + '"></canvas></div>\
							</div>');
			}

			let ctx = document.getElementById('myChart-'  + users.email);
			let myChart = new Chart(ctx, {
				type: 'pie',
					data: {
				labels: ["완료","진행중"],
				datasets: [{
					backgroundColor: [
						"#f2dd68",
						"#31353d",
					],
					data: [done, inProgress]
				}]
			},
			options: {
			legend: {
				display : false,
				position: "right",
				labels: {
				}
			},
		}
			});
		})
	}

	$.ajax({
		type: "GET",
		url: "usersList.pie",
		contentType: "application/json; charset=UTF-8",
		dataType: "json",
		async: false,
		data: { project_seq: $("#projectNum").val() },
		success: function(data) {
			createUsers(data);
		}
	})
})

function getProgressByNameAndProjectSeq(name, projectNum) {
	$.ajax({
		type: "post",
		url: "getProgressByNameAndProjectSeq.pie?projectNum=" + projectNum + "&name=" + name,
		contentType: "application/json; charset=UTF-8",
		dataType: "json",
		async: false,
		success: function(data) {
			done = Number(data.mp.done);
			inProgress = Number(data.mp.inProgress);
		}
	});
}


$(document).ready(function() {
	var onoffBtn = document.getElementById('onoff');
	onoffBtn.onclick = () => {
		$("p").toggle();
		$(".top-menu").toggleClass('top-menu-light')
		$(".fa-bars").toggleClass('fa-bars-light')
		$(".sidebar").toggleClass('sidebar-ligth')
		$(".right-sidebar-contents-wrapper-display").toggleClass('right-sidebar-contents-wrapper-display-light')
		$(".file-top-icon-wrapper").toggleClass('file-top-icon-wrapper-light')
		$(".file-top-icon-letter").toggleClass('file-top-icon-letter-light')
		$(".file-top-icon").toggleClass('file-top-icon-light')
		$(".file-search-item-letter1").toggleClass('file-search-item-letter1-light')
		$(".file-search-item-letter2").toggleClass('file-search-item-letter2-light')
		$(".file-list-letter-title").toggleClass('file-list-letter-title-light')
		$(".file-list-img").toggleClass('file-list-img-light')
		if ($(".top-menu").hasClass("top-menu-light") === true) {
			$('body').css("background-image", "url(./resources/img/background2.png)")
		} else {
			$('body').css("background-image", "url(./resources/img/background_dark2.png)")
		}
	};
})