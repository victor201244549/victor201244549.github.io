 /*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

$(function() {
      $("#boton").click( function()
           {
            Parse.initialize("cFtZ5PJlT8L5PXpzwWS86tm4aM9LB4R1DchEH819","VvG5BztDUH9YprDLgL41NRvGFG3JTCJD0fkU7hN4");
            var Equipos = Parse.Object.extend("Teams2");
            var equipo = new Equipos();
            equipo.set("Nombre",$("#nombre").val());
            equipo.set("Escudo",$("#escudo").val());
            equipo.set("Campeonatos",$("#campeonatos").val());
            equipo.set("Descripcion",$("#descripcion").val());
            equipo.save(null, {
              success: function(equipo) {
                // Execute any logic that should take place after the object is saved.
                alert("Se han guardado los datos");
              },
              error: function(equipo, error) {
                // Execute any logic that should take place if the save fails.
                // error is a Parse.Error with an error code and description.
                alert('Failed to create new object, with error code: ' + error.description);
              }
            });             
           }
      );
});



function FigureCtrl($scope, $http, $timeout) {

    $scope.agregarFigura = function()
    {
        alert("HOLA");
    }
}


var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        

    },
    // Bind Event Listeners
    //      
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    ddf: function()
    {
        Parse.initialize("cFtZ5PJlT8L5PXpzwWS86tm4aM9LB4R1DchEH819","VvG5BztDUH9YprDLgL41NRvGFG3JTCJD0fkU7hN4");
        var team = Parse.Object.extend("Teams2");
        var query = new Parse.Query(team);
        query.find({
          success: function(team) {
            for(var i = 0 ; i < team.length ; i++)
            {
                var contenedor=$('<div></div>');
                contenedor.attr('class','jumbotron');
                var nombre=$('<h2></h2>');
                nombre.text(team[i].get("Nombre"));
                var desc=$('<h3></h3>');
                desc.text(team[i].get("Descripcion"));
                var imagen =$('<img></img>');
                imagen.attr('src',team[i].get("Escudo"));
                imagen.attr('width',"100");
                imagen.attr('height',"100");
               

                contenedor.append(nombre);
                contenedor.append(desc);
                contenedor.append(imagen);
                var centro  =$('<center></center>');
                contenedor.attr('style','background-color:#FFFFFF');
                centro.append(contenedor);
                $("#display").append(centro);
            }     
            // The object was retrieved successfully.
          },
          error: function(object, error) {
            alert("dd")
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
          }
        });

        
    },

    clicked: function(click_id)
    {
        alert(click_id);
    }
};
