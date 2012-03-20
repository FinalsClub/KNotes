/*
 * POST a file to be uploaded
 */

exports.upload = function(req, res, next){
  console.log("/upload! "+req.body);
  console.log(req.files);
  console.log(req);
  res.write('ok');
  res.end();
  // /upload should act as a holding directory
  // when note upload is 'verified', it will be moved
  // to /public/notes or likewise
};
