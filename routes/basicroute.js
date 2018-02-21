module.exports = function(app, mongoose, async, basicModel){

  //===========================//
  //CRUD Operation
  //===========================//

	//Fetch information
	app.get('/getpath', function(request, response){

		// For Log tail on heroku
    console.log("New get request:", request.query);

    //Get the query and extract user id.
		var generalParameters = request.query;
		var basicKeyQuery     = request.query["key"]; // The parameter to use to find in the db

        //Check if we have neccesary information
        if(gasolineriaId !== undefined ){

    		    //Perform request with Mongoose for the Model
            basicModel.findOne({'key': basicKeyQuery}).exec(function(error, fetchResponse){

            	//Check for errors
                if (error) {

                	  //Respond with error.
                    console.log("Error:  ", error); 
                    response.send({
                         code : 500,
                    	   msg  : 'Error: '+ error
                    });
                    response.end();

                }else{

                    //All good send result of the fetch based on the mongoose fetch response.
                    if(fetchResponse === null) {
                       
                       console.log("Nothing found"); // For log tail on heroku

                       response.send({
                        code            : 200,
                        msg             : "Nothing found"
                       });
                       response.end();

                    } else {

                       console.log("Information found: ", fetchResponse); // For log tail on heroku

                       //Respond
                       response.send({
                        code            : 200,
                        fetchresponse   : fetchResponse
                       });
                       response.end();

                    }//Ends if(fetchResponse !== null) {

                }//Ends if (error) {

            });// Ends mongoose.model("Gasolineria")

        } else {

            //We have not enough information, return
            console.log("Not enought data to makr a request: ", generalParameters);
            response.send({
                'code'  : 500,
                'status': 'Error', 
                'msg'   : 'Not enought data to makr a request'
            }).end();


        }//Ends basicModel.findOne

  }); // Ends app.get

  //Push information 
  app.post('/postpath', function(request, response){

    //Get the Parameters of the post
    var generalParameters	= request.body;
    var parameterExampleString  = generalParameters["keyofparameterstring"] // For example the string field fill on the object.
    var parameterExampleNumber  = generalParameters["keyofparameternumber"] // For example the number field to fill on the object.
    var parameterExampleArray   = generalParameters["keyofparameterarray"]  // For example the array field to fill on the object.

    //For tail logs.
   	console.log("New post request", generalParameters);
   	
   	//Check if we have neccesary information to make the request.
    if(parameterExample !== undefined){
    
      //Create new record for your basic model
      var basicObjctModel = new basicModel({
        stringfield       : parameterExampleString  || "", 
        numberfield       : parameterExampleNumber  || 0, 
        arrayfield        : parameterExampleArray   || []
      });

      //Save the new model object to the database with mongoose
      basicObjctModel.save(function(error, saved){

          //Check for errors
          if (error) {

              //Respond with error.
              console.log("Error saving: ", error); // For log tail on heroku
              response.send({
                   code : 500,
                   msg  : 'Error saving: '+ error
              });
              response.end();

          }else{

              //Respond with all good
              console.log("Object saved:  ", saved); // For log tail on heroku
              response.send({
                   code : 200,
                   msg  : 'Object saved'
              });
              response.end();

          }// Ends if (error) {

      });

    } else {

    	//We have not enough information, return
    	console.log("Not enought data to make the post request:", generalParameters);
    	response.send({
    		code  : 500, 
    		'msg' : 'Not enough information to make post request'
    	}).end();

    }//Ends check for the neccesary information

  }); // Ends app.post

  //Update information
  app.put('/putpath', function(request, response){

    //Get the Parameters of the post
    var generalParameters     = request.body;
    var parameterFindExample  = generalParameters["keyofparameterfind"] // For example the id of the element to find and update
    var parameterSetExample   = generalParameters["keyofparameterset"]  // For example the new string value of a field

    //For tail logs.
    console.log("New update request", generalParameters);
    
    //Check if we have neccesary information to make the request.
    if(parameterExample !== undefined){

      //Find the element to update based on the parameter passed by
      basicModel.findOneAndUpdate({ "key": parameterFindExample}, 
        { $set : {
                  stringfield       : parameterSetExample || "" 
        } 
      }, function(error, updatedElement){

          //Check for errors
          if (error) {

              //Respond with error.
              console.log("Error updating: ", error); // For log tail on heroku
              response.send({
                   code : 500,
                   msg  : 'Error updating: '+ error
              });
              response.end();

          }else{

              //Respond with all good
              console.log("Object updated:  ", updatedElement); // For log tail on heroku
              response.send({
                   code : 200,
                   msg  : 'Object updated'
              });
              response.end();

          }// Ends if (error) {

      });// Ends basicModel.findOneAndUpdate


    } else {

      //We have not enough information, return
      console.log("Not enought data to make the update request:", generalParameters);
      response.send({
        code  : 500, 
        'msg' : 'Not enough information to make update request'
      }).end();

    }// Ends if(parameterExample !== undefined){

  }); // Ends app.put

  //Delete object in the database
  //*** For this i will recommend extra checks like user loged in, session handler, etc, but i just kept it simple.
  app.delete('/deletepath', function(request, response){


    //Get the Parameters of the post
    var generalParameters     = request.body;
    var parameterFindExample  = generalParameters["keyofparameterfind"] // For example the id of the element to remove

    //For tail logs.
    console.log("New delere request", generalParameters);
    
    //Check if we have neccesary information to make the request.
    if(parameterExample !== undefined){

      //Find the element to update based on the parameter passed by
      basicModel.remove({ "key": parameterFindExample}, function(error){

          //Check for errors
          if (error) {

              //Respond with error.
              console.log("Error removing: ", error); // For log tail on heroku
              response.send({
                   code : 500,
                   msg  : 'Error removing: '+ error
              });
              response.end();

          }else{

              //Respond with all good
              console.log("Object removed"); // For log tail on heroku
              response.send({
                   code : 200,
                   msg  : 'Object removed'
              });
              response.end();

          }// Ends if (error) {

      });// Ends basicModel.remove


    } else {

      //We have not enough information, return
      console.log("Not enought data to remove an object: ", generalParameters);
      response.send({
        code  : 500, 
        'msg' : 'Not enought data to remove an object'
      }).end();

    }// Ends if(parameterExample !== undefined){

  }); // Ends app.delete

};