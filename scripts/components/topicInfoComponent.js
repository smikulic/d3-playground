// TopicInfo Component
function topicInfoComponent(topic) {
	var content;
	var labelNode = '';
	var totalMentionsNode = '';
	var positiveMentionsNode = '';
	var negativeMentionsNode = '';
	var neutralMentionsNode = '';
	var label = topic.label;
	var totalMentions = topic.volume;
	var positiveMentions = topic.sentiment.positive;
	var negativeMentions = topic.sentiment.negative;
	var neutralMentions = topic.sentiment.neutral;

	// Actions
	topicInfo.onclick = function() {
		clearComponent(this);
	};


	if (label) {
		labelNode = '<p class="topicInfo-label">Information on topic <span class="value">"'+ label +'"</span></p>';
	}

	if (totalMentions > 0) {
		totalMentionsNode = '<p class="topicInfo-mentions topicInfo-mentions--total">Total mentions: <span class="value">'+ totalMentions +'</span></p>';
	}

	if (positiveMentions > 0) {
		positiveMentionsNode = '<p class="topicInfo-mentions topicInfo-mentions--positive">Positive mentions: <span class="value">'+ positiveMentions +'</span></p> ';
	}

	if (negativeMentions > 0) {
		negativeMentionsNode = '<p class="topicInfo-mentions topicInfo-mentions--negative">Negative mentions: <span class="value">'+ negativeMentions +'</span></p> ';
	}

	if (neutralMentions > 0) {
		neutralMentionsNode = '<p class="topicInfo-mentions topicInfo-mentions--neutral">Neutral mentions: <span class="value">'+ neutralMentions +'</span></p> ';
	}
	

	// DOM content build
	content = '<div class="topic-info">' +
				labelNode +
				totalMentionsNode +
				positiveMentionsNode +
				negativeMentionsNode +
				neutralMentionsNode +
			'</div>';


	// DOM render
	topicInfo.innerHTML = '';
	topicInfo.innerHTML += content;
}