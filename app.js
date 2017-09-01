var YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search"

var RESULTS_HTML_TEMPLATE = (

	'<div>' +
		'<a class="js-link" href=""><img class ="js-pic" src=""></a>' +
	'</div>'
);

var query = {
		part: 'snippet',
		key: 'AIzaSyCVblO2Gz3eoBRYiDwdxkJnmfzKOZxAQ5Y',
		maxResults: 5,
		type: "video"
	}

function getDataFromApi(searchTerm, callback) {

	query.q = searchTerm;

	$.getJSON(YOUTUBE_SEARCH_URL, query, callback);

}

function render (result) {
	var template = $(RESULTS_HTML_TEMPLATE);
	var link = "https://www.youtube.com/watch?v=" + result.id.videoId;
	template.find(".js-link").attr("href", link);
	template.find(".js-pic").attr("src", result.snippet.thumbnails.default.url);
	return template;
}

function display (data) {
	var results = data.items.map(function(item, index){
		return render(item);
	});
	$(".results").html(results);
	query.pageToken = data.nextPageToken;
}

function watchSubmit (){
	$(".form").submit(function(event){
		event.preventDefault();
		var input = $(this).find(".search");

		var text = input.val();

		getDataFromApi(text, display);
	});
}

$(watchSubmit);

$(".next").click(function(event){

	var input = $(".search");

	var text = input.val();
	
	getDataFromApi(text, display);

});