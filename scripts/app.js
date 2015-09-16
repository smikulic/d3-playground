/*
 * Build app
************************************ */
var app = document.getElementById('app');

function init() {
	route('welcome');
}

function clearComponent(component) {
	component.innerHTML = '';
}

function addComponent(component) {
	app.innerHTML += component;
}

function route(page) {
	clearComponent(app);

	switch(page) {
		case 'welcome':
			addComponent(welcomeComponent());
			break;
		case 'word-cloud':
			addComponent(headerComponent());
			addComponent(wordsComponent());
			break;
		default:
			addComponent(welcomeComponent());
			break;
	}
}


// Init application
init();