document.addEventListener('DOMContentLoaded', () => {
	const newDiv = document.createElement('div');
	newDiv.id = 'myDiv';
	newDiv.className = 'generated-div';





	function addInputField(initialName) {
		const wrapper = document.createElement('div');
		wrapper.style.display = 'flex';
		wrapper.style.gap = '8px';

		const input = document.createElement('input');
		input.type = 'text';
		input.placeholder = 'Enter name';
		input.value = initialName || '';

		const saveBtn = document.createElement('button');
		saveBtn.textContent = 'Save';
		wrapper.appendChild(input);
		wrapper.appendChild(saveBtn);
		newDiv.appendChild(wrapper);

		saveBtn.addEventListener('click', () => {
			const name = input.value.trim();
			if (!name) return;
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
	const items = ['Item 1', 'Item 2', 'Item 3'];
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

 let player1 = new Character( newInput, 'Water', 100, 15);
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

 let RoomColor = ['lightgray', 'lightblue', 'lightgreen', 'lightyellow', 'lightpink', 'lightcoral'];
 let currentRoom = 0;
function changeRoom() {
	// advance to next room and record visit (avoid duplicate consecutive entries)
	currentRoom = (currentRoom + 1) % RoomColor.length;
	DungeonSpace.style.backgroundColor = RoomColor[currentRoom];
	DungeonSpace.dataset.room = currentRoom;
	const id = `room-${currentRoom}`;
	if (roomsVisited[roomsVisited.length - 1] !== id) roomsVisited.push(id);
	console.log('Rooms visited:', roomsVisited);
}

function changeRoomLeft() {
	// move one room left (circular) and record visit
	currentRoom = (currentRoom - 1 + RoomColor.length) % RoomColor.length;
	DungeonSpace.style.backgroundColor = RoomColor[currentRoom];
	DungeonSpace.dataset.room = currentRoom;
	const id = `room-${currentRoom}`;
	if (roomsVisited[roomsVisited.length - 1] !== id) roomsVisited.push(id);
	console.log('Rooms visited:', roomsVisited);
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
	}
}

// select dungeon by id and track visits
const dungeonEl = document.getElementById('dungeonSpace');
let roomsVisited = [];
DungeonSpace.style.backgroundColor = RoomColor[currentRoom];
if (dungeonEl) {
	dungeonEl.dataset.room = currentRoom;
	roomsVisited.push(`room-${currentRoom}`);
}



 const leftRoomBtn = document.createElement('button');
 leftRoomBtn.textContent = 'Left Room';
 leftRoomBtn.style.marginTop = '8px';
 newDiv.appendChild(leftRoomBtn);
 leftRoomBtn.addEventListener('click', changeRoomLeft);

 const rightRoomBtn = document.createElement('button');
 rightRoomBtn.textContent = 'Right Room';
 rightRoomBtn.style.marginTop = '8px';
 newDiv.appendChild(rightRoomBtn);
 rightRoomBtn.addEventListener('click', changeRoom);

 const forwardRoomBtn = document.createElement('button');
 forwardRoomBtn.textContent = 'Forward Room';
 forwardRoomBtn.style.marginTop = '8px';
 newDiv.appendChild(forwardRoomBtn);
 forwardRoomBtn.addEventListener('click', changeRoom);

 const backRoomBtn = document.createElement('button');
 backRoomBtn.textContent = 'Previous Room';
 backRoomBtn.style.marginTop = '8px';
 newDiv.appendChild(backRoomBtn);
 backRoomBtn.addEventListener('click', loadPreviousFromHistory);


const itemList = document.querySelector('#myDiv ul');
const newItem = document.createElement('li');
newItem.textContent = 'Item 4';
itemList.appendChild(newItem);

console.log(itemList)
 

});



