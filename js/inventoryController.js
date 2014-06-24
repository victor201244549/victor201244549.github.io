'use strict';

var app = angular.module('BodyApp',[]);
app.config(function($locationProvider,$routeProvider){
	$locationProvider.html5Mode(true);
});

app.config(['$httpProvider',function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];	
}]);

var StoreSelected = null;
var ProductValues = [];

function InventoryCtrl($scope,$http) { 

	$scope.stores = [];
	$scope.products = [];


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
			$scope.products.push(lista[i].get("Product"));
		}
		var sel = document.getElementById('product');
		var amount = 0;
		for(var i = 0; i < $scope.products.length;i++) {
			//alert(i);
			var info = $scope.products[i];	
		    	info.fetch({
				  success: function(info) {	
					  $scope.setTags(info.get("Name"));
				}
			 	});	    	
	    }

		if ($scope.products.length > 0)
			$scope.setProductInfo(0);

	}

	$scope.setTags=function(value)
	{
		console.log(ProductValues);
		if(!(ProductValues.indexOf(value) >= 0))
		{
			console.log(value);
			var sel = document.getElementById('product');
			var opt = document.createElement('option');
			opt.innerHTML = value;
		    opt.value = value;
			sel.appendChild(opt);
			ProductValues.push(value);
		}
	}	

	$scope.setProductInfo = function(index)
	{
		var info = $scope.products[index];
    	info.fetch({
		  success: function(info) {		
		  	$('#name').val(info.get("Name"));
			$('#description').val(info.get("Description"));
			$('#price').val(info.get("Price"));	
			$('#imagenMostrar').attr('src', info.get("Picture").url());		   
		  }
		});		
	}

    $scope.getStores();

    $scope.setStoreSelected = function(index)
    {
    	StoreSelected = $scope.stores[index];
    	ProductValues = [];
    	Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
        var storeID = Parse.Object.extend("StoreInventoryDetail");
	    var query = new Parse.Query(storeID);
	    query.equalTo("Store", StoreSelected);				
		query.find({
			success: function(results) {
				$scope.fillProducts(results);
			}
		});
    }

     $('#store').on("change",function() {
   		$scope.setStoreSelected($(this).prop("selectedIndex")); 
	});

     $('#product').on("change",function() {
   		$scope.setProductInfo($(this).prop("selectedIndex")); 
	});
}


var storeValues = [];
var storesReceived = [];

function InventoryMovementCtrl($scope,$http) { 

	$scope.stores = [];
	$scope.products = [];
	$scope.productsTemp = [];
	$scope.storesReceived = [];


	$scope.fillStoreOptions = function()
	{
		var select = document.getElementById('store');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		var lista = storesReceived;
		$scope.stores = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.stores.push(lista[i]);
		}
		var sel = document.getElementById('store');
		for(var i = 0; i < $scope.stores.length; i++) {
			var info = $scope.stores[i];	
		    	info.fetch({
				  success: function(info) {	
					  $scope.setStoreTags(info.get("Name"));
				}
			 	});		    
		}
		//console.log($scope.stores.length);
		
	}

	$scope.setStoreTags = function(value)
	{		
		if(!(storeValues.indexOf(value) >= 0))
		{
			var sel = document.getElementById('store');
			var opt = document.createElement('option');
			opt.innerHTML = value;
		    opt.value = value;
			sel.appendChild(opt);
			storeValues.push(value);
			if($scope.stores.length>0)
          		$scope.setStoreSelected(0);
		}
	}

	$scope.getStoreIM = function()
	{	
		Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
		var storeIM = Parse.Object.extend("StoreInventoryMovement");
        var query = new Parse.Query(storeIM);
        query.find({
          success: function(storeIM) {

          	$scope.getStores(storeIM);
          	//$scope.fillStoreOptions(store);          	
		},
		 error: function(object, error) {
            alert("error");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
          }		
		});
    };

    $scope.getStores = function(storeIM)
    {
    	//console.log("largo store im");
    	//console.log(storeIM.length);
    	for(var i = 0; i< storeIM.length; i++)
    	{
    		//console.log(storesReceived);    		
    		storesReceived.push(storeIM[i].get("Store"));    		
    	}
    	//console.log("largo received");
    	//console.log(storesReceived.length);
    	$scope.fillStoreOptions();
    }

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
		$scope.productsTemp = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.productsTemp.push(lista[i].get("Product"));
		}
		var sel = document.getElementById('product');
		var amount = 0;
		for(var i = 0; i < $scope.productsTemp.length;i++) {
			//alert(i);
			ProductValues = [];
			var info = $scope.productsTemp[i];	
		    	info.fetch({
				  success: function(info) {	
					  $scope.setTags(info.get("Name"),info);
				}
			 	});	    	
	    }	

	}

	$scope.setTags=function(value,product)
	{
		//console.log(ProductValues);
		if(!(ProductValues.indexOf(value) >= 0))
		{
			//console.log(value);
			var sel = document.getElementById('product');
			var opt = document.createElement('option');
			opt.innerHTML = value;
		    opt.value = value;
			sel.appendChild(opt);
			ProductValues.push(value);
			$scope.products.push(product);
			if ($scope.products.length > 0)
				$scope.setProductInfo(0);
		}
	}

	
	$scope.setProductInfo = function(index)
	{

		var storeIM = Parse.Object.extend("StoreInventoryMovement");
	    var query = new Parse.Query(storeIM);
	    query.equalTo("Store", StoreSelected);	    
	    query.equalTo("Product", $scope.products[index]);
	    query.equalTo("Type","Salida");				
		query.find({
			success: function(results) {
				//console.log(results);
				//$scope.fillProducts(results);
				//console.log(results.length);
				//$('#salidas').val(results.length);
				$scope.setOutputAmount(results,results.length);
			}
		});	

		var query = new Parse.Query(storeIM);
	    query.equalTo("Store", StoreSelected);	  
	    query.equalTo("Product", $scope.products[index]);
	    query.equalTo("Type","Entrada");				
		query.find({
			success: function(results) {
				//console.log(results);
				//$scope.fillProducts(results);
				//console.log(results.length);
				//$('#entradas').val(results.length);
				$scope.setInputAmount(results,results.length);
			}
		});	

		/*var info = $scope.products[index];
    	info.fetch({
		  success: function(info) {		
		  	$('#name').val(info.get("Name"));
			$('#description').val(info.get("Description"));
			$('#price').val(info.get("Price"));	
			$('#imagenMostrar').attr('src', info.get("Picture").url());		   
		  }
		});	*/	
	}

	$scope.setInputAmount = function(storeIM,input)
	{
		var amount = 0;
		for(var i=0;i<storeIM.length;i++)
		{
			amount+=storeIM[i].get("Amount")-1
		}
		$('#entradas').val(amount+input);
	}

	$scope.setOutputAmount = function(storeIM,input)
	{
		var amount = 0;
		for(var i=0;i<storeIM.length;i++)
		{
			amount+=storeIM[i].get("Amount")-1
		}
		$('#salidas').val(amount+input);
	}

    $scope.getStoreIM();

    $scope.setStoreSelected = function(index)
    {
    	StoreSelected = storeValues[index];
    	ProductValues = [];
    	Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
        var store = Parse.Object.extend("Store");
	    var query = new Parse.Query(store);
	    //console.log(storeValues.length);
	    query.equalTo("Name", StoreSelected);				
		query.find({
			success: function(results) {
				StoreSelected = results[0];
				$scope.getProducts();
			}
		});
    }

    $scope.getProducts = function()
    {
    	Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
    	var storeIM = Parse.Object.extend("StoreInventoryMovement");
	    var query = new Parse.Query(storeIM);
	    query.equalTo("Store", StoreSelected);				
		query.find({
			success: function(results) {
				//console.log(results);
				$scope.fillProducts(results);
			}
		});	
    }

     $('#store').on("change",function() {
   		$scope.setStoreSelected($(this).prop("selectedIndex")); 
	});

     $('#product').on("change",function() {
   		$scope.setProductInfo($(this).prop("selectedIndex")); 
	});
}