'use strict';

var app = angular.module('BodyApp',[]);
app.config(function($locationProvider,$routeProvider){
	$locationProvider.html5Mode(true);
});

app.config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];	
}]);

var FamilySelected = null;
var ProductSelected = null;
var StoreSelected = null;

function ProductStoreCtrl($scope,$http) {   

	$scope.families = [];
	$scope.products = [];

	$scope.fillFamilyOptions = function(data)
	{
		var select = document.getElementById('family');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		//alert("Fill player");
		var lista = data;
		$scope.families = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.families.push(lista[i]);
		}
		var sel = document.getElementById('family');
		for(var i = 0; i < $scope.families.length; i++) {
		    var opt = document.createElement('option');
		    opt.innerHTML = $scope.families[i].get("Name");
		    opt.value = $scope.families[i].get("Name");
		    sel.appendChild(opt);
		}
	}

	$scope.getFamilies = function()
	{	
		Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
		var family = Parse.Object.extend("ProductFamily");
        var query = new Parse.Query(family);
        query.find({
          success: function(family) {
          	$scope.fillFamilyOptions(family);
          	if($scope.families.length>0)
          		$scope.setFamilySelected(0);

		},
		 error: function(object, error) {
            alert("error");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
          }		
		});
    };

    $scope.fillProducts = function(data)
	{
		var select = document.getElementById('product');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		//alert("Fill player");
		var lista = data;
		$scope.products = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.products.push(lista[i]);
		}
		var sel = document.getElementById('product');
		for(var i = 0; i < $scope.products.length; i++) {
		    var opt = document.createElement('option');
		    opt.innerHTML = $scope.products[i].get("Name");
		    opt.value = $scope.products[i].get("Name");
		    sel.appendChild(opt);
		}	
		if ($scope.products.length>0)
    		$scope.setProductSelected(0);	
	}	

    $scope.getProdcutsPerFamily = function(index)
    {
    	Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
    	var product = Parse.Object.extend("Product");
    	var query = new Parse.Query(product);
		query.equalTo("ProductFamily", $scope.families[index]);
		query.find({
		  success: function(products) {
		    // comments now contains the comments for myPost
		    $scope.fillProducts(products);
		  }
		});		
    }

    $scope.setFamilySelected = function(index)
    {
    	FamilySelected = $scope.families[index];
    	$scope.getProdcutsPerFamily(index);    	
    }

    $scope.setProductSelected = function(index)
    {
    	ProductSelected = $scope.products[index];
    }

    $scope.getFamilies();	
    $('#family').on("change",function() {
   		$scope.setFamilySelected($(this).prop("selectedIndex")); 
	}); 

	$('#product').on("change",function() {
   		$scope.setProductSelected($(this).prop("selectedIndex")); 
	});    

}

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
          		$scope.setStoreSelected(0);

		},
		 error: function(object, error) {
            alert("error");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
          }		
		});
    };

    $scope.setStoreSelected = function(index)
    {    	
		StoreSelected = $scope.stores[index];
   	}

    $scope.getStores();

    $('#store').on("change",function() {
   		$scope.setStoreSelected($(this).prop("selectedIndex")); 
	});
}

$(function() {
      $("#agregarProductoTienda").click( function()
           {
           	var amount = $("#amount").val();
				    	if (amount==null)
				    		amount = 0;
			 amount = parseInt(amount);
             Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
             var storeID = Parse.Object.extend("StoreInventoryDetail");
	            var query = new Parse.Query(storeID);
	            query.equalTo("Store", StoreSelected);				
				query.equalTo("Product", ProductSelected);
				query.find({
				  success: function(comments) {
				    // comments now contains the comments for myPost
				    var StoreIM = Parse.Object.extend("StoreInventoryMovement");
	          		var storeIM = new StoreIM();
	          		storeIM.set("Store",StoreSelected);
	          		storeIM.set("Product",ProductSelected);
	          		storeIM.set("Type","Entrada");
	          		storeIM.set("Amount",amount);
	          		storeIM.save(null, {
			              success: function(store) {
			                // Execute any logic that should take place after the object is saved.
			                alert("Se ha hecho un movimiento con este producto");
			              },
			              error: function(store, error) {
			                // Execute any logic that should take place if the save fails.
			                // error is a Parse.Error with an error code and description.
			                alert('Failed to create new object, with error code: ' + error.description);
			              }
			            });
				    if(comments.length>0)
				    {				    	
				    	console.log(amount);
				    	console.log(comments[0].get("ProductAmount"));
				    	console.log(comments[0].get("ProductAmount")+amount);
				    	comments[0].set("ProductAmount",comments[0].get("ProductAmount")+amount);
				    	comments[0].save(null, {
			              success: function(store) {
			                // Execute any logic that should take place after the object is saved.
			                alert("Se agrego un producto mas de este tipo");
			              },
			              error: function(store, error) {
			                // Execute any logic that should take place if the save fails.
			                // error is a Parse.Error with an error code and description.
			                alert('Failed to create new object, with error code: ' + error.description);
			              }
			            });

				    }
				    else
				    {
				    	var StoreID = Parse.Object.extend("StoreInventoryDetail");
				    	var storeID = new StoreID();				    	
	          			storeID.set("Product",ProductSelected);
	          			storeID.set("Store",StoreSelected);
	          			storeID.set("ProductAmount",amount);
			            storeID.save(null, {
			              success: function(store) {
			                // Execute any logic that should take place after the object is saved.
			                alert("Se ha agregado este nuevo producto");
			              },
			              error: function(store, error) {
			                // Execute any logic that should take place if the save fails.
			                // error is a Parse.Error with an error code and description.
			                alert('Failed to create new object, with error code: ' + error.description);
			              }
			            });		            

				    }
				  }
				});    		
	            
	       }
      );
});

$(function() {
      $("#borrarProductoTienda").click( function()
           {

             Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
             var storeID = Parse.Object.extend("StoreInventoryDetail");
	            var query = new Parse.Query(storeID);
	            query.equalTo("Store", StoreSelected);				
				query.equalTo("Product", ProductSelected);
				query.find({
				  success: function(comments) {
				    // comments now contains the comments for myPost
				    if(comments.length>0)
				    {
				    	if(comments[0].get("ProductAmount")==1)
				    	{
				    		comments[0].destroy({
							  success: function(store) {
							    // The object was deleted from the Parse Cloud.
							    alert("Como la cantidad de este producto quedó en cero se eliminó de la tienda");
							    window.location.href = window.location

							  },
							  error: function(store, error) {
							    // The delete failed.
							    alert("Hubo un error, intentelo de nuevo");
							    // error is a Parse.Error with an error code and description.
						  	}
						  });
				    	}
				    	else
				    	{
				    		comments[0].set("ProductAmount",comments[0].get("ProductAmount")-1);
					    	comments[0].save(null, {
				              success: function(store) {
				                // Execute any logic that should take place after the object is saved.
				                alert("Se disminuyó la cantidad este producto");
				              },
				              error: function(store, error) {
				                // Execute any logic that should take place if the save fails.
				                // error is a Parse.Error with an error code and description.
				                alert('Failed to create new object, with error code: ' + error.description);
				              }
				            });
				    	}
				    	
				    }
				    else
				    {
				    	alert("Este producto no existe en esta tienda")

				    }
				  }
				});    		
	            
	       }
      );
});