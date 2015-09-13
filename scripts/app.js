function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'http://localhost:25000/api/topics', true);
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function init() {
	loadJSON(function(response) {
  		// Parse JSON string into object
    	var topics = JSON.parse(response);

    	generateWordCloud(topics);
 	});
}

function generateWordCloud(topics) {
	console.log(topics)
}

init();