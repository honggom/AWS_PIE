/*
파일명: clock.js
설명: 화면상 시계 js
작성일: 2021-01-10 ~ 
작성자: 변재홍
*/

window.onload = function() {

	const clock = document.querySelector('.clock');

	function getTime() {
		const time = new Date();
		const hour = time.getHours();
		const minutes = time.getMinutes();
		const seconds = time.getSeconds();
		clock.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
	}

	function init() {
		setInterval(getTime, 1000);
	}

	init();
}