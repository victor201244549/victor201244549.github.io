/**
 *
 * Responsive website using AngularJS
 * http://www.script-tutorials.com/responsive-website-using-angularjs/
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Script Tutorials
 * http://www.script-tutorials.com/
 */

'use strict';

var app = angular.module('BodyApp',[]);
app.config(function($locationProvider,$routeProvider){
	$locationProvider.html5Mode(true);
});

app.config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];	
}]);

var lastTeam = "";

// optional controllers
function HomeCtrl($scope, $http) {

	$scope.registro = function()
	{
		alert($scope.nombre);
	};

}

function TeamCtrl($scope,$http) {   

    $scope.equipos = [];   
    $scope.jugadores = [];

  	$scope.fillTeams = function(data)
	{
		var lista = data.team;
		for(var i=0;i<lista.length;i++)
		{
			$scope.equipos.push(lista[i].name);
		}
		if ($scope.equipos.length>0)
		{
			$scope.getPlayerPerTeam($scope.equipos[0]);
		}		
	}

	$scope.fillPlayers = function(data)
	{
		var select = document.getElementById('jugador');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		//alert("Fill player");
		var lista = data.player;
		$scope.jugadores = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.jugadores.push(lista[i].name);
		}
		var sel = document.getElementById('jugador');
		for(var i = 0; i < $scope.jugadores.length; i++) {
		    var opt = document.createElement('option');
		    opt.innerHTML = $scope.jugadores[i];
		    opt.value = $scope.jugadores[i];
		    sel.appendChild(opt);
		}
	}

  	$scope.getTeams = function()
	{	
		var url = 'http://tranquil-earth-6141.herokuapp.com/teams';
		var method = 'GET';
		$http({
			method: method, 
			url: url, 
		}).
		success(function(data,status)
		{			
			$scope.fillTeams(data);
		}).
		error(function(data,status)
		{
			$scope.datos = data || "Request Failed";
		});
		
	};	

	$scope.getPlayerPerTeam = function(pTeam)
	{	
		//alert(pTeam);
		var url = 'http://tranquil-earth-6141.herokuapp.com/playersTeam';
		var method = 'GET';
		var formData = {
				"team": pTeam,				
		};

		$.ajax({
				   url : url,
				   type: "GET",
				   data : formData,
				   success: function(data, textStatus, jqXHR)
			    {
			    	$scope.fillPlayers(data);			        
			    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		alert("error");
				    }
				}); 
	};	

	
	$scope.getTeams();	

	$('#team').on("change",function() {
   		$scope.getPlayerPerTeam($(this).val());
	});
}

function UserCtrl($scope,$http) {   

    $scope.usuarios = [];

    $scope.fillUsersOptions = function(data)
	{
		var select = document.getElementById('selUsuario');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		//alert("Fill player");
		var lista = data.user;
		$scope.usuarios = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.usuarios.push(lista[i].email);
		}
		var sel = document.getElementById('selUsuario');
		for(var i = 0; i < $scope.usuarios.length; i++) {
		    var opt = document.createElement('option');
		    opt.innerHTML = $scope.usuarios[i];
		    opt.value = $scope.usuarios[i];
		    sel.appendChild(opt);
		}
	}

  	$scope.fillUsers = function(data)
	{
		var lista = data.user;
		alert(lista.length);
		for(var i=0;i<lista.length;i++)
		{
			$scope.usuarios.push(lista[i].email);
		}		
	}	

  	$scope.getUsers = function()
	{	
		var url = 'http://tranquil-earth-6141.herokuapp.com/admin/obtenerUsuarios';
		var method = 'GET';
		var formData = {
				"clave": "clave",				
		};
		$.ajax({
				   url : url,
				   type: "GET",
				   data : formData,
				   success: function(data, textStatus, jqXHR)
			    {
			    	$scope.fillUsersOptions(data);			        
			    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		alert("error");
				    }
				}); 
	};		
	$scope.getUsers();		
}

function LeagueCtrl($scope,$http) {   

    $scope.ligas = [];

    $scope.fillLeaguesOptions = function(data)
	{
		var select = document.getElementById('selLigas');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		//alert("Fill player");
		var lista = data.liga;
		$scope.ligas = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.ligas.push(lista[i].name);
		}
		var sel = document.getElementById('selLigas');
		for(var i = 0; i < $scope.ligas.length; i++) {
		    var opt = document.createElement('option');
		    opt.innerHTML = $scope.ligas[i];
		    opt.value = $scope.ligas[i];
		    sel.appendChild(opt);
		}
	}
  
  	$scope.getLeagues = function()
	{	
		var url = 'http://tranquil-earth-6141.herokuapp.com/admin/ligas';
		var method = 'GET';
		var formData = {
				"clave": "clave",				
		};
		$.ajax({
				   url : url,
				   type: "GET",
				   data : formData,
				   success: function(data, textStatus, jqXHR)
			    {
			    	$scope.fillLeaguesOptions(data);			        
			    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		alert("error");
				    }
				}); 
	};		
	$scope.getLeagues();		
}

function FixtureCtrl($scope,$http) {   

    $scope.fechas = [];

    $scope.fillFixturesOptions = function(data)
	{
		var select = document.getElementById('selFechas');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		var lista = data.fixture;
		$scope.fechas = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.fechas.push(lista[i].number);
		}
		var sel = document.getElementById('selFechas');
		for(var i = 0; i < $scope.fechas.length; i++) {
		    var opt = document.createElement('option');
		    opt.innerHTML = $scope.fechas[i];
		    opt.value = $scope.fechas[i];
		    sel.appendChild(opt);
		}
	}
  
  	$scope.getFixtures = function()
	{	
		var url = 'http://tranquil-earth-6141.herokuapp.com/admin/fechas';
		var method = 'GET';
		var formData = {
				"clave": "clave",				
		};
		$.ajax({
				   url : url,
				   type: "GET",
				   data : formData,
				   success: function(data, textStatus, jqXHR)
			    {
			    	$scope.fillFixturesOptions(data);			        
			    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		alert("error");
				    }
				}); 
	};		
	$scope.getFixtures();		
}


function PlayerCtrl($scope,$http) {   

  	$scope.savePlayer = function()
	{	
		var url = 'http://tranquil-earth-6141.herokuapp.com/teams';
		var method = 'GET';

		$http({
			method: method, 
			url: url, 
		}).
		success(function(data,status)
		{			
			$scope.fillTeams(data);
		}).
		error(function(data,status)
		{
			$scope.datos = data || "Request Failed";
		});
	}		

	$scope.llama = function()
	{
		alert("VICTOR");
	}
}

function MatchCtrl($scope,$http) {   

    $scope.matches = [[]]; 
    $scope.matchInfo = [];  
    $scope.fixtures = [];
    $scope.equipos = []; 
    $scope.fixtureIndex = 0;   

    $scope.fillTeams = function(data)
	{
		var lista = data.team;
		for(var i=0;i<lista.length;i++)
		{
			$scope.equipos.push(lista[i].name);
		}		

		$scope.setTeams(0,0);
	}

	$scope.getTeams = function()
	{	
		var url = 'http://tranquil-earth-6141.herokuapp.com/teams';
		var method = 'GET';
		$http({
			method: method, 
			url: url, 
		}).
		success(function(data,status)
		{			
			$scope.fillTeams(data);
		}).
		error(function(data,status)
		{
			$scope.datos = data || "Request Failed";
		});
		
	};	
 

  	$scope.fillFixtures = function(data)
	{
		var select = document.getElementById('selFechas');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		$scope.fixtures = [];		
		var lista = data.fixture;
		$scope.matches = [];
		$scope.matchInfo = [];
		for(var i=0;i<lista.length;i++)
		{
			$scope.fixtures.push(lista[i].number);
			var fixtureMatch = [];
			for(var j = 0;j<lista[i].matches.length;j++)
			{
				fixtureMatch.push(j+1);
			}
			$scope.matches.push(fixtureMatch);
			$scope.matchInfo.push(lista[i].matches);
		}
		var sel = document.getElementById('selFechas');
		for(var i = 0; i < $scope.fixtures.length; i++) {
		    var opt = document.createElement('option');
		    opt.innerHTML = $scope.fixtures[i];
		    opt.value = $scope.fixtures[i];
		    sel.appendChild(opt);
		}

		if ($scope.matches.length>0)
		{
			if($scope.matches[0].length>0)
			{
				$scope.fillMatches(0);
			}
		}		
	}

	$scope.setTeams = function(pos1,pos2)
	{
		if($scope.matchInfo.length>0)
		{
			if($scope.matchInfo[pos1].length>0)
			{									
					lastTeam = $scope.matchInfo[pos1][pos2].team1;
					$('#score1').val($scope.matchInfo[pos1][pos2].score[0]);
					$('#score2').val($scope.matchInfo[pos1][pos2].score[1]);
					$('#state').val($scope.matchInfo[pos1][pos2].state);		
					if($("#team1").is("select"))
					{
						$('#team1').val($scope.matchInfo[pos1][pos2].team1);
						$('#team2').val($scope.matchInfo[pos1][pos2].team2);
					}
					else
					{
						$('#team1').text($scope.matchInfo[pos1][pos2].team1);
						$('#team2').text($scope.matchInfo[pos1][pos2].team2);
					}				
										
			}
			else {$scope.setNullInfo();}
		}
		else {$scope.setNullInfo();}
	}

	$scope.setNullInfo = function()
	{
		$('#team1').val("");
		$('#team2').val("");
		$('#score1').val("");
		$('#score2').val("");
		$('#state').val("");
	}

	$scope.fillMatches = function(pos)
	{
		var select = document.getElementById('partido');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		var sel = document.getElementById('partido');
		if($scope.matches[pos].length>0)
		{
			for(var i = 0; i < $scope.matches[pos].length; i++) 
			{
			    var opt = document.createElement('option');
			    opt.innerHTML = $scope.matches[pos][i];
			    opt.value = $scope.matches[pos][i];
			    sel.appendChild(opt);
			}
		}
		//$scope.setTeams(pos,0);	
	}

  	$scope.getFixtures = function()
	{	
		var url = 'http://tranquil-earth-6141.herokuapp.com/admin/fechas';
		var method = 'GET';
		var formData = {
				"clave": "clave",				
		};
		$.ajax({
				   url : url,
				   type: "GET",
				   data : formData,
				   success: function(data, textStatus, jqXHR)
			    {
			    	$scope.fillFixtures(data);			        
			    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		alert("error");
				    }
				}); 
	};	

	$scope.getTeams();
	$scope.getFixtures();	

	$('#selFechas').on("change",function() {
		$scope.fixtureIndex =$(this).prop("selectedIndex"); 
   		$scope.fillMatches($(this).prop("selectedIndex"));
   		$scope.setTeams($(this).prop("selectedIndex"),0);	 
	});

	$('#partido').on("change",function() {
   		$scope.setTeams($scope.fixtureIndex,$(this).prop("selectedIndex"));	 
	});
}

$(function() {
      $("#agregarJugador").click( function()
           {
           		var name = $("#name").val();
           		if (name.length > 0)
           		{
           			var password = $("#password").val();
           			var team = $("#team").val();
	           		var position = $("#position").val();
	           		var price = $("#price").val();
	           		var url = 'http://tranquil-earth-6141.herokuapp.com/admin/agregarJugador';
					var method = 'POST';
					var formData = {
						"name": name,
						"clave": password,
						"team": team,
						"position": position,
						"price": price,
					};
	 
				$.ajax({
				    url : url,
				    type: "POST",
				    data : formData,
				    success: function(data, textStatus, jqXHR)
				    {
				    	if(data.result==1)
				    	{
				    		$('#exito').modal();
				    	}
				    	else {$('#errorDatos').modal();}
				        
				    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		$('#error').modal();
				    }
				});          		
			}				  
			else {$('#campos').modal();}
				//var jdata = JSON.stringify(formData);	*/	
});
  });

$(function() {
      $("#borrarJugador").click( function()
           {

           		var team = $("#team").val();
           		var name = $("#jugador").val();
           		var password = $("#password").val();
               	var url = 'http://tranquil-earth-6141.herokuapp.com/admin/borrarJugador';
				var method = 'POST';
				var formData = {
					"name": name,
					"clave": password,
					"team": team,					
				};	 
				$.ajax({
				    url : url,
				    type: "POST",
				    data : formData,
				    success: function(data, textStatus, jqXHR)
				    {
				    	if(data.result==1)
				    	{
				    		$('#exito').modal();
				    	}
				    	else {$('#errorDatos').modal();}
				        
				    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		$('#error').modal();
				    }
				});	  
				//var jdata = JSON.stringify(formData);	*/	
	});
});

$(function() {
      $("#editarJugador").click( function()
           {
           			var name = $("#jugador").val();
           			var password = $("#password").val();
           			var team = $("#team").val();
	           		var position = $("#position").val();
	           		var price = $("#price").val();
	           		var url = 'http://tranquil-earth-6141.herokuapp.com/admin/editarJugador';
					var method = 'POST';
					var formData = {
						"name": name,
						"clave": password,
						"team": team,
						"position": position,
						"price": price,
					};
	 
				$.ajax({
				    url : url,
				    type: "POST",
				    data : formData,
				    success: function(data, textStatus, jqXHR)
				    {
				    	if(data.result==1)
				    	{
				    		$('#exito').modal();
				    	}
				    	else {$('#errorDatos').modal();}
				        
				    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		$('#error').modal();
				    }
				});			
});
  });


$(function() {
      $("#registrarUsuario").click( function()
           {
           		var email = $("#email").val();
           		var country = $("#country").val();
           		var userpassword = $("#userpassword").val();
           		var userpassword2 = $("#userpassword2").val();
           		var password = $("#password").val();
           		if(email.length==0 || country.length==0 || userpassword==0 || userpassword2==0 || password==0)
           		{
           			$('#campos').modal();
           		}
           		else if(userpassword==userpassword2)
           		{
           			var url = 'http://tranquil-earth-6141.herokuapp.com/admin/registrarUsuario';
					var method = 'POST';
					var formData = {
						"email": email,
						"country": country,
						"password": userpassword,
						"clave" :password,					
					};	 
					$.ajax({
					    url : url,
					    type: "POST",
					    data : formData,
					    success: function(data, textStatus, jqXHR)
					    {
					    	if(data.result==1)
					    	{
					    		$('#exito').modal();
					    	}
					    	else {$('#errorDatos').modal();}
					        
					    },
					    error: function (jqXHR, textStatus, errorThrown)
					    {
					 		$('#error').modal();
					    }
					});	 
           		}
           		else {$('#passwords').modal();};

               	/* 
				//var jdata = JSON.stringify(formData);	*/	
	});
});

$(function() {
      $("#borrarUsuario").click( function()
           {           		
           		var usuario = $("#selUsuario").val();
           		var password = $("#password").val();
               	var url = 'http://tranquil-earth-6141.herokuapp.com/admin/borrarUsuario';
				var method = 'POST';
				var formData = {
					"email": usuario,
					"clave": password,
				};	 
				$.ajax({
				    url : url,
				    type: "POST",
				    data : formData,
				    success: function(data, textStatus, jqXHR)
				    {
				    	if(data.result==1)
				    	{
				    		$('#exito').modal();
				    	}
				    	else {$('#errorDatos').modal();}				        
				    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		$('#error').modal();
				    }
				});	  
				//var jdata = JSON.stringify(formData);	*/	
	});
});


$(function() {
      $("#agregarEquipo").click( function()
           {           		
           		var abreviation = $("#abreviation").val();
           		var password = $("#password").val();
           		var name = $("#name").val();
               	var url = 'http://tranquil-earth-6141.herokuapp.com/admin/agregarEquipo';
				var method = 'POST';
				var formData = {
					"name": name,
					"clave": password,
					"abreviation":abreviation,
				};	 
				$.ajax({
				    url : url,
				    type: "POST",
				    data : formData,
				    success: function(data, textStatus, jqXHR)
				    {
				    	if(data.result==1)
				    	{
				    		$('#exito').modal();
				    	}
				    	else {$('#errorDatos').modal();}				        
				    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		$('#error').modal();
				    }
				});	  
				//var jdata = JSON.stringify(formData);	*/	
	});
});

$(function() {
      $("#borrarEquipo").click( function()
           {           		
           		
           		var password = $("#password").val();
           		var name = $("#team").val();
               	var url = 'http://tranquil-earth-6141.herokuapp.com/admin/borrarEquipo';
				var method = 'POST';
				var formData = {
					"name": name,
					"clave": password,
				};	 
				$.ajax({
				    url : url,
				    type: "POST",
				    data : formData,
				    success: function(data, textStatus, jqXHR)
				    {
				    	if(data.result==1)
				    	{
				    		$('#exito').modal();
				    	}
				    	else {$('#errorDatos').modal();}				        
				    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		$('#error').modal();
				    }
				});	  
				//var jdata = JSON.stringify(formData);	*/	
	});
});

$(function() {
      $("#borrarFantasy").click( function()
           {           		
           		
           		var password = $("#password").val();
           		var name = $("#selUsuario").val();
               	var url = 'http://tranquil-earth-6141.herokuapp.com/admin/borrarFantasy';
				var method = 'POST';
				var formData = {
					"name": name,
					"clave": password,
				};	 
				$.ajax({
				    url : url,
				    type: "POST",
				    data : formData,
				    success: function(data, textStatus, jqXHR)
				    {
				    	if(data.result==1)
				    	{
				    		$('#exito').modal();
				    	}
				    	else {$('#errorDatos').modal();}				        
				    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		$('#error').modal();
				    }
				});	  
				//var jdata = JSON.stringify(formData);	*/	
	});
});


$(function() {
      $("#borrarLiga").click( function()
           {           		
           		
           		var password = $("#password").val();
           		var name = $("#selLigas").val();
               	var url = 'http://tranquil-earth-6141.herokuapp.com/admin/borrarLiga';
				var method = 'POST';
				var formData = {
					"name": name,
					"clave": password,
				};	 
				$.ajax({
				    url : url,
				    type: "POST",
				    data : formData,
				    success: function(data, textStatus, jqXHR)
				    {
				    	if(data.result==1)
				    	{
				    		$('#exito').modal();
				    	}
				    	else {$('#errorDatos').modal();}				        
				    },
				    error: function (jqXHR, textStatus, errorThrown)
				    {
				 		$('#error').modal();
				    }
				});	  
				//var jdata = JSON.stringify(formData);	*/	
	});
});

$(function() {
      $("#agregarFecha").click( function()
           {           		
           		
           		var password = $("#password").val();
           		var number = $("#numeroFecha").val();
           		if (number != "") 
           		{
	           		var estado = $("#state").val();
	               	var url = 'http://tranquil-earth-6141.herokuapp.com/admin/agregarFecha';
					var method = 'POST';
					var formData = {
						"number": number,
						"clave": password,
						"state": estado,
					};	 
					$.ajax({
					    url : url,
					    type: "POST",
					    data : formData,
					    success: function(data, textStatus, jqXHR)
					    {
					    	if(data.result==1)
					    	{
					    		$('#exito').modal();
					    	}
					    	else if (data.result == 2) {$('#errorDatos').modal();}	

					    	else {$('#yaExiste').modal();}	
					    },
					    error: function (jqXHR, textStatus, errorThrown)
					    {
					 		$('#error').modal();
					    }
					});	  
				}
				else {$('#errorDatos').modal();}
				//var jdata = JSON.stringify(formData);	
	});
});

$(function() {
      $("#editarFecha").click( function()
           {           		
           		
           		var password = $("#password").val();
           		var number = $("#selFechas").val();
           		if (number != "") 
           		{
	           		var estado = $("#state").val();
	               	var url = 'http://tranquil-earth-6141.herokuapp.com/admin/editarFecha';
					var method = 'POST';
					var formData = {
						"number": number,
						"clave": password,
						"state": estado,
					};	 
					$.ajax({
					    url : url,
					    type: "POST",
					    data : formData,
					    success: function(data, textStatus, jqXHR)
					    {
					    	if(data.result==1)
					    	{
					    		$('#exito').modal();
					    	}
					    	else {$('#errorDatos').modal();}					    	
					    },
					    error: function (jqXHR, textStatus, errorThrown)
					    {
					 		$('#error').modal();
					    }
					});	  
				}
				else {$('#errorDatos').modal();}
				//var jdata = JSON.stringify(formData);	
	});
});

$(function() {
      $("#borrarFecha").click( function()
           {           		
           		
           		var password = $("#password").val();
           		var number = $("#selFechas").val();
           		if (number != "") 
           		{
	               	var url = 'http://tranquil-earth-6141.herokuapp.com/admin/borrarFecha';
					var method = 'POST';
					var formData = {
						"number": number,
						"clave": password,
					};	 
					$.ajax({
					    url : url,
					    type: "POST",
					    data : formData,
					    success: function(data, textStatus, jqXHR)
					    {
					    	if(data.result==1)
					    	{
					    		$('#exito').modal();
					    	}
					    	else {$('#errorDatos').modal();}					    	
					    },
					    error: function (jqXHR, textStatus, errorThrown)
					    {
					 		$('#error').modal();
					    }
					});	  
				}
				else {$('#errorDatos').modal();}
				//var jdata = JSON.stringify(formData);	
	});
});

$(function() {
      $("#agregarPartido").click( function()
           {           		
           		
           		var password = $("#password").val();
           		var score1 = $("#score1").val();
           		var score2 = $("#score2").val();
           		var team1= $("#team1").val();
           		var team2  = $("#team2").val();
           		if (score1 != "" && score2 != "" && team1!=team2) 
           		{
           			
           			var state = $("#state").val();
           			var numberFixture = $("#selFechas").val();
	               	var url = 'http://tranquil-earth-6141.herokuapp.com/admin/agregarPartido';
					var method = 'POST';
					var formData = {
						"team1": team1,
						"team2":team2,
						"score1":score1,
						"score2":score2,
						"state":state,
						"clave": password,
						"numberFixture":numberFixture,
					};	 
					$.ajax({
					    url : url,
					    type: "POST",
					    data : formData,
					    success: function(data, textStatus, jqXHR)
					    {
					    	if(data.result==1)
					    	{
					    		$('#exito').modal();
					    	}
					    	else {$('#errorDatos').modal();}					    	
					    },
					    error: function (jqXHR, textStatus, errorThrown)
					    {
					 		$('#error').modal();
					    }
					});	  
				}
				else {$('#errorDatos').modal();}
				//var jdata = JSON.stringify(formData);	
	});
});

$(function() {
      $("#borrarPartido").click( function()
           {           		
           		
           		var password = $("#password").val();           		
           		var team1= $("#team1").text();          			
           		var numberFixture = $("#selFechas").val();
	            var url = 'http://tranquil-earth-6141.herokuapp.com/admin/borrarPartido';
				var method = 'POST';
				var formData = {
					"team1": team1,						
					"clave": password,
					"numberFixture":numberFixture,
				};	 
				$.ajax({
					  url : url,
					  type: "POST",
					  data : formData,
					   success: function(data, textStatus, jqXHR)
					   {
					    	if(data.result==1)
					    	{
					    		$('#exito').modal();
					    	}
					    	else {$('#errorDatos').modal();}					    	
					    },
					   error: function (jqXHR, textStatus, errorThrown)
					   {
					 	$('#error').modal();
					 }
				});	  
		
	});
});

$(function() {
      $("#editarPartido").click( function()
           {           		
           		
           		var password = $("#password").val();
           		var score1 = $("#score1").val();
           		var score2 = $("#score2").val();
           		var team1= $("#team1").val();
           		var team2  = $("#team2").val();
           		if (score1 != "" && score2 != "" && team1!=team2) 
           		{
           			
           			var state = $("#state").val();
           			var numberFixture = $("#selFechas").val();
	               	var url = 'http://tranquil-earth-6141.herokuapp.com/admin/editarPartido';
					var method = 'POST';
					var formData = {
						"team1": team1,
						"team2":team2,
						"score1":score1,
						"score2":score2,
						"state":state,
						"clave": password,
						"numberFixture":numberFixture,
						"lastTeam":lastTeam,
					};	 
					$.ajax({
					    url : url,
					    type: "POST",
					    data : formData,
					    success: function(data, textStatus, jqXHR)
					    {
					    	if(data.result==1)
					    	{
					    		$('#exito').modal();
					    	}
					    	else {$('#errorDatos').modal();}					    	
					    },
					    error: function (jqXHR, textStatus, errorThrown)
					    {
					 		$('#error').modal();
					    }
					});	  
				}
				else {$('#errorDatos').modal();}
				//var jdata = JSON.stringify(formData);	
	});
});


$(function() {
      $("#agregarEstadisticas").click( function()
           {           		
           		
           		var password = $("#password").val();           		
           		var team= $("#team").val();          			
           		var numberFixture = $("#selFechas").val();
           		var name = $("#jugador").val();
           		var yellows = $("#amarillas").val();
           		var reds = $("#rojas").val();
           		var assists = $("#asistencias").val();
           		var goals = $("#goles").val();
           		var minutos = $("#minutos").val();
           		var points = $("#puntos").val();
	            var url = 'http://tranquil-earth-6141.herokuapp.com/admin/editarEstadisticas';
				var method = 'POST';
				var formData = {
					"team": team,						
					"clave": password,
					"numberFixture":numberFixture,
					"yellows":yellows,
					"reds":reds,
					"name":name,
					"assists":assists,
					"goals":goals,
					"points":points,
					"minutesPlayed":minutos,
				};	 
				$.ajax({
					  url : url,
					  type: "POST",
					  data : formData,
					   success: function(data, textStatus, jqXHR)
					   {
					    	if(data.result==1)
					    	{
					    		$('#exito').modal();
					    	}
					    	else {$('#errorDatos').modal();}					    	
					    },
					   error: function (jqXHR, textStatus, errorThrown)
					   {
					 	$('#error').modal();
					 }
				});				  
		
	});
});

$(function() {
      $("#borrarEstadisticas").click( function()
           {           		
           		
           		var password = $("#password").val();           		
           		var team= $("#team").val();          			
           		var numberFixture = $("#selFechas").val();
           		var name = $("#jugador").val();           		
	            var url = 'http://tranquil-earth-6141.herokuapp.com/admin/borrarEstadisticas';
				var method = 'POST';
				var formData = {
					"team": team,						
					"clave": password,
					"numberFixture":numberFixture,				
					"name":name,			
				};	 
				$.ajax({
					  url : url,
					  type: "POST",
					  data : formData,
					   success: function(data, textStatus, jqXHR)
					   {
					    	if(data.result==1)
					    	{
					    		$('#exito').modal();
					    	}
					    	else {$('#errorDatos').modal();}					    	
					    },
					   error: function (jqXHR, textStatus, errorThrown)
					   {
					 	$('#error').modal();
					 }
				});				  
		
	});
});
/*
*/