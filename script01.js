function getWord() {
	var dictionary = ["ACURA", "ALFA ROMEO", "AUDI", "BMW", "BENTLEY", "BUGATTI", "BUICK", "CADILLAC", "CHEVROLET", "CHRYSLER", "DODGE", "FERRARI",
	"FIAT", "FORD", "GMC", "GENESIS", "HONDA", "HIUNDAY", "INFINITY", "JAGUAR", "JEEP", "KIA", "LAND ROVER", "LEXUS", "LINCOLN", "LOTUS", "MASERATI",
	"MAZDA", "MERCEDES BENZ", "MERCURY", "MINI", "MITSUBISHI", "NIKOLA", "NISSAN", "POLESTAR", "PONTIAC", "PORSCHE", "RAM", "RIVIAN", "ROLLS ROYCE",
	"SAAB", "SATURN", "SCION", "SMART", "SUBARU", "SUZUKI", "TESLA", "TOYOTA", "VOLKSWAGEN", "VOLVO"];
	var word = Math.floor((50 * Math.random()));
	return dictionary[word];
}

function buildWord(automaker) {
	for (let i = 0; i < automaker.length; i++) {
		if (i === 0 || i === (automaker.length - 1) || 
			(automaker[i] === automaker[0]) || 
				(automaker[i] === automaker[automaker.length - 1])) {
			document.getElementById('car-brand').innerHTML += automaker[i] + " ";
		} else { 
			document.getElementById('car-brand').innerHTML += "_ ";
		}
		
	}
}

function changeBtnClass(btn) {
	document.getElementById(btn).classList.remove('btn-primary');
	document.getElementById(btn).classList.add('btn-secondary')
}

function countLetters(word) {
	let charNr = "";
	for (let i = 0; i < word.length; i++) {
		if (charNr.includes(word.charAt(i))) {
			continue;
		} else {
			charNr += word.charAt(i);
		}
	}
	let charCount = charNr.length;
	if (charNr.includes(word.charAt(0))) {
		charCount--;
	}
	if (charNr.includes(word.charAt(word.length)) &&
		(word.charAt(0) != word.charAt(word.length - 1))
		) {
		charCount--;
	}
	//if (word.charAt(0) === word.charAt(word.length)) {
	//	charCount++;
	//}
	if (charNr.includes(' ')) {
		charCount--;
	}
	return charCount;
}

function displayCar(carMaker) {
	let carPic = document.getElementById("img-position");
	carPic.src = ("resized/" + carMaker + ".jpg");
}

function run() {
	var carMaker = getWord();
	buildAlphabetBtns();
	buildWord(carMaker);
	let charNr = countLetters(carMaker);
	let errorClick = 0;
	

	let startBtn = document.getElementById('btn-' + carMaker.charAt(0));
	startBtn.disabled = true;
	let endBtn = document.getElementById('btn-' + carMaker.charAt(carMaker.length - 1));
	endBtn.disabled = true;

	function buildAlphabetBtns() {
		for (let i = 0; i < 26; i++) {
			var keyName = ((i + 10).toString(36).toUpperCase());
			var btn_alpha = document.createElement("button");
			btn_alpha.innerHTML = keyName;
			btn_alpha.id = ('btn-' + keyName);
			btn_alpha.classList.add('btn');
			btn_alpha.classList.add('btn-sm');
			btn_alpha.classList.add('btn-primary');
			var btn_div = document.getElementById('buttons');
			btn_div.appendChild(btn_alpha);
			btn_alpha.addEventListener("click", function() {
				searchLetter(this.id);
			});
		}
	}

	function replaceSequence(word, letter, index) {
		console.log(word.substr(0, index - 1));
		console.log(word.substr(index + 1, word.length - 1));
		return word.substr(0, index) + letter + word.substr(index + 1);
	}

	function disableButtons() {
		var buttons_alpha = document.getElementById("buttons").getElementsByTagName('*');
		for (let i = 0; i < buttons_alpha.length; i++) {
			buttons_alpha[i].disabled = true;
		}
	}

	function searchLetter(btn_id) {
		var btn_alpha = document.getElementById(btn_id);
		btn_alpha.classList.remove('btn-primary');
		btn_alpha.classList.add('btn-secondary');
		btn_alpha.disabled = true;
		let letter = btn_alpha.id.charAt(4);
		let message_div = document.getElementById("word");
		let winMessage = document.createElement("h3");
		if (carMaker.includes(letter)) {
			for (let i = 1; i < carMaker.length - 1; i++) {
				if ((carMaker.charAt(i)) === (letter)) {
					let wordShown = document.getElementById('car-brand').innerHTML;
					console.log(wordShown + "\n" + wordShown.length);
					let newWord = replaceSequence(wordShown, letter, 2 * i + 2);
					document.getElementById('car-brand').innerHTML = newWord;
				}
			}
			charNr--;
			if (charNr === 0) {
				winMessage.innerHTML = "CONGRATULATIONS, YOU WON!";
				message_div.appendChild(winMessage);
				disableButtons();
				displayCar(carMaker);
			}
		} else {
			errorClick++;
			let positionImg = document.getElementById("img-position");
			positionImg.src = "gallows/pos" + (errorClick + 1) + ".png";
			if (errorClick === 14) {
				errorClick = 13;
				winMessage.innerHTML = "BETTER LUCK NEXT TIME!";
				message_div.appendChild(winMessage);
				disableButtons();
			}
		}
	}	
}

run();