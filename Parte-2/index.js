let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let mongoose = require( 'mongoose' );
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require( './config' );

let app = express();

let server;

/* Tu código va aquí */
app.post('/api/bookmarks/:id', jsonParser, (req,res) =>{
	
	let id = req.params.id;

	let newId = req.body.id;
	let tituloAdd = req.body.titulo;
	let descripcionAdd = req.body.descripcion;
	let urlAdd = req.body.url;

	let newBookMark ={ 
		id : newId,
		titulo : tituloAdd,
		descripcion : descripcionAdd,
		url : urlAdd
	}
	console.log(id);
	console.log(newId);
	console.log(newBookMark);
	if( newId == undefined){
		res.statusMessage=" Enviar nuevo Id";
		res.status(406).send();
	}
	if( newId != id){
		res.statusMessage=" Deben de coincidir los Ids";
		res.status(409).send();
	}
	if( tituloAdd == undefined && descripcionAdd == undefined && urlAdd == undefined){
		res.statusMessage=" Proporcionar informacion del bookmark";
		res.status(406).send();
	}

	return res.status(200).json(newBookMark);

});

function runServer( port, databaseUrl ){
	return new Promise( (resolve, reject ) => {
		mongoose.connect( databaseUrl, response => {
			if ( response ){
				return reject( response );
			}
			else{
				server = app.listen(port, () => {
					console.log( "App is running on port " + port );
					resolve();
				})
				.on( 'error', err => {
					mongoose.disconnect();
					return reject(err);
				})
			}
		});
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then( () => {
			return new Promise( (resolve, reject) => {
				console.log( 'Closing the server' );
				server.close( err => {
					if ( err ){
						return reject( err );
					}
					else{
						resolve();
					}
				});
			});
		});
}

runServer( PORT, DATABASE_URL );

module.exports = { 
    app, 
    runServer, 
    closeServer 
}