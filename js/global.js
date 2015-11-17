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
				
				for(var i=0; i<results.length; i++) 
				{
					
					
					var row = $("<tr id='row_"+i+"' class='dados'>");
					var cols  = "";
					
					cols += "<td>"+results[i].user.registered+"</td>";
					cols += "<td>"+results[i].user.name.first+"</td>";
					cols += "<td>"+results[i].user.email+"</td>";
					cols += "<td> <img src='"+results[i].user.picture.thumbnail+"' /> </td>";
					
					cols += "<td> <button type='button' class='btn blue' onclick='modulo.consultar("+i+")' >Consultar</button> </td>";
					cols += "<td> <button type='button' class='btn yellow' onclick='modulo.editar("+i+")'>Editar</button> </td>";
					cols += "<td> <button type='button' class='btn red' onclick='modulo.apagar("+i+")'>Apagar</button> </td>";
									
					row.append(cols);
					
					$("#listaDados").append(row);
					
					//console.log(i, results[i].user.email); // i é o índice, matriz[i] é o valor
				}
				
			}
			
		});
		
	}
	
	var recarregar = function()
	{		
		
		$( "#listaDados tr.dados" ).remove();
		
		for(var i=0; i<results.length; i++) 
		{
			if(typeof results[i] != 'undefined' )
			{
			
				var row = $("<tr id='row_"+i+"' class='dados'>");
				var cols  = "";
				
				cols += "<td>"+results[i].user.registered+"</td>";
				cols += "<td>"+results[i].user.name.first+"</td>";
				cols += "<td>"+results[i].user.email+"</td>";
				cols += "<td> <img src='"+results[i].user.picture.thumbnail+"' /> </td>";
				
				cols += "<td> <button type='button' class='btn blue' onclick='modulo.consultar("+i+")' >Consultar</button> </td>";
				cols += "<td> <button type='button' class='btn yellow' onclick='modulo.editar("+i+")'>Editar</button> </td>";
				cols += "<td> <button type='button' class='btn red' onclick='modulo.apagar("+i+")'>Apagar</button> </td>";
								
				row.append(cols);
				
				$("#listaDados").append(row);
				
				//console.log(i, results[i].user.email); // i é o índice, matriz[i] é o valor
			}
		}
		
		var rowCount = $('#listaDados tr.dados').length;
				
		if(rowCount == 0)
		{
			$( "#listaDados" ).hide();
			$( "#noRow" ).show();
		}
	
		
	}
	
	
	var novoDados = function()
	{		
		$.ajax({
			url: 'http://api.randomuser.me/?results=1',
			dataType: 'json',
			success: function(data)
			{
						
				var resultsNovo = data.results;
				
				$('#novaFoto').attr("src",resultsNovo[0].user.picture.thumbnail);
				$('#photo').val(resultsNovo[0].user.picture.thumbnail);
				$('#registered').val(resultsNovo[0].user.registered);
				
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
		$( "#listaDados" ).hide();
		
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
		$( "#listaDados" ).hide();
		
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
		$( "#listaDados" ).hide();
		$( "#novoCadastro" ).hide();
		
		
		
		novoDados();
		
	}
	
	
	var inclusaoDados = function(i)
	{
		
		$( "#incluir" ).hide();
		$( "#listaDados" ).show();
		$( "#novoCadastro" ).show();
		
		
		
		
		
		
	}
	
	
	var alteracaoDados = function()
	{
		
		$( "#alterar" ).hide();
		$( "#listaDados" ).show();
		
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
		
		
	}
	
	
	var voltarDados = function(i)
	{
		
		$( "#consultar" ).hide();
		$( "#alterar" ).hide();
		$( "#listaDados" ).show();
		
		$( "#novoCadastro" ).show();
		$( "#incluir" ).hide();
		
		
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
            alteracaoDados(); 
        },
		incluir: function(i) 
		{ 
            incluirDados(i); 
        },
		inclusao: function(i) 
		{ 
            inclusaoDados(i); 
        },
		voltar: function(i) 
		{ 
            voltarDados(i); 
        }
		
	};
	
	
}();