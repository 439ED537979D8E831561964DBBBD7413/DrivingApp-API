'use strict';

var Company = require('../models/company');

exports.list_all_companies= function(req, res, next) {
  Company.find({}, function(err, company) {
    if (err)
      res.send(err);
    res.json(company);
  });
};

exports.create_company = function(req, res, next) {
  var new_company = new Company(req.body);
  new_company.save(function(err, company) {
    if (err)
      res.send(err);
    res.json(company);
  });
};

exports.read_company = function(req, res, next) {
  Company.findOne({ 'idCompany': req.params.companyId }, function(err, company) {
    if (err)
      res.send(err);
    res.json(company);
  });
};

exports.update_company = function(req, res, next) {
  Company.findOneAndUpdate({ 'idCompany': req.params.companyId}, req.body, {new: true}, function(err, company) {
    if (err)
      return res.send(err);
    res.json(company);
  });
};

exports.delete_company = function(req, res, next) {
  Company.findOne({'idCompany': req.params.companyId}, function(err, company) {
    if(err)
      res.send(err);
    else if(company){
      company.status = ['inactive'];
      Company.update({'idCompany': req.params.companyId}, company, function(err, company) {
        if (err)
          res.send(err);
        res.json(company);
      })
      res.json({ message: 'Company successfully deleted' });
    }
  });
};