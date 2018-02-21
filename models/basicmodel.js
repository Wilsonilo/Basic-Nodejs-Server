//===========================//
//Basic Schema / Model
//===========================//

module.exports = function(mongoose){
    
    // Convenience variable
    var Schema = mongoose.Schema;
    
    // Create Schema (For now let's use simple data, model may change on future for more complex data holding)
    var BasicModel = new Schema({
        stringfield       : String, // Description of what is this field is for.
        numberfield       : Number, // Description of what is this field is for.
        arrayfield        : Array,  // Description of what is this field is for.
    });

    // Before saving the object, execute this function if you want to keep track of the creation of this object.
    // Remember to set "createdAt" and "status" as fields on the Schema.
    /*
    BasicModel.pre('save', function(next){

        // Seconds since 1970
        var currentDateInSecondsSince1970 = Math.floor(new Date().getTime() / 1000);

        // If the first time saving this object (it's being created and not just updated)
        if (this.createdAt) {
            return next();
        }

        // If the object is being created instead of updated, set the createdAt property
        this.createdAt = currentDateInSecondsSince1970;

        this.status = "active"; // Set status as active.

        next(); // Perform the next function in the call stack
    });
    */

    // Set Schema
    //http://mongoosejs.com/docs/api.html#index_Mongoose-model, 3rd parameter is the collection name.
    var basic = mongoose.model('Basic', BasicModel, 'collectionName');

    // Return user back to app.js
    return basic;
};