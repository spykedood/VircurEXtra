<script>
	var startTagBid = "<table class='mylists mybox' style='font-size: 70%;display: inline-block; vertical-align: top; border: 0px solid;'><tr><td colspan=3><strong>Buy orders</strong></td></tr><tr><th style='text-align:center;'>Quantity<br/>[XPM]</th><th style='text-align:center;'>Price<br/>[XPM/BTC]</th><th>Volume<br/>[BTC]</th></tr>";
	var endTag = "</table>";

	var startTagAsk = "<table class='mylists mybox' style='font-size: 70%;display: inline-block; vertical-align: top; border: 0px solid;'><tr><td colspan=3><strong>Sell orders</strong></td></tr><tr><th style='text-align:center;'>Quantity<br/>[XPM]</th><th style='text-align:center;'>Price<br/>[XPM/BTC]</th><th>Volume<br/>[BTC]</th></tr>";
	var startTagExec = "<table class='mylists mybox' style='font-size: 70%;display: inline-block; vertical-align: top; border: 0px solid;'><tr><td colspan=5><strong>Recently executed orders</strong></td></tr><tr><th>Date</th><th style='text-align:center;'>Quantity<br/>[XPM]</th><th style='text-align:center;'>Price<br/>[XPM/BTC]</th><th style='text-align:center;'>Volume <br/>[BTC]</th><th style='text-align:center;'></th></tr>";


	function reloadOrderexecution(p_data) {
		var vOut;
		var cc;
		//Editing this from 20 - will this allow for more than 20 buy/sell/recent orders to be displayed?
		//Try injecting and have this be 100.
		//When to inject? Wait until the page has loaded, delete the contents of span, inject changed script?...
		var nMax=50;
		
		vOut = startTagExec;
		cc = 0;
    
    	if(p_data.length < nMax) {nMax=p_data.length;}
    
		for(ii=0;ii<p_data.length;ii++) {
	    	oei = p_data[ii];
	    	cc = (cc+1) % 2;
	    	if(cc == 1){
	    		vOut += "<tr>";
	    	} else {
	    		vOut += "<tr class='alt'>";
	    	}
			vOut += "<td>"+ format_date(oei[0])+"</td>";
				vOut += "<td class='coinformat'>" + format_number(oei[1]*oei[2],4,l_sep,l_del) + "</td>";			
				vOut += "<td class='coinformat'>" + format_number(1.0/oei[1],8,l_sep,l_del) + "</td>";
				vOut += "<td class='coinformat'>" + format_number(oei[2],4,l_sep,l_del) + "</td>";
	    	vOut += "</tr>";
 		}
 	
	 	vOut += "</table>";
	 	document.getElementById("exectable").innerHTML  = vOut; 

	}
	
	function reloadOrderbook(p_type,p_data) {
		// 0 = Bid
		// 1 = ask
     var vOut;
     var q2;
     var cc;
     var odb;
//Editing this from 20 - will this allow for more than 20 buy/sell/recent orders to be displayed?
		//Try injecting and have this be 100.
		//When to inject? Wait until the page has loaded, delete the contents of span, inject changed script?...

     var nMax=50;
          
		if(p_type == 0) { vOut = startTagBid; }
		if(p_type == 1) { vOut = startTagAsk; }
	 
		q2 = 0;
		cc=0;
     
     	p_data_base = p_data["base"];
		p_data_alt  = p_data["alt"];
		p_data_data = p_data["res"];     
     
 	 for(ii=0;ii<p_data_data.length;ii++) {

		cc = (cc + 1) % 2;
		if(cc == 1) {
			vOut += "<tr>";
		} else {
 	 		vOut += "<tr class='alt'>";
		}

	    odb = p_data_data[ii]
      	q2 += odb[1]

		if(p_type == 0) {
				vOut += "<td class='coinformat'><a href='javascript:void(0)' onclick='SetSellAmount(q2)'>"+format_number(odb[1],4,l_sep,l_del)+"</a></td>";
				vOut += "<td class='coinformat'><a href='javascript:void(0)' onclick='SetSellPrice(<odb[0])'>"+format_number(odb[0],8,l_sep,l_del)+"</a></td>";
		}
		if(p_type == 1) {
			vOut += "<td class='coinformat'><a href='javascript:void(0)' onclick='SetBuyAmount(q2)'>"+format_number(odb[1],4,l_sep,l_del)+"</a></td>";
			vOut += "<td class='coinformat'><a href='javascript:void(0)' onclick='SetBuyPrice(<odb[0])'>"+format_number(odb[0],8,l_sep,l_del)+"</a></td>";
		}
			vOut += "<td class='coinformat'>" + format_number(odb[1]*odb[0],4,l_sep,l_del) + "</td>";
		vOut += "</tr>";
	  }
 	 vOut = vOut + endTag;
 	 if(p_type == 0) {
	 	document.getElementById("buytable").innerHTML  = vOut;
	 } else {
	 	document.getElementById("selltable").innerHTML  = vOut;
	 }
	}

	$(function() {
	     
		var vOut;

		     var jqxhr = $.ajax( "https://vircurex.com/api/async_orderbook_get_asks.json?base=BTC&alt=XPM")
			    .done(function(p_data) {
			    	reloadOrderbook(1,p_data) 
		    	})
		    	.fail(function() {})
		    	.always(function() {});
		    	
			var jqxhr = $.ajax( "https://vircurex.com/api/async_orderbook_get_bids.json?base=BTC&alt=XPM")
			    .done(function(p_data) {
			    	reloadOrderbook(0,p_data) })
		    	.fail(function() {})
		    	.always(function() {});	    
			var jqxhr = $.ajax( "https://vircurex.com/api/async_orderbook_get_execs.json?base=BTC&alt=XPM")
			    .done(function(p_data) {
			    	reloadOrderexecution(p_data) })
		    	.fail(function() {})
		    	.always(function() {});
	    return;
	
	     vOut = startTagBid;
	     
	     reloadOrderbook(0,"[[&quot;0.00793958&quot;,&quot;10.07609972&quot;],[&quot;0.00777999&quot;,&quot;90.0&quot;],[&quot;0.00776&quot;,&quot;2.33&quot;],[&quot;0.007751&quot;,&quot;50.0&quot;],[&quot;0.00775&quot;,&quot;3.46701664&quot;],[&quot;0.00757011&quot;,&quot;100.0&quot;],[&quot;0.00751&quot;,&quot;100.0&quot;],[&quot;0.007501&quot;,&quot;666.6&quot;],[&quot;0.0075&quot;,&quot;0.05698443&quot;],[&quot;0.00701&quot;,&quot;100.0&quot;],[&quot;0.00681&quot;,&quot;900.0&quot;],[&quot;0.0068001&quot;,&quot;405.5249511&quot;],[&quot;0.0068&quot;,&quot;140.0&quot;],[&quot;0.00674777&quot;,&quot;2222.0&quot;],[&quot;0.00651&quot;,&quot;100.0&quot;],[&quot;0.00601&quot;,&quot;100.0&quot;],[&quot;0.0056&quot;,&quot;17.85714285&quot;],[&quot;0.00551002&quot;,&quot;2.0&quot;],[&quot;0.00551&quot;,&quot;100.0&quot;],[&quot;0.0055&quot;,&quot;429.7&quot;],[&quot;0.00511&quot;,&quot;110.0&quot;],[&quot;0.0051&quot;,&quot;4009.0&quot;],[&quot;0.0050001&quot;,&quot;96.0&quot;],[&quot;0.005&quot;,&quot;4587.16569576&quot;],[&quot;0.00451&quot;,&quot;100.0&quot;],[&quot;0.00401&quot;,&quot;1350.0&quot;],[&quot;0.004&quot;,&quot;300.0&quot;],[&quot;0.003902&quot;,&quot;616.0&quot;],[&quot;0.00351&quot;,&quot;100.0&quot;],[&quot;0.00344415&quot;,&quot;0.02903469&quot;],[&quot;0.00301&quot;,&quot;1700.0&quot;],[&quot;0.003&quot;,&quot;1046.0&quot;],[&quot;0.00250011&quot;,&quot;8.0&quot;],[&quot;0.0025001&quot;,&quot;16.0&quot;],[&quot;0.0025&quot;,&quot;235.0&quot;],[&quot;0.0023&quot;,&quot;70.0&quot;],[&quot;0.00223781&quot;,&quot;0.04468643&quot;],[&quot;0.0022&quot;,&quot;317.26531309&quot;],[&quot;0.00201&quot;,&quot;2740.0&quot;],[&quot;0.002001&quot;,&quot;300.0&quot;],[&quot;0.002&quot;,&quot;200.0&quot;],[&quot;0.0018&quot;,&quot;500.0&quot;],[&quot;0.0015&quot;,&quot;650.0&quot;],[&quot;0.001001&quot;,&quot;10000.0&quot;],[&quot;0.00050101&quot;,&quot;1000.0&quot;],[&quot;0.00001666&quot;,&quot;45281.9772&quot;]]");
	     reloadOrderbook(1,"[[&quot;0.00849&quot;,&quot;100.0&quot;],[&quot;0.008499&quot;,&quot;40.0&quot;],[&quot;0.0085&quot;,&quot;22.67&quot;],[&quot;0.00854&quot;,&quot;25.0&quot;],[&quot;0.00899&quot;,&quot;100.0&quot;],[&quot;0.009&quot;,&quot;500.0&quot;],[&quot;0.00930001&quot;,&quot;0.02150537&quot;],[&quot;0.00949&quot;,&quot;100.0&quot;],[&quot;0.0096&quot;,&quot;300.0&quot;],[&quot;0.00978&quot;,&quot;86.98852863&quot;],[&quot;0.00989&quot;,&quot;215.0&quot;],[&quot;0.00998&quot;,&quot;100.0&quot;],[&quot;0.00999&quot;,&quot;100.0&quot;],[&quot;0.00999876&quot;,&quot;66.0&quot;],[&quot;0.01&quot;,&quot;91.016227&quot;],[&quot;0.0108&quot;,&quot;68.01179707&quot;],[&quot;0.011&quot;,&quot;549.16281279&quot;],[&quot;0.0111&quot;,&quot;486.50451327&quot;],[&quot;0.01136&quot;,&quot;31.612994&quot;],[&quot;0.01149998&quot;,&quot;38.0&quot;],[&quot;0.0115&quot;,&quot;100.0&quot;],[&quot;0.0116&quot;,&quot;22.67486871&quot;],[&quot;0.011999&quot;,&quot;39.92800001&quot;],[&quot;0.012&quot;,&quot;294.0&quot;],[&quot;0.0125&quot;,&quot;32.934&quot;],[&quot;0.0127&quot;,&quot;92.22&quot;],[&quot;0.012899&quot;,&quot;35.0&quot;],[&quot;0.0129&quot;,&quot;200.0&quot;],[&quot;0.013&quot;,&quot;50.0&quot;],[&quot;0.01305&quot;,&quot;90.0&quot;],[&quot;0.0131&quot;,&quot;300.0&quot;],[&quot;0.014&quot;,&quot;500.0&quot;],[&quot;0.0145&quot;,&quot;20.0&quot;],[&quot;0.0149&quot;,&quot;100.0&quot;],[&quot;0.015&quot;,&quot;388.79012548&quot;],[&quot;0.01589998&quot;,&quot;100.0&quot;],[&quot;0.016&quot;,&quot;1049.01000002&quot;],[&quot;0.01661561&quot;,&quot;60.18439098&quot;],[&quot;0.016789&quot;,&quot;87.44476001&quot;],[&quot;0.01689998&quot;,&quot;100.0&quot;],[&quot;0.01699998&quot;,&quot;3.0938&quot;],[&quot;0.01699999&quot;,&quot;14.97&quot;],[&quot;0.0175&quot;,&quot;85.54285643&quot;],[&quot;0.01789998&quot;,&quot;100.0&quot;],[&quot;0.0179&quot;,&quot;290.16510414&quot;],[&quot;0.018&quot;,&quot;81.0&quot;],[&quot;0.0188&quot;,&quot;19.43535747&quot;],[&quot;0.01889998&quot;,&quot;100.0&quot;],[&quot;0.01989998&quot;,&quot;100.0&quot;],[&quot;0.02189998&quot;,&quot;100.0&quot;],[&quot;0.02289998&quot;,&quot;100.0&quot;],[&quot;0.02489998&quot;,&quot;100.0&quot;],[&quot;0.028&quot;,&quot;10.0&quot;],[&quot;0.039&quot;,&quot;20.0&quot;],[&quot;0.05&quot;,&quot;5.6&quot;],[&quot;0.06&quot;,&quot;5.0&quot;],[&quot;0.07&quot;,&quot;100.0&quot;],[&quot;0.09&quot;,&quot;1000.0&quot;],[&quot;0.1&quot;,&quot;1050.9&quot;],[&quot;1.0&quot;,&quot;1.0&quot;],[&quot;10.0&quot;,&quot;1.0&quot;],[&quot;16.0&quot;,&quot;0.00646&quot;],[&quot;19.0&quot;,&quot;1.0&quot;],[&quot;347.98&quot;,&quot;0.0087&quot;]]");
	});
</script>
<div><span id="buytable"></span><span width="5px">&nbsp;</span><span id="selltable"></span><span width="5px">&nbsp;</span><span id="exectable"></span></div>
<br/>
<br/>

	<br/><br/>
	
	<script language="JavaScript" type="text/javascript">
		  <!--
		function CalculateTotal() {
		  var container;
		  var theCurrency;
		  var f=0.002;
		  document.getElementById("total_buy").innerHTML =  (document.getElementById("order_quantity_buy").value*document.getElementById("order_price_buy").value).toFixed(8)+" BTC";
		  document.getElementById("fee_buy").innerHTML = ((document.getElementById("order_quantity_buy").value) * 0.002).toFixed(8)+" XPM";
		  document.getElementById("total_sell").innerHTML = (document.getElementById("order_quantity_sell").value*document.getElementById("order_price_sell").value).toFixed(8) + " BTC";
		  document.getElementById("fee_sell").innerHTML = ((document.getElementById("order_quantity_sell").value*document.getElementById("order_price_sell").value) * 0.002).toFixed(8) + " BTC";
		  if( document.getElementById("order_quantity_buy").value*document.getElementById("order_price_buy").value< 0.0001) {
		    document.getElementById("submit_buy").setAttribute("disabled","disabled"); }
		  else {
		    document.getElementById("submit_buy").removeAttribute("disabled"); }
		  if( document.getElementById("order_quantity_sell").value*document.getElementById("order_price_sell").value< 0.0001) {
		    document.getElementById("submit_sell").setAttribute("disabled","disabled"); }
		  else {
		    document.getElementById("submit_sell").removeAttribute("disabled"); }
		}
		
		function SetBuyAmount(qty)  { document.getElementById("order_quantity_buy").value  = qty; CalculateTotal(); }
		function SetSellAmount(qty) { document.getElementById("order_quantity_sell").value = qty; CalculateTotal(); }
		function SetBuyPrice(qty)  { document.getElementById("order_price_buy").value      = qty; CalculateTotal(); }
		function SetSellPrice(qty) { document.getElementById("order_price_sell").value     = qty; CalculateTotal(); }
		
	</script>