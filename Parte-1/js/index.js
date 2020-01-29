function fetchPaises(pais){
	let url = "https://restcountries.eu/rest/v2/name/" + pais;

	$.ajax({
		url : url,
		method : 'GET',
		success : function( responseJSON ){
			displayPais( responseJSON );
			console.log( responseJSON );
		},
		error : function ( error){
			console.log( error );
			displayPais();
		}
	})
}

function displayPais( responseJSON ){
/*
i. Nombre del país
ii. Capital
iii. Imagen de su bandera
iv. Población
v. Región
vi. Zonas horarias
vii. Países con los que colinda
*/
	if(responseJSON == undefined){
		$('.js-search-results')[0].innerHTML="<fieldset><p> Pais no existente</p> </fieldset>";
	}
	$('.js-search-results')[0].innerHTML="<fieldset><p>Pais: "+  responseJSON[0].name + "</p> <p>Capital: "+ responseJSON[0].capital + " </p> <img src="+  responseJSON[0].flag + " size=100px/> <p>Poblacion: "+  responseJSON[0].population + "</p> <p>Region: "+  responseJSON[0].region + "</p> <p>Zonas horarias: "+  responseJSON[0].timezones[0] + ", "+  responseJSON[0].timezones[1] +  ", "+  responseJSON[0].timezones[2] + "</p> <p>Paises colindantes: " +  responseJSON[0].borders[0] +" ," +  responseJSON[0].borders[1] +" , "+  responseJSON[0].borders[2] + " </p></fieldset>";

}
function watchForm(){
	//console.log("LMAO");
	$('.js-search-form').submit( (event) => {
		event.preventDefault();
		let pais = $('#query')[0].value;
		fetchPaises(pais);
		//console.log("LeL");
	});
}

function init(){
	watchForm();
}

$(init);