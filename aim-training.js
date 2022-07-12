"use strict";

const $startButton = document.querySelector('#start');

const $screens = document.querySelectorAll('.screen');

const $time = document.querySelector('#time');

const $board = document.querySelector('#board');

const COLORS = ['red', 'black', 'white', 'blue', 'purple', 'pink'];

let time = 0;

let score = 0;

$startButton.addEventListener('click', (event) => {
	event.preventDefault();
	$screens[0].classList.add('up');
});

const $timeList = document.querySelector('#time-list');

$timeList.addEventListener('click', (event) => {
	if (event.target.classList.contains('time-btn')) {
		time = parseInt(event.target.dataset.time);
		$screens[1].classList.add('up');
		startGame();
	}
});

function startGame() {
	setInterval(decreaseTime, 1000)

	createRandomCircle();

	setTime(time);
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10) {
			current = `0${current}`;
		}
		setTime(current);
	}
}

function setTime(value) {
	$time.innerHTML = `00:${value}`;
}

function finishGame() {
	$time.parentNode.classList.add('hide');
	$board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
	const $circle = document.createElement('div');
	$circle.classList.add('circle');

	const circleSize = getRandomNumber(10, 60);

	const { width, height } = $board.getBoundingClientRect();

	const positionX = getRandomNumber(0, width - circleSize);
	const positionY = getRandomNumber(0, height - circleSize);

	$circle.style.backgroundColor = COLORS[getRandomNumber(0, COLORS.length - 1)];

	$circle.style.top = `${positionY}px`;
	$circle.style.left = `${positionX}px`;

	$circle.style.width = `${circleSize}px`;
	$circle.style.height = `${circleSize}px`;

	$board.append($circle);
}

$board.addEventListener('click', event => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createRandomCircle();
	}
});

function getRandomNumber(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}