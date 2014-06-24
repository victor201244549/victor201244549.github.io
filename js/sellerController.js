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
var SellertoEdit = null;

function SellerCtrl($scope,$http) {   

	$scope.stores = [];
	$scope.sellers = [];

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
		StoretoEdit = $scope.stores[index];
		$scope.getSellersStore($scope.stores[index]);
   	}

   	$scope.fillSellers = function(data)
	{
		var select = document.getElementById('seller');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		//alert("Fill player");
		var lista = data;
		$scope.sellers = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.sellers.push(lista[i]);
		}
		var sel = document.getElementById('seller');
		for(var i = 0; i < $scope.sellers.length; i++) {
		    var opt = document.createElement('option');
		    opt.innerHTML = $scope.sellers[i].get("Name");
		    opt.value = $scope.sellers[i].get("Name");
		    sel.appendChild(opt);
		}

		if ($scope.sellers.length > 0)
			$scope.setSellerInfo(0);
	}	

	$scope.setSellerInfo = function(index)
	{
		$('#name').val($scope.sellers[index].get("Name"));
    	var contact = $scope.sellers[index].get("ContactInfo");
    	contact.fetch({
		  success: function(contact) {
		    $('#email').val(contact.get("Email"));
		    $('#housephone').val(contact.get('HousePhone'));
		    $('#workphone').val(contact.get('WorkPhone'));
		    $('#cellphone').val(contact.get('CellPhone'));		    
		  }
		});
		SellertoEdit = $scope.sellers[index];
	}

   	$scope.getSellersStore = function(store)
   	{
   		var Seller = Parse.Object.extend("Seller");
		var query = new Parse.Query(Seller);
		query.equalTo("Store", StoretoEdit);
		query.find({
		  success: function(results) {
		    $scope.fillSellers(results);
		  },
		  error: function(error) {
		    alert("Error: " + error.code + " " + error.message);
		  }
		});
   	}

    $scope.getStores();

    $('#store').on("change",function() {
   		$scope.getStoreData($(this).prop("selectedIndex")); 
	});

	$('#seller').on("change",function() {
   		$scope.setSellerInfo($(this).prop("selectedIndex")); 
	});
}

$(function() {
      $("#agregarVendedor").click( function()
           {

           	if ($("#name").val().length>0 && $("#email").val().length>0 &&
           	 	$("#housephone").val().length>0 && $("#workphone").val().length>0 && $("#cellphone").val().length>0)   
           	{        	 	
	            Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");	           
	          	var Seller = Parse.Object.extend("Seller");
	          	var seller = new Seller();
	          	seller.set("Name",$("#name").val());
	          	var Contact = Parse.Object.extend("ContactInfo");
	          	var contact = new Contact();
	          	contact.set("Email",$("#email").val());
	          	contact.set("HousePhone",$("#housephone").val());
	          	contact.set("WorkPhone",$("#workphone").val());
	          	contact.set("CellPhone",$("#cellphone").val());
	          	seller.set("ContactInfo",contact);
	          	seller.set("Store",StoretoEdit);
	            seller.save(null, {
	              success: function(seller) {
	                // Execute any logic that should take place after the object is saved.
	                alert("Se han guardado los datos");
	                window.location.href = window.location
	              },
	              error: function(seller, error) {
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
      $("#editarVendedor").click( function()
           {

           	if ($("#name").val().length>0 && $("#email").val().length>0 &&
           	 	$("#housephone").val().length>0 && $("#workphone").val().length>0 && $("#cellphone").val().length>0)   
           	{        	 	
	            Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");	           
	          	var seller = SellertoEdit;
	          	seller.set("Name",$("#name").val());
	          	var Contact = Parse.Object.extend("ContactInfo");
	          	var contact = new Contact();
	          	contact.set("Email",$("#email").val());
	          	contact.set("HousePhone",$("#housephone").val());
	          	contact.set("WorkPhone",$("#workphone").val());
	          	contact.set("CellPhone",$("#cellphone").val());
	          	seller.set("ContactInfo",contact);
	          	seller.set("Store",StoretoEdit);
	            seller.save(null, {
	              success: function(seller) {
	                // Execute any logic that should take place after the object is saved.
	                alert("Se han guardado los datos");
	                window.location.href = window.location
	              },
	              error: function(seller, error) {
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
      $("#borrarVendedor").click( function()
           {

           	   Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");	           
	          	var seller = SellertoEdit;
	          	 seller.destroy({
				  success: function(store) {
				    // The object was deleted from the Parse Cloud.
				    alert("El vendedor fue borrado con exito");
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