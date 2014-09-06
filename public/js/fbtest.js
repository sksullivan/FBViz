FB.init({
	appId: '166064833600885'
});
function login() {
	FB.getLoginStatus(function (response) {
		console.log(response);
		if (response.status === 'connected') {
			id = response.authResponse.userID;
			access_token = response.authResponse.accessToken;
			FB.api(
    			"/me/posts",
    			function (postresponse) {
    				console.log("we")
      				if (postresponse && !postresponse.error) {
        				console.log(postresponse);
      				}
    			}
			);
			return;
		} else {
			console.log('not');
		}
		access_token = "";
		FB.login(function (response) {
			if (response.authResponse) {
				console.log("llll"+FB.getAuthResponse());
				access_token = FB.getAuthResponse()['accessToken'];
			} else {
				console.log('FB LOGIN ERROR: User cancelled login or did not fully authorize.');
			}
		}, { scope: '' }); // The specific permissions we need from FB
	});
}
