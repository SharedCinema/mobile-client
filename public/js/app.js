;(function($, window, undefined) {
	var document = window.document;

	$.ajaxSetup({
		type: "GET",
		dataType: "json",
		timeout: 5000
		/*'beforeSend': function(xhr) {
			xhr.setRequestHeader("Accept", "text/javascript,application/javascript,text/html")
		}*/
	});

	window.scrollTo(0, 1);

	$(document).on('pageshow', '#vote', function() {

		$.getJSON('data/videos.json', function(res) {

			var list = $('#video-list');
			list.html('');

			$.each(res.videos, function(index, video) {
				//List element
				var li = document.createElement('li');

				//Anchor element
				var a  = document.createElement('a');
				a.href = '#';
				//a.innerHTML = video.title;

				//Left
				var left = document.createElement('div');
				left.className += ' video-list-left';

				//Image
				var img = document.createElement('img');
				img.className += ' video-list-img';
				img.src = video.thumb;
				left.appendChild(img);

				//Right
				var right = document.createElement('div');
				right.className += ' video-list-right';

				//Title
				var h3 = document.createElement('h3');
				h3.innerHTML = video.title;
				right.appendChild(h3);

				//Description
				var span = document.createElement('span');
				span.innerHTML = video.desc;
				right.appendChild(span);

				//Append left and right to anchor
				a.appendChild(left);
				a.appendChild(right);

				//Thumb
				var thumb = document.createElement('button');
				thumb.className += ' thumb';
				thumb.type = 'button';
				thumb.innerHTML = '&nbsp;';
				a.appendChild(thumb);

				//Append anchor to list
				li.appendChild(a);

				//Append list element to list
				list.append(li);
				//list.append('<li><a href="#">'+video.title+'</a></li>');
			});

			list.listview('refresh');

			list.on('click', function(e) {
				e.preventDefault();

				if(e.target.tagName == "BUTTON") {
					var el = e.target;

					console.log("I am the upvote button");
				}
			});
		});
	});

	$(document).on('pageshow', '#search', function() {

		var $searchInput = $('#search .ui-input-search [data-type=search]');
		console.log($searchInput)
		$searchInput.keyup(function(e) {
			var _this = this;
			console.log(_this);

			function successResponse(res) {
				console.log(res);
				return;
				var list = $('#search-list');
				list.html('');

				$.each(res.videos, function(index, video) {
					//List element
					var li = document.createElement('li');

					//Anchor element
					var a  = document.createElement('a');
					a.href = '#';
					//a.innerHTML = video.title;

					//Left
					var left = document.createElement('div');
					left.className += ' video-list-left';

					//Image
					var img = document.createElement('img');
					img.className += ' video-list-img';
					img.src = video.thumb;
					left.appendChild(img);

					//Right
					var right = document.createElement('div');
					right.className += ' video-list-right';

					//Title
					var h3 = document.createElement('h3');
					h3.innerHTML = video.title;
					right.appendChild(h3);

					//Description
					var span = document.createElement('span');
					span.innerHTML = video.desc;
					right.appendChild(span);

					//Append left and right to anchor
					a.appendChild(left);
					a.appendChild(right);

					//Thumb
					var thumb = document.createElement('button');
					thumb.className += ' thumb';
					thumb.type = 'button';
					thumb.innerHTML = '&nbsp;';
					a.appendChild(thumb);

					//Append anchor to list
					li.appendChild(a);

					//Append list element to list
					list.append(li);
					//list.append('<li><a href="#">'+video.title+'</a></li>');
				});

				list.listview('refresh');

				list.on('click', function(e) {
					e.preventDefault();

					if(e.target.tagName == "BUTTON") {
						var el = e.target;

						console.log("I am the upvote button");
					}
				});
			}

			$.ajax({
				url: 'http://local.m.sharedcinema.com:3000/search',
				data: {
					q: $(_this).val()
				},
				//type: "GET",
				contentType: "application/json; charset=utf-8",                                                            
				//dataType: "json",
				success: successResponse,
				error: function(msg) {
					console.log(msg)
				}
			});
		});
	});

}(jQuery, window));