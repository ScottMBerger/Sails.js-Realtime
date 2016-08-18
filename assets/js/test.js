window.onload = function() {
  io.socket.post(window.location.pathname, { name: 'js' }, function (resData, jwres) {
		console.log(resData)
		io.socket.on('message', function (msg) {
		  console.log(msg)
		});
	});


	if (detectmob()) {
		console.log('is mobile')
	} else {
		console.log('is not mobile')
	}
};

function detectmob() { 
 if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}