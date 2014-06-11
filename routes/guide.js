exports.guide = function(req, res){
//  res.render('index', { title: 'Express' });
    res.sendfile('./views/guide.html');
};