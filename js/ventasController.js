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
var SellerSelected = null;

function ProductCtrl($scope, $http) {	
	
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
            console.log("Llega aqui");

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

		if ($scope.products.length > 0)
			$scope.setProductInfo(0);
	}	

	$scope.setProductInfo = function(index)
	{
		/*$('#name').val($scope.products[index].get("Name"));
		$('#description').val($scope.products[index].get("Description"));
		$('#price').val($scope.products[index].get("Price"));	
		$('#imagenMostrar').attr('src', $scope.products[index].get("Picture").url());
		ProductSelected =  $scope.products[index];*/
		var storeIM = Parse.Object.extend("StoreInventoryMovement");
	    var query = new Parse.Query(storeIM);
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

    $scope.getFamilies();	
    $('#family').on("change",function() {
   		$scope.setFamilySelected($(this).prop("selectedIndex")); 
	});	    

	$('#product').on("change",function() {
   		$scope.setProductInfo($(this).prop("selectedIndex")); 
	});

}


function SellerCtrl($scope, $http) {	
	
	$scope.families = [];
	$scope.products = [];
	$scope.sellers = [];

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
            //console.log("Llega aqui");

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

		if ($scope.products.length > 0)
			$scope.setProductSelected(0);
	}	

	$scope.setProductInfo = function()
	{
		/*$('#name').val($scope.products[index].get("Name"));
		$('#description').val($scope.products[index].get("Description"));
		$('#price').val($scope.products[index].get("Price"));	
		$('#imagenMostrar').attr('src', $scope.products[index].get("Picture").url());
		ProductSelected =  $scope.products[index];*/
		var receipt = Parse.Object.extend("Receipt");
	    var query = new Parse.Query(receipt);
	    query.equalTo("Seller", SellerSelected);
		query.find({
			success: function(results) {
				console.log(results.length);
				var receiptLine = Parse.Object.extend("ReceiptLine");
			    var query = new Parse.Query(receiptLine);
			    query.containedIn("Receipt", results);
			    query.equalTo("Product",  ProductSelected);
				query.find({
					success: function(results2) {
						console.log(results2.length);
						//$scope.fillProducts(results);
						//console.log(results.length);
						//$('#salidas').val(results.length);
						$scope.setOutputAmount(results2,results2.length);
					}
				});	
				//console.log(results);
				//$scope.fillProducts(results);
				//console.log(results.length);
				//$('#salidas').val(results.length);
				//$scope.setOutputAmount(results,results.length);
			}
		});	

	}

	$scope.setOutputAmount = function(storeIM,input)
	{
		var amount = 0;
		for(var i=0;i<storeIM.length;i++)
		{
			amount+=storeIM[i].get("ProductAmount")-1
		}
		$('#salidas').val(amount+input);
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

    $scope.fillSellerOptions = function(data)
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
	}

	$scope.getSellers = function()
	{	
		Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
		var sellers = Parse.Object.extend("Seller");
        var query = new Parse.Query(sellers);
        query.find({
          success: function(sellers) {
          	$scope.fillSellerOptions(sellers);
            //console.log("Llega aqui");

          	if($scope.sellers.length>0)
          		$scope.setSellerSelected(0);

		},
		 error: function(object, error) {
            alert("error");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
          }		
		});
    };

    $scope.setSellerSelected = function(index)
    {
    	SellerSelected = $scope.sellers[index];
    	$scope.setProductInfo();
    }    

    $scope.setProductSelected = function(index)
    {
    	ProductSelected = $scope.products[index];
    	$scope.setProductInfo();
    }

    $scope.getFamilies();	
    $scope.getSellers();
    $('#family').on("change",function() {
   		$scope.setFamilySelected($(this).prop("selectedIndex")); 
	});	    

	$('#product').on("change",function() {
   		$scope.setProductSelected($(this).prop("selectedIndex")); 
	});

	$('#seller').on("change",function() {
   		$scope.setSellerSelected($(this).prop("selectedIndex")); 
	});	

}