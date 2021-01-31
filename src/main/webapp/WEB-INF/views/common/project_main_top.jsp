<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>PIE</title>	
<link rel="stylesheet" href="./resources/css/project_main_top_style.css">	
<script src="./resources/js/clock.js"></script>
</head>
<body>
	<!-- Top Menu -->
	<div class="top-menu">
		<!-- Logo -->
		<div class="logo-box">
			<a href="main.pie">
				<img src="./resources/img/pie_logo_letter.png" alt="PIE logo" class="logo">
			</a>
		</div>
		
		<div class = "clock-wrapper">
				<span class="clock"></span>
		</div>
		
		<div class="navbar">
		<label class="switch">
  		<input type="checkbox" >
  		<span class="slider round" id="onoff"></span>
		</label>
		<p>Dark</p>
		<p style="display:none; color:#31353d">Light</p>
			<a class="nav-link">
				<i class="fas fa-bars" onclick="collapseSidebar()"></i>
			</a>
		</div>
	</div>
</body>
</html>