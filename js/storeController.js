'use strict';

var app = angular.module('BodyApp',[]);
app.config(function($locationProvider,$routeProvider){
	$locationProvider.html5Mode(true);
});

app.config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];	
}]);


var StoretoEdit = null;

function StoreEditCtrl($scope,$http) {   

	$scope.stores = [];


	$scope.fillStoreOptions = function(data)
	{
		var select = document.getElementById('store');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		//alert("Fill player");
		var lista = data;
		$scope.stores = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.stores.push(lista[i]);
		}
		var sel = document.getElementById('store');
		for(var i = 0; i < $scope.stores.length; i++) {
		    var opt = document.createElement('option');
		    opt.innerHTML = $scope.stores[i].get("Name");
		    opt.value = $scope.stores[i].get("Name");
		    sel.appendChild(opt);
		}
	}

	$scope.getStores = function()
	{	
		Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
		var store = Parse.Object.extend("Store");
        var query = new Parse.Query(store);
        query.find({
          success: function(store) {

          	$scope.fillStoreOptions(store);
          	if($scope.stores.length>0)
          		$scope.getStoreData(0);

		},
		 error: function(object, error) {
            alert("error");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
          }		
		});
    };

    $scope.getStoreData = function(index)
    {
    	$('#name').val($scope.stores[index].get("Name"));
    	var address = $scope.stores[index].get("Address");
    	address.fetch({
		  success: function(address) {
		    var city = address.get("City");
		    $('#city').val(city);
		    $('#address_line1').val(address.get('AddressLine1'));
		    $('#address_line2').val(address.get('AddressLine2'));
		    $('#province').val(address.get('StateProvinceRegion'));		
		    $('#zipCode').val(address.get('ZipPostalCode'));
		    $('#country').val(address.get('Country'));	
		  }
		});
		StoretoEdit = $scope.stores[index];
   }

    $scope.getStores();

    $('#store').on("change",function() {
   		$scope.getStoreData($(this).prop("selectedIndex")); 
	});
}

$(function() {
      $("#agregarTienda").click( function()
           {

           	if ($("#name").val().length>0 && $("#address_line1").val().length>0 &&
           	 	$("#address_line2").val().length>0 && $("#city").val().length>0 && $("#province").val().length>0 && $("#country").val().length>0)   
           	{        	 	
	            Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
	            var Stores = Parse.Object.extend("Store");
	            var store = new Stores();
	            var StoreInventory = Parse.Object.extend("StoreInventory");
	            var storeI = new StoreInventory();
	            var StoreInventoryDetail = Parse.Object.extend("StoreInventoryDetail");
	            var storeID = new StoreInventoryDetail();
	            var StoreInventoryMovement = Parse.Object.extend("StoreInventoryMovement");
	            var storeIM = new StoreInventoryMovement();
	            storeI.set("StoreInventoryMovements",storeIM);
	            storeI.set("StoreInventoryDetails",storeID);
	            store.set("StoreInventory",storeI);
	            store.set("Name",$("#name").val());
	          	var Address = Parse.Object.extend("Address");
	          	var storeAddress = new Address();
	          	storeAddress.set("AddressLine1",$("#address_line1").val());
	          	storeAddress.set("AddressLine2",$("#address_line2").val());
	          	storeAddress.set("City",$("#city").val());
	          	storeAddress.set("StateProvinceRegion",$("#province").val());
	          	storeAddress.set("ZipPostalCode",$("#zipCode").val());
	          	storeAddress.set("Country",$("#country").val());
	          	store.set("Address",storeAddress);
	            store.save(null, {
	              success: function(store) {
	                // Execute any logic that should take place after the object is saved.
	                alert("Se han guardado los datos");
	              },
	              error: function(store, error) {
	                // Execute any logic that should take place if the save fails.
	                // error is a Parse.Error with an error code and description.
	                alert('Failed to create new object, with error code: ' + error.description);
	              }
	            });         
	        }

	        else alert("Es necesario llenar todos los campos")

	       }
      );
});


$(function() {
      $("#editarTienda").click( function()
           {

           	if ($("#name").val().length>0 && $("#address_line1").val().length>0 &&
           	 	$("#address_line2").val().length>0 && $("#city").val().length>0 && $("#province").val().length>0 && $("#country").val().length>0)   
           	{        	 	
	            Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
	            var store = StoretoEdit;
	            store.set("Name",$("#name").val());
	          	var Address = Parse.Object.extend("Address");
	          	var storeAddress = new Address();
	          	storeAddress.set("AddressLine1",$("#address_line1").val());
	          	storeAddress.set("AddressLine2",$("#address_line2").val());
	          	storeAddress.set("City",$("#city").val());
	          	storeAddress.set("StateProvinceRegion",$("#province").val());
	          	storeAddress.set("ZipPostalCode",$("#zipCode").val());
	          	storeAddress.set("Country",$("#country").val());
	          	store.set("Address",storeAddress);
	            store.save(null, {
	              success: function(store) {
	                // Execute any logic that should take place after the object is saved.
	                alert("Se han guardado los datos");
	                window.location.href = window.location
	              },
	              error: function(store, error) {
	                // Execute any logic that should take place if the save fails.
	                // error is a Parse.Error with an error code and description.
	                alert('Failed to create new object, with error code: ' + error.description);
	              }
	            });

			//

	        }

	        else alert("Es necesario llenar todos los campos")

	       }
      );
});

$(function() {
      $("#borrarTienda").click( function()
           {           	      	 	
	           Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
	           var store = StoretoEdit;
	           store.destroy({
			  success: function(store) {
			    // The object was deleted from the Parse Cloud.
			    alert("La tienda fue borrada con exito");
			    window.location.href = window.location

			  },
			  error: function(store, error) {
			    // The delete failed.
			    alert("Hubo un error, intentelo de nuevo");
			    // error is a Parse.Error with an error code and description.
			  }
			});

			//      
	       }
      );
});
