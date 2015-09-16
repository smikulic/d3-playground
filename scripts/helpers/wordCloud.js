/*
 * Word cloud
************************************ */
function wordCloud(topics) {
	var topicsLength = topics.length;
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

	function _handleClick(topic, topics, topicsLength) {
		var i = 0;
		for (; i < topicsLength; i++) {
			var topicObj = topics[i];
			if (topic.text === topicObj.label) {
				topicInfoComponent(topicObj)
			}	
		}
	}

	function _wordColorCategory(topic, index) {
    	var topicColor = '#D7D7DC';

    	if(topic.text === topics[index].label) {
    		var topicSentimentScore = topics[index].sentimentScore;

    		if (topicSentimentScore > 60) {
				topicColor = 'green';
			} else if (topicSentimentScore < 40) {
				topicColor = '#FF1100';
			}
    	}

    	return topicColor; 	        
  	}

  	function _draw(words) {
	    d3.select('body').append("svg")
	        .attr("width", layout.size()[0])
	        .attr("height", layout.size()[1])
	      .append("g")
	        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
	      .selectAll("text")
	        .data(words)
	      .enter().append("text")
	        .style("font-size", function(topic) { return topic.size + "px"; })
	        .style('cursor', 'pointer')
	        .style("fill", function(topic, index) { return _wordColorCategory(topic, index); })
	        .attr("text-anchor", "middle")
	        .attr("transform", function(topic) {
	          return "translate(" + [topic.x , topic.y] + ")rotate(" + topic.rotate + ")";
	        })
	        .on("click", function(topic) {
		      	_handleClick(topic, topics, topicsLength);
	      	})
	        .text(function(topic) { return topic.text; });
  	}

  	// d3 layout
	layout =d3.layout.cloud().size([640, 480])
	    .words(wordsList)
	    .rotate(0)
	    .fontSize(function(topic) { return topic.size; })
	    .on("end", _draw);

  	layout.start();
}