/**
 * twitter.js 1rd release
 * www.yedincikat.net
 *
 * Copyright (C) 2013, Barýþ Ateþ.
 * All rights reserved.
 *
 * Bu plug-in twitter bilgilerini getirir. 
 * 
 * Bu satýrlar kaldýrýlmadan kullaným haklarý için bir kýsýtlama yoktur.
 * 
 **/
(function ($) {

    $.fn.twitter = function (options, callback) {

        var $this = $(this)

        var settings = $.extend({
            'twitterID': 'yedincikatajans',
            'tweetCount': 0,
            callback: function () { }
        }, options);


    function replaceURLWithHTMLLinks(text) {
        var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(exp, "<a href='$1' target='_blank'>$1</a>");
    }

	var html = ""


    $.ajax({
        url: 'https://api.twitter.com/1/users/lookup.json?screen_name=' + settings.twitterID + '&callback=?',
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            //console.log("", data);
            
            var timgUrl = data[0].profile_image_url_https
            
            timgUrl = timgUrl.replace("_normal", "_reasonably_small");
            
            
			html = '<ul id="mainContent"><li class="tHeader"><table border="0" width="100%" cellspacing="0" cellpadding="0"><tr>';
			html += '<td width="138" align="left"><img id="twitterLogo" src="' + timgUrl + '" alt="' + data[0].name + '" width="128" height="128"></td>'
			html += '<td align="left" valign="center">'
			html += '<p id="twitterName">' + data[0].name + '</p>'
			html += '<p id="screenName">@' + data[0].screen_name + '</p>'
			html += '<p id="twitterDesc">' + data[0].description + '</p>'
			html += '<p id="twitterLocation">' + data[0].location + '</p>'
			html += '<p id="twitterUrl">' + data[0].url + '</p>'
			html += '</td>'
			html += '<td width="87" align="left">'
			html += '<a href="https://twitter.com/' + settings.twitterID + '" class="twitter-follow-button" data-show-count="false" data-lang="tr" data-size="large" data-show-screen-name="false">Takip et: @' + settings.twitterID + '</a>' + "<script>    !function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + '://platform.twitter.com/widgets.js'; fjs.parentNode.insertBefore(js, fjs); } } (document, 'script', 'twitter-wjs');</script>"
			html += '<p class="stats" style="padding-top:10px;"><a href="http://twitter.com/' + settings.twitterID + '" target="_blank" id="twitCount">' + data[0].statuses_count + '</a> tweet</p>'
			html += '<p class="stats"><a href="http://twitter.com/' + settings.twitterID + '/following" target="_blank" id="friendsCount">' + data[0].friends_count + '</a> takip</p>'
			html += '<p class="stats"><a href="http://twitter.com/' + settings.twitterID + '/followers" target="_blank" id="followCount">' + data[0].followers_count + '</a> takipçi</p>'
			html += '</td></tr></table></li><li class="space"></li>'


        },complete: function() {

			    $.ajax({
			        url: 'https://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + settings.twitterID + '&callback=?',
			        dataType: 'json',
			        success: function (data) {

						html += '<li id="tContent"><ul><li id="tTitle">Tweets</li>'
						
			            $.each(data, function (key, value) {
			            
			            if (settings.tweetCount !== 0 && settings.tweetCount == (key+1)) {return false;}
			            
						html += '<li class="tweets"><table border="0" width="100%" cellspacing="0" cellpadding="0"><tr>'
						html += '<td width="58" align="left"><img src="https://si0.twimg.com/profile_images/3140935654/0a67fff80c2008a8db623e19624858e0_normal.jpeg"></td>'
						html += '<td>'
						html += '<p><span class="fullName">' + value.user.name + '</span><span class="fullLink">@' + value.user.screen_name + '</span><a href="https://twitter.com/intent/retweet?tweet_id=' + value.id + '" class="Retweet" target="_blank">retweet</a><a href="https://twitter.com/intent/favorite?tweet_id=' + value.id + '" class="Favorite" target="_blank">favorite</a></p>'
						html += '<p class="fullText">' + replaceURLWithHTMLLinks(value.text) + '</p>'
						html += '</td>'
						html += '<td align="right" class="timeDate" width="50">' + $.datepicker.formatDate('dd M', new Date(value.created_at)) + '</td>'
						html += '</tr></table></li>'
			
			            });
			           
			        },complete: function() {
			        html += '</ul></li></ul>'
			        $this.append(html);
			        $("#mainContent").fadeIn(500);
			        
			        if (callback !== undefined) {callback();}
			        }
			    });

        }
    });
    
    



/*

var html = ""

html = '<ul id="mainContent"><li class="tHeader"><table border="0" width="100%" cellspacing="0" cellpadding="0"><tr>';
html += '<td width="138" align="left"><img id="twitterLogo" src="https://si0.twimg.com/profile_images/3140935654/0a67fff80c2008a8db623e19624858e0_reasonably_small.jpeg" alt="Yedinci Kat" width="128" height="128"></td>'
html += '<td align="left" valign="center">'
html += '<p id="twitterName">d</p>'
html += '<p id="screenName">d</p>'
html += '<p id="twitterDesc">d</p>'
html += '<p id="twitterLocation">d</p>'
html += '<p id="twitterUrl">d</p>'
html += '</td>'
html += '<td width="87" align="left">'
html += '<a href="https://twitter.com/yedincikatajans" class="twitter-follow-button" data-show-count="false" data-lang="tr" data-size="large" data-show-screen-name="false">Takip et: @yedincikatajans</a>' + "<script>    !function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) { js = d.createElement(s); js.id = id; js.src = p + '://platform.twitter.com/widgets.js'; fjs.parentNode.insertBefore(js, fjs); } } (document, 'script', 'twitter-wjs');</script>"
html += '<p class="stats" style="padding-top:10px;"><a href="http://twitter.com/yedincikatajans" target="_blank" id="twitCount"></a>tweet</p>'
html += '<p class="stats"><a href="http://twitter.com/yedincikatajans/following" target="_blank" id="friendsCount"></a>takip</p>'
html += '<p class="stats"><a href="http://twitter.com/yedincikatajans/followers" target="_blank" id="followCount"></a>takipçi</p>'
html += '</td></tr></table></li><li class="space"></li>'
	
	<li id="tContent">d</li>

</ul>

*/



    }
})(jQuery);