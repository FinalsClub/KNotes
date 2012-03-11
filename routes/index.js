
/*
 * GET home page.
 * TODO: use this method initially to pass the backbone.js template to the client
 *      use other routes in this folder to handle other requests to respond via json
 */

exports.index = function(req, res){
  //res.render('index.html', { title: 'Values to be rendered go here' })
  res.sendfile( 'public/index.html' );
};
