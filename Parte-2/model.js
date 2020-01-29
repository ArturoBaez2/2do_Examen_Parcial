let mongoose = require( 'mongoose' );
let uuid = require( 'uuid' );

mongoose.Promise = global.Promise;

/* Tu código va aquí */
let bookmarksDB = {
	id : { type : uuid.v4()},
	titulo : {type : String },
	descripcion : { type : String },
	url : { type : String }
}

module.exports = {
    
};