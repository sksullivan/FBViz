FB.init({
	appId: '166064833600885'
});
FB.getLoginStatus(function (response) {
	console.log("doin it");
		if (response.status === 'connected') {
			id = response.authResponse.userID;
			access_token = response.authResponse.accessToken;
			sendFBCredentialsToServer(access_token,id, function () {
				alert("Already logged into FB.");
			});
			return;
		}
		access_token = "";
		FB.login(function (response) {
			if (response.authResponse) {
				console.log(FB.getAuthResponse());
				access_token = FB.getAuthResponse()['accessToken'];
				id = FB.getAuthResponse()['userID'];
				sendFBCredentialsToServer(access_token, id, function () {
					alert("Logged in to FB!");
				});
			} else {
				console.log('FB LOGIN ERROR: User cancelled login or did not fully authorize.');
			}
		}, { scope: 'publish_actions,publish_stream' }); // The specific permissions we need from FB
	});