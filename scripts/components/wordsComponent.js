// Words Component
var wordsComponent = function() {
	var content;

	loadJSON(function(response) {
  		// Parse JSON string into object
    	var topics = JSON.parse(response);

    	wordCloud(topics);
 	});

	// DOM content build
	content = '';

	// DOM render
	return content;
};