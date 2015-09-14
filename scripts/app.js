/*
 * Build app
************************************ */
var topicInfo = document.getElementById('topicInfo');

function init() {
	loadJSON(function(response) {
  		// Parse JSON string into object
    	var topics = JSON.parse(response);

    	wordCloudComponent(topics);
 	});
}

function clear(element) {
	element.innerHTML = '';
}


// Init application
init();