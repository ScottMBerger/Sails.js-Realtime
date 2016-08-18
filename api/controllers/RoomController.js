/**
 * RoomController
 *
 * @description :: Server-side logic for managing rooms
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

function detectmob(req) { 
 if( req.headers['user-agent'].match(/Android/i)
 || req.headers['user-agent'].match(/webOS/i)
 || req.headers['user-agent'].match(/iPhone/i)
 || req.headers['user-agent'].match(/iPad/i)
 || req.headers['user-agent'].match(/iPod/i)
 || req.headers['user-agent'].match(/BlackBerry/i)
 || req.headers['user-agent'].match(/Windows Phone/i)
 ){
    return true;
  }
 else {
    return false;
  }
}

module.exports = {
	action: function(req, res) {
		//if (!req.isSocket) {
	  //  return res.badRequest();
	  //}
	  console.log('Sending message: '+ req.param('action')+ ' | To room: '+req.param('cname'))
	  sails.sockets.broadcast(req.param('cname'), 'message', 'Received message: '+ req.param('action')+ ' | To room: '+req.param('cname'));

	  return res.send(200)
	},

	room: function(req, res) {
	  if (!req.isSocket) {
	    return res.badRequest();
	  }

	  var roomName = req.param('cname')
	  sails.sockets.join(req, roomName, function(err) {
	    if (err) {
	      return res.serverError(err);
	    }

	    return res.json({
	      message: 'Subscribed to a fun room called '+roomName+'!'
	    });
	  });
	},

	list: function (req, res) {

		console.log('Page loaded')
		console.log(req.headers['user-agent'])
		if (detectmob(req)) {
			return res.view('mobile', {
				title: 'Mobile Page',
	      user: 'mobile',
	      agent: detectmob(req) ? 'You are on mobile' : 'You are on the desktop'
	    })
		} else {
			return res.view('desktop', {
				title: 'Desktop Page',
	      user: 'desktop',
	      agent: detectmob(req) ? 'You are on mobile' : 'You are on the desktop'
	    })
		}
		
	}
};

