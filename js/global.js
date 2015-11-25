// JavaScript Document

var modulo = function() 
{

	var abrirDados = function()
	{		
		$.ajax({
			url: 'http://api.randomuser.me/?results=3',
			dataType: 'json',
			success: function(data)
			{
						
				results = data.results;
				
				var source   = $("#listaDados-template").html();
				var template = Handlebars.compile(source);
				$("#listaDados-view").html(template(results)) ;
				
				
								
			}
			
		});
		
	}
	
	var recarregar = function()
	{		
		
		$( "#listaDados tr.dados" ).remove();
		
		var source   = $("#listaDados-template").html();
		var template = Handlebars.compile(source);
		$("#listaDados-view").html(template(results)) ;
				
		var rowCount = $('#listaDados tr.dados').length;
						
		if(rowCount == 0)
		{
			$( "#listaDados" ).hide();
			$( "#noRow" ).show();
		}
		else
		{
			$( "#listaDados" ).show();
			$( "#noRow" ).hide();
		}
		
		$( "#consultar" ).hide();
		$( "#alterar" ).hide();
		$( "#incluir" ).hide();
		$( "#novoCadastro" ).show();
			
		
	}
	
	
	var novoDados = function()
	{	
		$( "#inc_name" ).val('');
		$( "#inc_gender" ).val('');
		$( "#inc_email" ).val('');
		$( "#inc_street" ).val('');
		$( "#inc_city" ).val('');
		$( "#inc_state" ).val('');
		$( "#inc_zip" ).val('');
		$( "#inc_password" ).val('');
		$( "#inc_phone" ).val('');
		$( "#inc_cell" ).val('');
		$( "#inc_registered" ).val('');
		$( "#inc_photo" ).val('');
		$('#novaFoto').attr("src","");
		
		
		$.ajax({
			url: 'http://api.randomuser.me/?results=1',
			dataType: 'json',
			success: function(data)
			{
						
				var resultsNovo = data.results;
				
				$('#novaFoto').attr("src",resultsNovo[0].user.picture.thumbnail);
				$('#inc_photo').val(resultsNovo[0].user.picture.thumbnail);
				$('#inc_registered').val(resultsNovo[0].user.registered);
								
			}
			
		});
		
	}
	
	var apagarDados = function(i)
	{
		
		delete results[i];
		
		recarregar();
		
	}
	
	var consultarDados = function(i)
	{
		
		$( "#consultar" ).show();
		$('body').scrollTop(parseInt($("#dadosLocal").offset().top));	
		
		//$( "#listaDados" ).hide();
		$( "#incluir" ).hide();
		$( "#alterar" ).hide();
		
		$( "#lb_name" ).html(results[i].user.name.first + ' ' + results[i].user.name.last);
		$( "#lb_gender" ).html(results[i].user.gender);
		$( "#lb_email" ).html(results[i].user.email);
		$( "#lb_street" ).html(results[i].user.location.street);
		$( "#lb_city" ).html(results[i].user.location.city);
		$( "#lb_state" ).html(results[i].user.location.state);
		$( "#lb_zip" ).html(results[i].user.location.zip);
		$( "#lb_password" ).html(results[i].user.password);
		$( "#lb_phone" ).html(results[i].user.phone);
		$( "#lb_cell" ).html(results[i].user.cell);
		
		
		
		
		
	}
	
	var editarDados = function(i)
	{
		
		$( "#alterar" ).show();
		$('body').scrollTop(parseInt($("#dadosLocal").offset().top));	
		
		//$( "#listaDados" ).hide();
		$( "#incluir" ).hide();
		$( "#consultar" ).hide();
		
		$( "#id" ).val(i);
		$( "#name" ).val(results[i].user.name.first + ' ' + results[i].user.name.last);
		$( "#gender" ).val(results[i].user.gender);
		$( "#email" ).val(results[i].user.email);
		$( "#street" ).val(results[i].user.location.street);
		$( "#city" ).val(results[i].user.location.city);
		$( "#state" ).val(results[i].user.location.state);
		$( "#zip" ).val(results[i].user.location.zip);
		$( "#password" ).val(results[i].user.password);
		$( "#phone" ).val(results[i].user.phone);
		$( "#cell" ).val(results[i].user.cell);
		
	}
	
	
	var incluirDados = function(i)
	{
		
		$( "#incluir" ).show();
		$('body').scrollTop(parseInt($("#dadosLocal").offset().top));	
		
		$( "#alterar" ).hide();
		$( "#consultar" ).hide();
		//$( "#listaDados" ).hide();
		//$( "#novoCadastro" ).hide();
		//$( "#noRow" ).hide();
		
		
		novoDados();
		
	}
	
	
	var inclusaoDados = function(i)
	{
		
		var str = $( "#inc_name" ).val();
		var res = str.split(" ");
				
		var users = {
			user:
			{
			  name: {
				first: res[0],
				last: str.replace(res[0], "").trim()
			  },
			  gender: $( "#inc_gender" ).val(),
			  email: $( "#inc_email" ).val(),
			  location: {
				  
				 street: $( "#inc_street" ).val(),
				 city: $( "#inc_city" ).val(),
				 state: $( "#inc_state" ).val(),
				 zip: $( "#inc_zip" ).val()
				  
			  },
			  password: $( "#inc_password" ).val(),
			  phone: $( "#inc_phone" ).val(),
			  cell: $( "#inc_cell" ).val(),
			  picture: 
			  {
				  thumbnail: $( "#inc_photo" ).val()
			  },
			  registered: $( "#inc_registered" ).val()
			}
		}
		
		results[results.length] = users;
		
		recarregar();
		
		return false;
		
	}
	
	
	var alteracaoDados = function()
	{
		
		
		var id = $( "#id" ).val();
		
		var str = $( "#name" ).val();
		var res = str.split(" ");
		
		
		results[id].user.name.first = res[0];
		results[id].user.name.last = str.replace(res[0], "").trim();
		results[id].user.gender = $( "#gender" ).val();
		results[id].user.email = $( "#email" ).val();
		results[id].user.location.street = $( "#street" ).val();
		results[id].user.location.city = $( "#city" ).val();
		results[id].user.location.state = $( "#state" ).val();
		results[id].user.location.zip = $( "#zip" ).val();
		results[id].user.password = $( "#password" ).val();
		results[id].user.phone = $( "#phone" ).val();
		results[id].user.cell = $( "#cell" ).val();
		
				
		recarregar();
		
		return false;
		
		
	}
	
	
	var voltarDados = function(i)
	{
		
		$( "#consultar" ).hide();
		$( "#alterar" ).hide();
		$( "#incluir" ).hide();
		$( "#novoCadastro" ).show();
		
		recarregar();
		
		
		$( "#name" ).val('');
		$( "#gender" ).val('');
		$( "#email" ).val('');
		$( "#street" ).val('');
		$( "#city" ).val('');
		$( "#state" ).val('');
		$( "#zip" ).val('');
		$( "#password" ).val('');
		$( "#phone" ).val('');
		$( "#cell" ).val('');
		
		
		
	}
	
	return {
		
		getDados: function() 
		{ 
            abrirDados(); 
        },
		apagar: function(i) 
		{ 
            apagarDados(i); 
        },
		consultar: function(i) 
		{ 
            consultarDados(i); 
        },
		editar: function(i) 
		{ 
            editarDados(i); 
        },
		alteracao: function() 
		{ 
            return alteracaoDados(); 
        },
		incluir: function(i) 
		{ 
            incluirDados(i); 
        },
		inclusao: function(i) 
		{ 
            return inclusaoDados(i); 
        },
		voltar: function(i) 
		{ 
            voltarDados(i); 
        }
		
	};
	
	
}();