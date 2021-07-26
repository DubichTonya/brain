function brainExercise() {

	let value_1 = document.querySelector('.brainExercise__value-1');
	let value_2 = document.querySelector('.brainExercise__value-2');
	let result = document.querySelector('.brainExercise__value-res');
	const startBtn = document.querySelector('.brainExercise__start');
	const answerText = document.querySelector('.brainExercise__answer-text');
	const answerResult = document.querySelector('.brainExercise__answer-value');
	let count = 1;
	let themesBtn = document.querySelector('.brainExercise__themes input');
	let secondsBlock = document.querySelector('.brainExercise__timer .seconds');
	let minutesBlock = document.querySelector('.brainExercise__timer .minutes');
	let hoursBlock = document.querySelector('.brainExercise__timer .hours');
	let animationBlock = document.querySelector('.brainExercise__scene');
	let resetBtn = document.querySelector('.brainExercise__reset');
	let timer;

	const body = document.querySelector('body');

	function brainExerciseStart() {
		result.disabled = true;
		themesBtn.addEventListener('change', themesHandler)
		startBtn.addEventListener('click', startPlay);
		document.addEventListener('keypress', checkValue);
		document.addEventListener('keypress', restart);
		resetBtn.addEventListener('click', brainExerciseReset)
	}

	function brainExerciseReset() {
		result.disabled = true;
		clearInterval(timer);
		secondsBlock.textContent = '00';
		minutesBlock.textContent = '00';
		hoursBlock.textContent = '00';
		value_1.textContent = '10';
		value_2.textContent = '10';
		animationBlock.classList.remove('animation')
	}

	function themesHandler(e) {
		if (e.target.checked) {
			setToStorage('themes', 'dark')
			body.className = 'dark';
		} else {
			setToStorage('themes', 'light');
			body.className = 'light';
		}
	}

	function checkThemes() {
		if (getFromStorage('themes')) {
			body.className = getFromStorage('themes');
			if (localStorage.getItem('themes') === 'dark') {
				themesBtn.checked = true;
			}
		} else {
			body.classList.add('light')
		}

	}

	checkThemes()

	function setToStorage(key, value) {
		localStorage.setItem(key, value)
	}

	function getFromStorage(key) {
		return localStorage.getItem(key);
	}

	function updateCount() {
		count += 1;
		timerHandler();
	}

	function timerHandler() {
		timer = setTimeout(updateCount, 1000);
		let seconds = getSeconds(count);
		let minutes = getMinutes(count);
		let hours = getHours(count);

		if (secondsBlock.textContent === seconds.toString()) {
			return;
		} else {
			secondsBlock.textContent = seconds;
		}

		if (minutesBlock.textContent === minutes.toString()) {
			return;
		} else {
			secondsBlock.textContent = minutes;
		}

		if (hoursBlock.textContent === hours.toString()) {
			return;
		} else {
			hoursBlock.textContent = hours;
		}


		// todo: Если нужно остановить через 10 секунд
		// if(count === 600000){
		// 	clearInterval(timer)
		// }

	}

	function getMinutes(count) {
		if (count >= 60 && count < 3600) {
			return addZero(Math.trunc(count / 60), 10)
		} else if (count >= 3600) {
			return addZero(Math.trunc((count % 3600) / 60))
		} else {
			return '00'
		}
	}

	function getSeconds(count) {
		return addZero(count % 60, 10)
	}

	function getHours(count) {
		return (count >= 3600) ? addZero(Math.trunc(count / 3600), 10) : '00';
	}

	function addZero(num) {
		return (parseInt(num, 10) < 10 ? '0' : '') + num
	}


	function checkValue(e) {
		if (e.code === 'Enter') {
			if (result.value == value_1.textContent * value_2.textContent) {
				answerText.textContent = 'Правильно';
				answerResult.textContent = '';
			} else {
				answerText.textContent = 'Не правильно:';
				answerResult.textContent = `${+value_1.textContent * +value_2.textContent}`
			}
		}

	}

	function restart(e) {
		if (e.code === 'Space') {
			refreshPlay()
		}
	}


	function startPlay() {
		result.disabled = false;
		result.value = '';
		answerResult.textContent = '';
		answerText.textContent = '';
		value_1.textContent = generateRandomValue('2');
		value_2.textContent = generateRandomValue('2');
		animationBlock.classList.add('animation')
		timerHandler();
	}

	function refreshPlay() {
		result.value = '';
		answerResult.textContent = '';
		answerText.textContent = '';
		value_1.textContent = generateRandomValue('2');
		value_2.textContent = generateRandomValue('2');
	}

	function generateRandomValue(count) {
		let number;
		let value = {
			min: 0,
			max: 0
		}
		switch (count) {
			case '1':
				value.min = 1;
				value.max = 9;
				break;
			case '2':
				value.min = 10;
				value.max = 99;
				break;
			case '3':
				value.min = 100;
				value.max = 999;
				break;
			case '4':
				value.min = 1000;
				value.max = 9999;
				break;
			case '5':
				value.min = 10000;
				value.max = 99999;
				break;
			default:
				value.min = 10;
				value.max = 99;
		}

		number = Math.floor(Math.random() * (value.max - value.min + 1)) + value.min;
		return number.toString();

	}

	brainExerciseStart()


}


document.addEventListener("DOMContentLoaded", brainExercise)

