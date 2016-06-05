module.exports = function(app) {

    app.get('/', function(req, res) {
      res.send('<b>Welcome to the MongoDB Tips and Tricks tutorial.</b>');
    });

    app.get('/students', function(req, res){
      var pageNumber = 1;
      pageNumber = parseInt(req.query.pageNumber);
      var sizePerPage = parseInt(req.query.size);

      var skipRecordsCount = (pageNumber-1)*sizePerPage;
      app.get('dbConn').model('Paging').find({}, {}, {skip: skipRecordsCount, limit: sizePerPage}).lean().exec().
      // app.get('dbConn').model('Paging').find({}).skip(skipRecordsCount).limit(sizePerPage).lean().exec().
        then(function(records) {
          res.send(records);
        });
    });
};