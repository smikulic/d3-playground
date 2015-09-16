// Welcome Component
var welcomeComponent = function() {
	var content;

	_handleClick = function() {
		route('word-cloud');
	}

	// DOM content build
	content = '<div class="welcome"> \
				<div class="welcome-message"> \
					Welcome to my Topics Challenge! \
					<span class="btn btn-red" onClick="_handleClick()">Start</span> \
				</div> \
			</div>';

	// DOM render
	return content;
};