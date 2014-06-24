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
var Cancelado = true;
var ReceiptToEdit = null;
var ProductValues = [];

function StoreEditCtrl($scope,$http) {   

	$scope.stores = [];
	$scope.receipts = [];
	$scope.productsAmount = [];


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
		var receipt = Parse.Object.extend("Receipt");
	    var query = new Parse.Query(receipt);
	    query.equalTo("Store", StoretoEdit);	    
	    query.descending("createdAt");				
		query.find({
			success: function(results) {
				//console.log(results);
				//$scope.fillProducts(results);
				//console.log(results.length);
				//$('#salidas').val(results.length);
				$scope.fillReceiptOptions(results);
			}
		});	
   	}

   	$scope.fillReceiptOptions = function(data)
	{
		var select = document.getElementById('receipt');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		//alert("Fill player");
		var lista = data;
		$scope.receipts = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.receipts.push(lista[i]);
		}
		var sel = document.getElementById('receipt');
		for(var i = 0; i < $scope.receipts.length; i++) {
		    var opt = document.createElement('option');
		    opt.innerHTML = i+1;
		    opt.value = i+1;
		    sel.appendChild(opt);
		}

		if($scope.receipts.length>0)
		{
			$scope.getReceiptsData(0);
		}
	}

	$scope.getReceiptsData = function(index)
	{
		/*var reciboL = $scope.storeIM[index].get("ReceiptLine");
		$scope.getReceiptLineData(reciboL);
		var producto = $scope.storeIM[index].get("Product");
		$scope.getProductData(producto);
		var cantidad = $scope.storeIM[index].get("Amount");
		$('#amount').val(cantidad);*/
		$scope.getSellerData($scope.receipts[index].get("Seller"));
		$scope.getClientData($scope.receipts[index].get("Client"));
		$scope.getPaidData($scope.receipts[index].get("Paid"))
		$scope.getReceiptLineData($scope.receipts[index]);
	}

	$scope.getReceiptLineData = function(recibo)
	{
		var receiptLine = Parse.Object.extend("ReceiptLine");
	    var query = new Parse.Query(receiptLine);
	    query.equalTo("Receipt",recibo);	    
	    query.descending("createdAt");				
		query.find({
			success: function(results) {
				//console.log(results);
				//$scope.fillProducts(results);
				//console.log(results.length);
				//$('#salidas').val(results.length);
				$scope.setReceiptLineData(results);
			}
		});
	}		

	$scope.setReceiptLineData = function(resultLines)
	{
		$scope.fillProducts(resultLines);
	}

	$scope.fillProducts = function(data)
	{
		ProductValues = [];
		$scope.productsAmount = [];
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
			$scope.productsAmount.push(lista[i].get("ProductAmount"));
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
		}
	}	

	$scope.setProductInfo = function(index)
	{
		$('#amount').val($scope.productsAmount[index]);
	}

	$scope.getProductData = function(product)
	{
		var info = product;	
		    	info.fetch({
				  success: function(productData) {	
					  $('#product').val(productData.get("Name"));
				}
			 	});	 
	}
	
	$scope.getReceiptData = function(recibo)
	{
		var info = recibo;
		ReceiptToEdit = recibo;	
		    	info.fetch({
				  success: function(reciboData) {	
					  $scope.getSellerData(reciboData.get("Seller"));
					  $scope.getClientData(reciboData.get("Client"));
					  $scope.getPaidData(reciboData.get("Paid"));
				}
			 	});	 
	}

	$scope.getPaidData = function(pago)
	{
		if(pago)
		{
			$('#cancelado').val("Cancelado");
			Cancelado = true;
		}			
		else 
		{
			$('#cancelado').val("Pendiente");
			Cancelado = false;
		}			
	}

	$scope.getSellerData = function(seller)
	{
		var info = seller;	
		    	info.fetch({
				  success: function(sellerData) {	
					  $('#seller').val(sellerData.get("Name"));
				}
			 	});	 
	}

	$scope.getClientData = function(client)
	{
		var info = client;	
		    	info.fetch({
				  success: function(clientData) {	
					  $('#client').val(clientData.get("Name"));
				}
			 	});	 
	}

    $scope.getStores();

    $('#store').on("change",function() {
   		$scope.getStoreData($(this).prop("selectedIndex")); 
	});

	$('#receipt').on("change",function() {
   		$scope.getReceiptsData($(this).prop("selectedIndex")); 
	});

	$('#product').on("change",function() {
   		$scope.setProductInfo($(this).prop("selectedIndex")); 
	});
}


function ClientCtrl($scope,$http) {   

	$scope.clients = [];

	$scope.fillClientOptions = function(data)
	{
		var select = document.getElementById('client');
		var length = select.options.length;
		for (i = 0; i < length; i++) {
			 select.remove(select.options[i]);
		}		
		//alert("Fill player");
		var lista = data;
		$scope.clients = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.clients.push(lista[i]);
		}
		var sel = document.getElementById('client');
		for(var i = 0; i < $scope.clients.length; i++) {
		    var opt = document.createElement('option');
		    var espacio = " ";
		    var apellido = espacio.concat($scope.clients[i].get("LastName"));
		    opt.innerHTML = $scope.clients[i].get("Name").concat(apellido);
		    opt.value = $scope.clients[i].get("Name").concat(apellido);
		    sel.appendChild(opt);
		}
	}

	$scope.getClients = function()
	{	
		Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
		var client = Parse.Object.extend("Client");
        var query = new Parse.Query(client);
        query.find({
          success: function(client) {
          	$scope.fillClientOptions(client);
          	if($scope.clients.length>0)
          		$scope.getReceipts($scope.clients[0]);
		},
		 error: function(object, error) {
            alert("error");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
          }		
		});
    };

    $scope.setClientInfo = function(index)
    {
    	var client = $scope.clients[index];
    	$scope.getReceipts(client);
    }

    $scope.getReceipts = function(client)
	{	
		Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
		var receipt = Parse.Object.extend("Receipt");
        var query = new Parse.Query(receipt);
        query.equalTo("Client",client);
        query.find({
          success: function(receipt) {
          	$scope.getReceiptData(receipt);
		},
		 error: function(object, error) {
            alert("error");
            // The object was not retrieved successfully.
            // error is a Parse.Error with an error code and description.
          }		
		});
    };

    $scope.getReceiptData = function(receipts)
    {
    	var pagados = 0;
    	var debe = 0;
    	for(var i=0; i<receipts.length;i++)
    	{
    		var info = receipts[i];	
		    	info.fetch({
				  success: function(info) {	
					  if(info.get("Paid"))
					  {
					  	pagados+=1;
					  }
					  else debe+=1;
					  $scope.actualizarPagos(pagados,debe);
				}
			 	});	 
    	}
    }

    $scope.actualizarPagos = function(pagados,debe)
    {
		$('#paid').val(pagados); 
		$('#debt').val(debe);    	
    }

     $('#client').on("change",function() {
   		$scope.setClientInfo($(this).prop("selectedIndex")); 
	});

    $scope.getClients();
}

$(function() {
      $("#cancelarRecibo").click( function()
           {

           	if (!Cancelado && ReceiptToEdit!=null)   
           	{        	 	
	            Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");
	            var recibo = ReceiptToEdit;
	            recibo.set("Paid",true);	          	
	            recibo.save(null, {
	              success: function(recibo) {
	                // Execute any logic that should take place after the object is saved.
	                alert("Se ha cancelado el recibo");
	                window.location.href = window.location
	              },
	              error: function(recibo, error) {
	                // Execute any logic that should take place if the save fails.
	                // error is a Parse.Error with an error code and description.
	                alert('Failed to create new object, with error code: ' + error.description);
	              }
	            });

			//

	        }

	        else alert("Este recibo ya está cancelado");

	       }
      );
});