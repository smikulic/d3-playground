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
	var topicsLength = topics.length;
	var fill = d3.scale.category20();
	var wordsList = [];
	var wordsVolume = [];
	var maxTopicSize = 0;
	var topicSizeDifference = 0;
	var numOfCategories = 6;
	var layout;

	// Max value
	var i = 0;
	for (; i < topicsLength; i++) {
		wordsVolume.push(topics[i].volume);
	}
	maxTopicSize = d3.max(wordsVolume);
	topicSizeDifference = maxTopicSize / numOfCategories;

	// Topics converted into d3 usable array
	wordsList = topics.map(function(topic) {
		var i = 1;
		var minSize = 0;
		var maxSize = topicSizeDifference;
		var topicVolume = topic.volume;
		var topicSize = 24;
		var topicSizeIncrement = 6;

		for (; i <= numOfCategories;) {
			if (topicVolume >= minSize && topicVolume <= maxSize) {
				topicSize += i * topicSizeIncrement;
			}

			i++;
			minSize = maxSize;
			maxSize = topicSizeDifference * i;
		}
		

        return {
        	text: topic.label, 
        	size: topicSize
        };
    });

	// d3 layout
	layout =d3.layout.cloud().size([640, 480])
	    .words(wordsList)
	    .padding(5)
	    .rotate(function() { return 0; })
	    .fontSize(function(topic) { return topic.size; })
	    .on("end", draw);

	function wordColorCategory(topic, index) {
    	var topicColor = '#d3d3d3';

    	if(topic.text === topics[index].label) {
    		var topicSentimentScore = topics[index].sentimentScore;

    		if (topicSentimentScore > 60) {
				topicColor = '#30AD23';
			} else if (topicSentimentScore < 40) {
				topicColor = 'red';
			}
    	}

    	return topicColor; 	        
  	}

  	function draw(words) {
	    d3.select("body").append("svg")
	        .attr("width", layout.size()[0])
	        .attr("height", layout.size()[1])
	      .append("g")
	        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
	      .selectAll("text")
	        .data(words)
	      .enter().append("text")
	        .style("font-size", function(topic) { return topic.size + "px"; })
	        .style('cursor', 'pointer')
	        .style("fill", function(topic, index) { return wordColorCategory(topic, index); })
	        .attr("text-anchor", "middle")
	        .attr("transform", function(topic) {
	          return "translate(" + [topic.x , topic.y] + ")rotate(" + topic.rotate + ")";
	        })
	        .on("click", function(topic) {
		      	console.log(topic.text);
	      	})
	        .text(function(topic) { return topic.text; });
  	}

  	layout.start();
}

init();