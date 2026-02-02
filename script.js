document.addEventListener('DOMContentLoaded', () => {
	const newDiv = document.createElement('div');
	newDiv.id = 'myDiv';
	newDiv.className = 'generated-div';


		
	let gameState = true;

	function addInputField(initialName) {
		const wrapper = document.createElement('div');
		wrapper.style.display = 'flex';
		wrapper.style.gap = '8px';

		const input = document.createElement('input');
		input.type = 'text';
		input.placeholder = 'Enter name';
		input.value = initialName || '';
		input.required = true;

		const saveBtn = document.createElement('button');
		saveBtn.textContent = 'Save';
		// disable save until valid
		saveBtn.disabled = !(input.value && input.value.trim().length > 0);

		// inline validation message
		const errorMsg = document.createElement('span');
		errorMsg.style.color = 'red';
		errorMsg.style.fontSize = '14px';
		errorMsg.style.marginLeft = '8px';
		errorMsg.textContent = 'Name is required';
		errorMsg.style.display = saveBtn.disabled ? 'inline' : 'none';

		wrapper.appendChild(input);
		wrapper.appendChild(saveBtn);
		wrapper.appendChild(errorMsg);
		newDiv.appendChild(wrapper);

		input.addEventListener('input', () => {
			const valid = input.value.trim().length > 0;
			saveBtn.disabled = !valid;
			errorMsg.style.display = valid ? 'none' : 'inline';
		});



		function validateUsername(value) {
		if (value.length < 3) {
		return "Username is too short"
		}}

		function applyValidation() {
  const err = validateUsername(input.value.trim());
  if (err) {
    errorMsg.textContent = err;
    errorMsg.style.display = 'inline';
    saveBtn.disabled = true;
  } else {
    errorMsg.style.display = 'none';
    saveBtn.disabled = false;
  }
}


input.addEventListener('input', applyValidation);


input.addEventListener('blur', applyValidation);


input.addEventListener('change', applyValidation);


applyValidation();

		saveBtn.addEventListener('click', () => {
			const name = input.value.trim();
			if (validateUsername(name)) {
				errorMsg.textContent = validateUsername(name);
				errorMsg.style.display = 'inline';
				return;
			}

			if (!name) {
				errorMsg.style.display = 'inline';
				saveBtn.disabled = true;
				return;
			}
			if (typeof player1 !== 'undefined') {
				player1.name = name;
				CharacterName.textContent = `Player: ${player1.name}`;
				localStorage.setItem('player1', JSON.stringify(player1));
			}
			console.log('Saved name:', name);
		});

		return input;
	}

	function getInputValue() {
		const inputField = newDiv.querySelector('input');
		return inputField ? inputField.value : '';
	}

	function handleInputChange() {
		const value = getInputValue();
		console.log('Input value changed to:', value);
	}

function saveInputValue() {
	const value = getInputValue();
	localStorage.setItem('inputValue', value);
	console.log('Input value saved:', value);
}

	// Add a heading and a list inside the div
	const heading = document.createElement('p');
	heading.textContent = "Welcome to the Dungeon!";
	heading.style.margin = '0 0 8px 0';
	newDiv.appendChild(heading);

	const list = document.createElement('ul');
	const items = ['Map', 'Bag', 'Key'];
	items.forEach(text => {
		const li = document.createElement('li');
		li.textContent = text;
		list.appendChild(li);
	});

	newDiv.appendChild(list);

	document.body.appendChild(newDiv);

	// Apply flex layout and basic styles
	newDiv.style.display = 'flex';
	newDiv.style.flexDirection = 'column';
	newDiv.style.justifyContent = 'center';
	newDiv.style.alignItems = 'center';
	newDiv.style.fontSize = '24px';
	newDiv.style.color = 'red';
	newDiv.style.padding = '12px';

   	let newInput = addInputField();


	class Character {
  constructor(name, category, health, attack) {
    this.name = name;
    this.category = category;
    this.health = health;
    this.attack = attack;
  }
	}

 let player1 = new Character('', 'Water', 100, 15);
 let enemy1 = new Character('Goblin', 'Earth', 80, 10);
 let enemy2 = new Character('Orc', 'Fire', 120, 20);
 let enemy3 = new Character('Troll', 'Air', 150, 25);
 let enemy4 = new Character('Dragon', 'Fire', 300, 50);

 let enemies = [enemy1, enemy2, enemy3, enemy4];
 console.log(enemies);


 const CharacterName = document.createElement('p');
 CharacterName.textContent = `Player Name: ${player1.name}`;
 if (CharacterName.textContent === 'Player Name: [object HTMLInputElement]') {
	CharacterName.textContent = 'Player Name: Unknown Adventurer';
 }
 newDiv.appendChild(CharacterName);


 const DungeonSpace = document.createElement('div');
 DungeonSpace.id = 'dungeonSpace';
 DungeonSpace.style.width = '400px';
 DungeonSpace.style.height = '300px';
 DungeonSpace.style.border = '2px solid black';
 DungeonSpace.style.marginTop = '16px';
 DungeonSpace.style.position = 'relative';
 newDiv.appendChild(DungeonSpace);

 DungeonSpace.textContent = 'Dungeon Area';
 DungeonSpace.style.display = 'flex';
 DungeonSpace.style.justifyContent = 'center';
 DungeonSpace.style.alignItems = 'center';
 DungeonSpace.style.fontSize = '32px'
 DungeonSpace.style.color = 'White';

 let RoomColor = ['lightgray', 'lightblue', 'lightgreen', 'lightyellow', 'lightpink', 'lightcoral'];
 let currentRoom = 0;
// images mapped by room index
const imagesList = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'];

function updatePic() {
	const picEl = document.getElementById('dungeonSpace') || DungeonSpace;
	if (!picEl) return;
	const idx = currentRoom % imagesList.length;
	picEl.style.backgroundImage = `url('./images/${imagesList[idx]}')`;
	picEl.style.backgroundSize = 'cover';
	picEl.style.backgroundPosition = 'center';
}
function changeRoom() {
	// advance to next room and record visit (avoid duplicate consecutive entries)
	currentRoom = (currentRoom + 1) % RoomColor.length;
	DungeonSpace.style.backgroundColor = RoomColor[currentRoom];
	DungeonSpace.dataset.room = currentRoom;
	const id = `room-${currentRoom}`;
	recordVisit(id);
}

function changeRoomLeft() {
	// move one room left (circular) and record visit
	currentRoom = (currentRoom - 1 + RoomColor.length) % RoomColor.length;
	DungeonSpace.style.backgroundColor = RoomColor[currentRoom];
	DungeonSpace.dataset.room = currentRoom;
	const id = `room-${currentRoom}`;
	recordVisit(id);
}

// history-based previous loader: pop current and load last visited
function loadPreviousFromHistory() {
	// remove current location
	if (roomsVisited.length <= 1) {
		console.log('No previous room in history');
		return;
	}
	// pop current
	roomsVisited.pop();
	const last = roomsVisited[roomsVisited.length - 1];
	if (!last) return;
	const match = last.match(/room-(\d+)/);
	if (!match) return;
	const idx = parseInt(match[1], 10);
	if (Number.isFinite(idx)) {
		currentRoom = idx % RoomColor.length;
		DungeonSpace.style.backgroundColor = RoomColor[currentRoom];
		DungeonSpace.dataset.room = currentRoom;
		console.log('Loaded previous from history:', last);
		// update image and visits counter when loading previous
		updatePic();
		if (typeof visitsCounter !== 'undefined') visitsCounter.textContent = `Rooms visited: ${roomsVisited.length}`;
	}
}

// select dungeon by id and track visits
const dungeonEl = document.getElementById('dungeonSpace');
let roomsVisited = [];
// visits counter UI
const visitsCounter = document.createElement('p');
visitsCounter.id = 'visitsCounter';
visitsCounter.style.marginTop = '8px';
visitsCounter.textContent = `Rooms visited: ${roomsVisited.length}`;
newDiv.appendChild(visitsCounter);

function recordVisit(id) {
	const prevLen = roomsVisited.length;
	if (roomsVisited[roomsVisited.length - 1] !== id) {
		roomsVisited.push(id);
	}
	if (roomsVisited.length > prevLen) {
		console.log('New room visited:', id);
		visitsCounter.textContent = `Rooms visited: ${roomsVisited.length}`;
		// game over check: trigger when visits reach threshold
		if (roomsVisited.length >= 3 && gameState) {
			gameState = false;
			alert('Game Over! Restart to play again.');
			window.confirm('Would you like to restart the game?') && window.location.reload();
			


		}
		// update dungeon image to match current room
		updatePic();
	}
}

DungeonSpace.style.backgroundColor = RoomColor[currentRoom];
if (dungeonEl) {
	dungeonEl.dataset.room = currentRoom;
	recordVisit(`room-${currentRoom}`);
}



 // navigation container (buttons on one line)
 const navContainer = document.createElement('div');
 navContainer.style.display = 'flex';
 navContainer.style.gap = '8px';
 navContainer.style.marginTop = '8px';
 navContainer.style.justifyContent = 'center';

 const leftRoomBtn = document.createElement('button');
 leftRoomBtn.textContent = 'Left Room';
 leftRoomBtn.addEventListener('click', changeRoomLeft);

 const rightRoomBtn = document.createElement('button');
 rightRoomBtn.textContent = 'Right Room';
 rightRoomBtn.addEventListener('click', changeRoom);

 const forwardRoomBtn = document.createElement('button');
 forwardRoomBtn.textContent = 'Forward Room';
 forwardRoomBtn.addEventListener('click', changeRoom);

 const backRoomBtn = document.createElement('button');
 backRoomBtn.textContent = 'Previous Room';
 backRoomBtn.addEventListener('click', loadPreviousFromHistory);

 navContainer.appendChild(leftRoomBtn);
 navContainer.appendChild(rightRoomBtn);
 navContainer.appendChild(forwardRoomBtn);
 navContainer.appendChild(backRoomBtn);
 newDiv.appendChild(navContainer);


let itemList = document.querySelector('#myDiv ul');
if (!itemList) {
	// If the list doesn't exist, create one inside `newDiv` so appendChild won't fail
	itemList = document.createElement('ul');
	newDiv.appendChild(itemList);
}
const newItem = document.createElement('li');
newItem.textContent = 'Lantern';
itemList.appendChild(newItem);

console.log(itemList);

itemList.id = 'list';
 
const data = ["Sword", "Coin", "Shield", "Health Potion", "Food"];

const list2 = document.querySelector("#list");
const roomId = `room-${currentRoom}`;
	
console.log('Current Room ID:', roomId);

if (!roomsVisited.includes(roomId)) {
		const fragment = document.createDocumentFragment();
		data.forEach(item => {
			const li = document.createElement("li");
			li.textContent = item;
			fragment.appendChild(li);
		});
		list2.appendChild(fragment);
		console.log(list2);
} else {
		console.log('No element with id "list" found; skipping list2 population.');
}


let pic =document.getElementById('dungeonSpace')
console.log(pic.style.backgroundColor)

let picSpace = RoomColor.indexOf(pic.style.backgroundColor)
console.log(picSpace);





});






