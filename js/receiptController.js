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

function StoreEditCtrl($scope,$http) {   

	$scope.stores = [];
	$scope.storeIM = [];


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
		var storeIM = Parse.Object.extend("StoreInventoryMovement");
	    var query = new Parse.Query(storeIM);
	    query.equalTo("Store", StoretoEdit);	    
	    query.equalTo("Type","Salida");
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
		$scope.storeIM = [];		
		for(var i=0;i<lista.length;i++)
		{
			$scope.storeIM.push(lista[i]);
		}
		var sel = document.getElementById('receipt');
		for(var i = 0; i < $scope.storeIM.length; i++) {
		    var opt = document.createElement('option');
		    opt.innerHTML = i+1;
		    opt.value = i+1;
		    sel.appendChild(opt);
		}

		if($scope.storeIM.length>0)
		{
			$scope.getStoreIMData(0);
		}
	}

	$scope.getStoreIMData = function(index)
	{
		var reciboL = $scope.storeIM[index].get("ReceiptLine");
		$scope.getReceiptLineData(reciboL);
		var producto = $scope.storeIM[index].get("Product");
		$scope.getProductData(producto);
		var cantidad = $scope.storeIM[index].get("Amount");
		$('#amount').val(cantidad);
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

	$scope.getReceiptLineData = function(reciboL)
	{
		var info = reciboL;	
		    	info.fetch({
				  success: function(recibo) {	
					  $scope.getReceiptData(recibo.get("Receipt"));
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
   		$scope.getStoreIMData($(this).prop("selectedIndex")); 
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