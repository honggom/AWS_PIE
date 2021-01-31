var socket = null; //전역변수 선언	
$(document).ready(function() {
	/*웹소켓*/
	function connectWS() {
		var ws = new WebSocket("ws://ec2-54-180-187-182.ap-northeast-2.compute.amazonaws.com:8080/Project_PIE/websocket/echo/websocket");
		socket = ws;
		ws.open = function(message) {
		}
		ws.onmessage = function(event) {
			alarm()
		};
		ws.onclose = function(event) {
		};
		ws.onerror = function(event) {
		}
	}
	connectWS();
	
	alarm();
	
	function alarm() {
		$("#alram").empty();
		$.ajax({
			typ: "GET",
			url: "alramList.pie",
			data: {
				email: $("#email").val(),
				project_seq: $("#projectNum").val()
			},
			success: function(data) {
				createAlram(data)
				createCount(data)
			}
		});
	}
	/*카운트 다운*/
	$(".alram-list-cancel").unbind('click');
	$(document).on('click', '.alram-list-cancel', function() {
		let alramseq = $(this).children().next().val()
		$(this).parent().remove();
		alramseq = Number(alramseq);
		$.ajax({
			type: "POST",
			url: "alramDelete.pie",
			data: {
				alramseq: alramseq,
				email: $("#email").val(),
				project_seq: $("#projectNum").val()
			},
			success: function(data) {
				socket.send("삭제")
			}
		});
	})


	/*알람 뿌리기*/
	function createAlram(data) {
		let html = "";
		$.each(data, function(index, alram) {
			let alramTime = moment(alram.alramTime).format('YYYY-MM-DD' + " " + 'HH:mm')
			html += '<div class="alram-list-wrapper">\
			<div class="alram-list-img">\
			<img src="./resources/img/pie_logo.png">\
			</div>\
			<div class="alram-list-letter-wrapper">\
			<div class="alram-list-letter-title">\
			'+ alram.nickName + '님이 ' + alram.title + '를 ' + alram.state + ' 하였습니다.\
			</div>\
			<div class="alram-list-letter-contents">\
			<span>'+ alramTime + '</span>\
			</div>\
			</div>\
			<div class="alram-list-cancel">\
			<i class="fas fa-times"></i>\
			<input type="hidden" id="alramseq" name="alramseq" value='+ alram.alramseq + ' />\
			<input type="hidden" id="memberEmail" name="memberEmail" value='+ $("#email").val() + ' />\
			</div>\
			</div>';
		});
		$('#alram').append(html)
	}

	/*카운트 업*/
	function createCount(data) {
		var alramCount = $('#alramCount');
		alramCount.empty();
		if (data.length !== 0) {
			$(".right-sidebar-alarm").attr('id', 'far fa-bell bell')
			$("#sidebar-bell").addClass('bell')
			document.getElementById('alramCount').style.display = 'block'
			document.getElementById('alramCount').innerText = data.length;
		} else if (data.length === 0) {
			$("#sidebar-bell").removeClass('bell')
			$(".right-sidebar-alarm").attr('id', 'far fa-bell')
			document.getElementById('alramCount').style.display = 'none'
		}
	}
});
