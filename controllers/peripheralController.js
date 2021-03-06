var Peripheral = require('../models/peripheral');
const { body,validationResult } = require('express-validator');
const type = ['Monitor','Keyboard', 'Mouse', 'Headphones', 'Speakers'];

//Display list of all peripherals.
exports.peripheral_list = function(req, res, next) {
  Peripheral.find({}, 'name manufacturer type description price amount')
  .exec(function (err, list_peripherals) {
    if (err) { return next(err); }
    //else (success)
    res.render('peripheral_list', { title: 'Peripherals', peripheral_list: list_peripherals });
  });
};

// Display detail page for a specific peripheral.
exports.peripheral_detail = function(req, res, next) {

  Peripheral.findById(req.params.id, function(err, results) {
  if (err) { return next(err); }
  if (results==null) { // No results.
      var err = new Error('peripheral not found');
      err.status = 404;
      return next(err);
  }
  // Successful, so render
  res.render('peripheral_detail', { title: results.manufacturer + ' ' + results.name, peripheral: results } );
});

};

// Display peripheral create form on GET.
exports.peripheral_create_get = function(req, res) {
  res.render('peripheral_form', {title: 'Add new Peripheral', types: type} );
};

// Handle peripheral create on POST.
exports.peripheral_create_post = [

  //Validate and sanitize fields
  body('name', 'Name is required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('type.*', 'Type is required').isLength({ min: 1 }).escape(),
  body('description.*').optional().isLength({ max: 150 }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),

  //Process request after validation and sanitization
  (req, res, next) => {

    //Extract errors
    const errors = validationResult(req);

    //Create a Peripheral object with escaped and trimmed data
    var newPeripheral = new Peripheral(
      {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        type: req.body.type,
        description: req.body.description,
        price: req.body.price,
        amount: req.body.amount
      });

    if (!errors.isEmpty()) {
      //Errors. Re-render form with sanitized values/errors
      res.render('peripheral_form', {title: 'Add new Peripheral', newMemory: newMemory, types: type, errors: errors.array() });
    }
    else {
      //Data from form is valid, save Peripheral
      newPeripheral.save(function (err) {
        if (err) { return next(err); }
        //Success, render new peripheral
        res.redirect('/catalog/peripheral/' +newPeripheral._id);
      });
    }
  }
];

// Display peripheral delete form on GET.
exports.peripheral_delete_get = function(req, res, next) {

  Peripheral.findById(req.params.id, function(err, results) {
    if (err) { return next(err); }
    if (results==null) { // No results.
        res.redirect('/catalog/peripherals');
    }
      // Successful, so render.
      res.render('peripheral_delete', { title: 'Delete Peripheral', peripheral: results } );
  });

};

// Handle peripheral delete on POST.
exports.peripheral_delete_post = function(req, res, next) {

  //Delete object and redirect to the list of peripherals.
  Peripheral.findByIdAndRemove(req.body.peripheralid, function deletePeripheral(err) {
      if (err) { return next(err); }
      // Success - go to peripheral list
      res.redirect('/catalog/peripherals')
  })
};

// Display peripheral update form on GET.
exports.peripheral_update_get = function(req, res, next) {

  Peripheral.findById(req.params.id, function(err, results) {
      if (err) { return next(err); }
      if (results==null) { // No results.
          var err = new Error('Peripheral not found');
          err.status = 404;
          return next(err);
      }
      // Success.
      res.render('peripheral_form', { title: 'Update Peripheral', newPeripheral: results, types: type });
  });

};

// Handle peripheral update on POST.
exports.peripheral_update_post = [
 
  // Validate and sanitze the name field.
  body('name', 'Peripheral name required').trim().isLength({ min: 1 }).escape(),
  body('manufacturer', 'Manufacturer is required').trim().isLength({ min: 1 }).escape(),
  body('type.*', 'Type is required').isLength({ min: 1 }).escape(),
  body('description.*').optional().isLength({ max: 150 }).escape(),
  body('price', 'Price is required').isDecimal({decimal_digits: '2'}).escape(),
  body('amount', 'Amount is required').isInt({ min: 1 }).escape(),
  

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request .
      const errors = validationResult(req);

  // Create a peripheral object with escaped and trimmed data (and the old id!)
      var newPeripheral = new Peripheral(
        {
        name: req.body.name,
        manufacturer: req.body.manufacturer,
        type: req.body.type,
        description: req.body.description,
        price: req.body.price,
        amount: req.body.amount,
        _id: req.params.id
        }
      );


      if (!errors.isEmpty()) {
          // There are errors. Render the form again with sanitized values and error messages.
          res.render('peripheral_form', { title: 'Update Peripheral', newPeripheral: newPeripheral, types: type, errors: errors.array()});
      return;
      }
      else {
          // Data from form is valid. Update the record.
          Peripheral.findByIdAndUpdate(req.params.id, newPeripheral, {}, function (err,theNewPeripheral) {
              if (err) { return next(err); }
                 // Successful - redirect to peripheral detail page.
                 res.redirect('/catalog/peripheral/'+ theNewPeripheral._id);
              });
      }
  }
];