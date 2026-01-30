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
				CharacterName.textContent = `Name: ${player1.name}`;
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
	heading.textContent = 'Hello from JavaScript-created div';
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
 console.log(player1);

 let enemy1 = new Character('Goblin', 'Earth', 80, 10);
 let enemy2 = new Character('Orc', 'Fire', 120, 20);
 let enemy3 = new Character('Troll', 'Air', 150, 25);
 let enemy4 = new Character('Dragon', 'Fire', 300, 50);

 let enemies = [enemy1, enemy2, enemy3, enemy4];
 console.log(enemies);


 const CharacterName = document.createElement('p');
 CharacterName.textContent = `Name: ${player1.name}`;
 newDiv.appendChild(CharacterName);


});

