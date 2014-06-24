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
// optional controllers
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
		$('#name').val($scope.products[index].get("Name"));
		$('#description').val($scope.products[index].get("Description"));
		$('#price').val($scope.products[index].get("Price"));	
		$('#imagenMostrar').attr('src', $scope.products[index].get("Picture").url());
		ProductSelected =  $scope.products[index];
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

    $scope.displayImage = function(input)
    {
    	if (input.files && input.files[0]) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	            $('#imagenMostrar').attr('src', e.target.result);
	        }

        reader.readAsDataURL(input.files[0]);
    	}
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

    $("#image").change(function(){
    	$scope.displayImage(this);
	});	

	$('#product').on("change",function() {
   		$scope.setProductInfo($(this).prop("selectedIndex")); 
	});

}

$(function() {
      $("#agregarFamilia").click( function()
           {

           	if ($("#name").val().length>0)   
           	{        	 	
	            Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");	           
	          	var ProductFamily = Parse.Object.extend("ProductFamily");
	          	var productFamily = new ProductFamily();
	          	productFamily.set("Name",$("#name").val());	          	
	            productFamily.save(null, {
	              success: function(productFamily) {
	                // Execute any logic that should take place after the object is saved.
	                alert("Se han guardado los datos");
	                window.location.href = window.location
	              },
	              error: function(productFamily, error) {
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
      $("#agregarProducto").click( function()
           {

           	if ($("#name").val().length>0 && $("#price").val().length>0 && $("#description").val().length>0)   
           	{        	 	
	            Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");	           
	          	var Product = Parse.Object.extend("Product");
	          	var product = new Product();
	          	product.set("Name",$("#name").val());
	          	product.set("Description",$("#description").val());
	          	product.set("Price",parseInt($("#price").val()));	
	          	var relation = product.relation("ProductFamily");
				relation.add(FamilySelected);
				var im = document.getElementById('image').files[0];
				var parseFile = new Parse.File(im.name,im);
				product.set("Picture",parseFile);			  	
	            product.save(null, {
	              success: function(product) {
	                // Execute any logic that should take place after the object is saved.
	                alert("Se han guardado los datos");
	                window.location.href = window.location
	              },
	              error: function(error) {
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
      $("#editarProducto").click( function()
           {

           	if ($("#name").val().length>0 && $("#price").val().length>0 && $("#description").val().length>0)   
           	{        	 	
	            Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");	           
	          	var product = ProductSelected;
	          	product.set("Name",$("#name").val());
	          	product.set("Description",$("#description").val());
	          	product.set("Price",parseInt($("#price").val()));	
	          	var relation = product.relation("ProductFamily");
				relation.add(FamilySelected);
				var im = document.getElementById('image').files[0];
				var parseFile = new Parse.File(im.name,im);
				product.set("Picture",parseFile);			  	
	            product.save(null, {
	              success: function(product) {
	                // Execute any logic that should take place after the object is saved.
	                alert("Se han guardado los datos");
	                window.location.href = window.location
	              },
	              error: function(error) {
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
      $("#borrarProducto").click( function()
           {

           	   Parse.initialize("i3ygHQgeFpeMxLId6XNpL1SspvgVezbrimLGRLrs","EbtLgXi6Bu2OCDwx8GcrZWm8F6ZnYYeVkaXfuvh9");	           
	          	var producto = ProductSelected;
	          	 producto.destroy({
				  success: function(store) {
				    // The object was deleted from the Parse Cloud.
				    alert("El producto fue borrado con exito");
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