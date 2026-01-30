document.addEventListener('DOMContentLoaded', () => {
	const newDiv = document.createElement('div');
	newDiv.id = 'myDiv';
	newDiv.className = 'generated-div';

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
});

