var VideoCard = require('../models/videoCard');

//Display list of all videoCards.
exports.videoCard_list = function(req, res, next) {
  VideoCard.find({}, 'name  manufacturer memory chipset price amount')
  .exec(function (err, list_videoCards) {
    if (err) { return next(err); }
    //else (success)
    res.render('videoCard_list', { title: 'Video Cards', videoCard_list: list_videoCards });
  });
};

// Display detail page for a specific videoCard.
exports.videoCard_detail = function(req, res) {
  res.send('NOT IMPLEMENTED: videoCard detail: ' + req.params.id);
};

// Display videoCard create form on GET.
exports.videoCard_create_get = function(req, res) {
  res.send('NOT IMPLEMENTED: videoCard create GET');
};

// Handle videoCard create on POST.
exports.videoCard_create_post = function(req, res) {
  res.send('NOT IMPLEMENTED: videoCard create POST');
};

// Display videoCard delete form on GET.
exports.videoCard_delete_get = function(req, res) {
  res.send('NOT IMPLEMENTED: videoCard delete GET');
};

// Handle videoCard delete on POST.
exports.videoCard_delete_post = function(req, res) {
  res.send('NOT IMPLEMENTED: videoCard delete POST');
};

// Display videoCard update form on GET.
exports.videoCard_update_get = function(req, res) {
  res.send('NOT IMPLEMENTED: videoCard update GET');
};

// Handle videoCard update on POST.
exports.videoCard_update_post = function(req, res) {
  res.send('NOT IMPLEMENTED: videoCard update POST');
};