/*
DerpCORP is furnishing this item "as is". DerpCORP does not provide any warranty of the item whatsoever, whether express, implied, or statutory, including, but not limited to, any warranty of merchantability or fitness for a particular purpose or any warranty that the contents of the item will be error-free.
In no respect shall DerpCORP incur any liability for any damages, including, but limited to, direct, indirect, special, or consequential damages arising out of, resulting from, or any way connected to the use of the item, whether or not based upon warranty, contract, tort, or otherwise; whether or not injury was sustained by persons or property or otherwise; and whether or not loss was sustained from, or arose out of, the results of, the item, or any services that may be provided by DerpCORP.
*/

// GLOBAL VARS
    'use strict';
    var highestbuy = 0, lowestsell = 0, avg = 0, altDifference = 0, giBuyStrikeCount = 0, giSellStrikeCount = 0, giRecentStrikeCount = 0;
    var AltCurrency = "a", BaseCurrency = "b", LoginStatus = "c";
    var CurrentTime = 0;

var init = {
    avg: function () {
        highestbuy= Vircurex.cellvalue('link', 'buy', 3, 2);
        lowestsell = Vircurex.cellvalue('link', 'sell', 3, 2);
        avg = ((parseFloat(highestbuy) + parseFloat(lowestsell)) / 2).toFixed(6);
        altDifference = (parseFloat(lowestsell) - parseFloat(highestbuy)).toFixed(6);
        AltCurrency = init.getURLParameter("alt");
        BaseCurrency = init.getURLParameter("base");
    },
    
    LoginStatus: function () {
      LoginStatus = $('a:nth-child(1)', '#links').text();
    },

    getURLParameter: function (param) {
        var CurrencyType = "a";
            if (param === "alt") {
                CurrencyType = $('.mainwindow .mylists tr:nth-child(2) th:nth-child(1)').text();
                CurrencyType = ((CurrencyType.replace(" ", "")).replace("Quantity", "")).replace(/\[|\]/g,"");
            } else if (param === "base") {
                CurrencyType = $('.mainwindow .mylists tr:nth-child(2) th:nth-child(3)').text();
                CurrencyType = ((CurrencyType.replace(" ", "")).replace("Volume", "")).replace(/\[|\]/g,"");
            }
        return CurrencyType;
    },

    Loop: function (LinkOrText, location, columnVal, columnQty, CurrencyLoc, BuySellRecType) {
        //Gradient Arrays
        var pctDiffArr = [0.00, 5.00, 10.00, 25.00, 50.00, 75.00];
        var btcQtyArr = [0.000000, 0.0010000, 0.010000, 0.100000, 1.000000, 5.000000];
        var BuyGradient = ['#00FF33', '#00CC33', '#009933', '#006633', '#003333', '#000033'];
        var SellGradient = ['#FFFF33', '#FFCC33', '#FF9933', '#FF6633', '#FF3333', '#FF0033'];
        var QtyGradient = ['#FFFFFF', '#E0E0E0', '#C8C8C8', '#A8A8A8', '#808080', '#505050'];
        var GorGradient = ['#006600', '#B80000', '#FF9900'];  //Green/Orange/Red

        for (var i = 3; i < 23; i++) {
                //alert(LinkOrText + ' ' + i + ' ' + columnVal);

            //qty is unused.. can reactivate at a later date if needed..
            //var qty = Vircurex.cellvalue(LinkOrText, BuySellRecType, i, columnQty);
            var qtyCell = Vircurex.getCellLocation(location, BuySellRecType, i, columnQty);

            var BuySellRec = Vircurex.cellvalue(LinkOrText, BuySellRecType, i, columnVal);
            var BSRCell = Vircurex.getCellLocation(location, BuySellRecType, i, columnVal);

            //working
            var currencyQty = Vircurex.cellvalue('text', BuySellRecType, i, CurrencyLoc);
            var currencyQtyCell = Vircurex.getCellLocation(location, BuySellRecType, i, CurrencyLoc);
            
            var pctDiff = (Math.abs(((BuySellRec/avg) * 100) - 100)).toFixed(2);
                     
            if (BuySellRecType === 'buy') {
                Vircurex.Colours(BSRCell, pctDiff, pctDiffArr, BuyGradient);
            } else if (BuySellRecType === 'sell') {
                Vircurex.Colours(BSRCell, pctDiff, pctDiffArr, SellGradient);
            } else if (BuySellRecType === 'rec') {
                Vircurex.Colours(BSRCell, pctDiff, pctDiffArr, QtyGradient);
            }

            //a=cell b=value c=array to compare value to d=colour gradient
            Vircurex.Colours(qtyCell, currencyQty, btcQtyArr, QtyGradient);
            Vircurex.Colours(currencyQtyCell, currencyQty, btcQtyArr, QtyGradient);
            //strikeThrough.Striking(btcqty, qtycell, CurrencyQtyCell, Colour, striketype);
        }
    }
};

var InitResults = {

    BSquantitytotal: function () {
        var buyqty = 0, buyqtytotal = 0, sellqty = 0, sellqtytotal = 0;

        for (var i = 3; i < 23; i++) {
            //Buy volume addition loop
            buyqty = $("a", "tr:nth-child(" + i + ") td.coinformat:nth-child(1)").text();
            buyqtytotal += BalanceBox.CleanUp(buyqty);
            //Sell volume addition loop
            sellqty = $("a", "tr:nth-child(" + i + ") td.coinformat:nth-child(5)").text();
            sellqtytotal += BalanceBox.CleanUp(sellqty);
        }

        if (buyqtytotal > sellqtytotal) {
            $('.BSquan').append("Buy Quantity > Sell Quantity");
            $('.BSquan2').append("▲");
        } else if (buyqtytotal === sellqtytotal) {
            $('.BSquan').append("Buy Quantity = Sell Quantity");
            $('.BSquan2').append("---");
        } else {
            $('.BSquan').append("Buy Quantity < Sell Quantity");
            $('.BSquan2').append("▼");
        }
    },

    recBuySell: function () {
        var recbuy = 0, recsell = 0;

        for (var q = 3; q < 23; q++) {
            var recentOrdVal = $('.mainwindow .mylists tr:nth-child(' + q + ') td:nth-child(13)').text();
            var recentOrdCell = $('.mainwindow .mylists tr:nth-child(' + q + ') td:nth-child(13)')[0];
            if (recentOrdVal === 'Buy') {
                $(recentOrdCell).css({ 'background-color': '#006600' });
                recbuy++;
            } else if (recentOrdVal === 'Sell') {
                $(recentOrdCell).css({ 'background-color': '#B80000' });
                recsell++;
            }
        }

        if (recbuy > recsell) {
            $('.RecBS').append("Rec.Buy > Rec.Sell");
            $('.RecBS2').append("▲");
        } else if (recbuy === recsell) {
            $('.RecBS').append("Rec.Buy = Rec.Sell");
            $('.RecBS2').append("---");
        } else if (recbuy < recsell) {
            $('.RecBS').append("Rec.Buy < Rec.Sell");
            $('.RecBS2').append("▼");
        }
    }
};

var strikeThrough = {
    Striking: function(a, b, c, d, e) {
            if (a < 0.015000) {
                //Strikes through the recent orders that are too small
                $(b).css('textDecoration', 'line-through');
                $(c).css('textDecoration', 'line-through');
                $(d).css('textDecoration', 'line-through');
                //            
                if (e === 1) {
                    giBuyStrikeCount++;
                } else if (e === 2) {
                    giSellStrikeCount++;
                } else if (e === 3) {
                    giRecentStrikeCount++;
                } 
            }
    },

    StrikeResult: function (Strike, tdloc1, tdloc2, Typeofstrike) {
        if (Strike > 10) {
            $('.shenanegans' + tdloc1).prepend(Typeofstrike + "strike > 10");
            $('.shenanegans' + tdloc2).prepend("Shenanegans?! ✓");
        } else if (Strike === 10) {
            $('.shenanegans' + tdloc1).prepend(Typeofstrike + "strike = 10");
            $('.shenanegans' + tdloc2).prepend("Shenanegans afoot?");
        } else if (Strike < 10) {
            $('.shenanegans' + tdloc1).prepend(Typeofstrike + "strike < 10");
            $('.shenanegans' + tdloc2).prepend("Shenanegans? ✘");
        }
    }
};

var Vircurex = {

    cellvalue: function (a, b, c, d) {
        var cellvalue = 0;

        if (a === 'link') {
            if (b === 'buy') {
                cellvalue = $('a', '#buytable tr:nth-child(' + c + ') td.coinformat:nth-child(' + d + ')').text();
            } else if (b === 'sell') {
                cellvalue = $('a', '#selltable tr:nth-child(' + c + ') td.coinformat:nth-child(' + d + ')').text();
            }
        } else if (a === 'text') {
            if (b === 'buy') {
                cellvalue = $('.mainwindow #buytable  .mylists tr:nth-child(' + c + ') td.coinformat:nth-child(' + d + ')').text();
            } else if (b === 'sell') {
                cellvalue = $('.mainwindow #selltable .mylists tr:nth-child(' + c + ') td.coinformat:nth-child(' + d + ')').text();
            } else if (b === 'rec') {
                cellvalue = $('.mainwindow #exectable .mylists tr:nth-child(' + c + ') td.coinformat:nth-child(' + d + ')').text();
            }
        } else {
            alert("Cellvalue 'a' input incorrect, link/text only! " + a);
        }

        cellvalue = BalanceBox.CleanUp(cellvalue);
        //alert('5. ' + cellvalue);
        return cellvalue;
    },

    //a=Location ie (.mainwindow .mylists) or ('a').
    //b=Row number (just pass through variable 'a' from loop!).
    //c=td nth child number.
    getCellLocation: function (a, b, c, d) {
        var cell = 'test';
            if (a === 'mainwindow') {
                if (b === 'buy') {
                    cell = $('.mainwindow #buytable .mylists tr:nth-child(' + c + ') td.coinformat:nth-child(' + d + ')')[0];
                } else if (b === 'sell'){
                    cell = $('.mainwindow #selltable .mylists tr:nth-child(' + c + ') td.coinformat:nth-child(' + d + ')')[0];
                } else if (b === 'rec'){
                    cell = $('.mainwindow #exectable .mylists tr:nth-child(' + c + ') td.coinformat:nth-child(' + d + ')')[0];
                }
            } else {
            alert("Cell Location 'a' input incorrect, mainwindow is only used for now! " + a);
            }
        return cell;
    },

    TimeDiffColour: function () {     
        var TimeArr = [0, 60, 120, 240, 480, 960];
        var TimeGradient = ['#99FF66', '#99CC66', '#999966', '#996666', '#993366', '#990066'];
              
        var TimeDataNow = Vircurex.Time(3, 1);
            var mostRecTime = TimeDataNow.Val;
            var mostRecTimeCalc = moment().format(mostRecTime, 'DD MMM H:m');
        for (var i = 3; i < 23; i++) {
            var TimeDataThen = Vircurex.Time(i, 1);
                var recTimeQty = TimeDataThen.Val;
                var recTimeCell = TimeDataThen.Loc;

            var releaseDate = moment().format(recTimeQty, 'DD MMM H:m');
            var Tdiff = mostRecTimeCalc.diff(releaseDate, 'minutes'); 

            Vircurex.Colours(recTimeCell, Tdiff, TimeArr, TimeGradient);
        }
    },

    Time: function (a, b) {
        var TimeCellValue = $('#exectable .mylists tr:nth-child(' + a + ') td:nth-child(' + b + ')').text();
        var TimeCellLocation = $('#exectable .mylists tr:nth-child(' + a + ') td:nth-child(' + b + ')')[0];
        
        return {Val: TimeCellValue, Loc: TimeCellLocation};
    },    

    //a=cell b=value c=array to compare value to d=colour gradient
    Colours: function (a, b, c, d) {
        if ((b >= c[0]) && (b < c[1])) {
            $(a).css({ 'background-color': d[0] });
        } else if ((b >= c[1]) && (b < c[2])) {
            $(a).css({ 'background-color': d[1] });
        } else if ((b >= c[2]) && (b < c[3])) {
            $(a).css({ 'background-color': d[2] });
        } else if ((b >= c[3]) && (b < c[4])) {
            $(a).css({ 'background-color': d[3] });
        } else if ((b >= c[4]) && (b < c[5])) {
            $(a).css({ 'background-color': d[4] });
        } else if (b >= c[5]) {
            $(a).css({ 'background-color': d[5] });
        }
    }
};

var SiteStatus = {

    testImage: function (url, sitetype, siteNum, timeout) {
        timeout = timeout || 1000;
        var timedOut = false, timer;
        var img = new Image();

        img.onerror = function () {
            if (!timedOut) {
                clearTimeout(timer);
                SiteStatus.record("Down!", sitetype, siteNum);
            }
        };

        img.onload = function () {
            if (!timedOut) {
                clearTimeout(timer);
                SiteStatus.record("Up", sitetype, siteNum);
            }
        };

        img.src = url;

        timer = setTimeout(function () {
            timedOut = true;
            SiteStatus.record("Timeout", sitetype, siteNum);
        }, timeout);
    },

    record: function (result, sitetype, siteNum) {
        //This line works
        (document.getElementById(sitetype + siteNum)).innerHTML = result;
    },

    Exchanges: function () {
        SiteStatus.testImage("https://mtgox.com/img/hp_merchant.jpg", "Exchanges" , 1);
        SiteStatus.testImage("https://btc-e.com/images/1px.png", "Exchanges", 2);
        SiteStatus.testImage("https://www.aurumxchange.com/images/logo.png", "Exchanges", 3);
        SiteStatus.testImage("https://www.bitstamp.net/s/images/bitstamp_logo_foot.png", "Exchanges", 4);
    },

    Forums: function () {
        SiteStatus.testImage("https://bitcointalk.org/Themes/custom1/images/off.gif", "Forums", 1);
    },

    Misc: function () {
        //SiteStatus.testImage(
        SiteStatus.testImage("https://www.bitcoincharts.com/static/chartslogo.png", "Misc", 1);
        SiteStatus.testImage("https://www.pool-x.eu/images/nlogo.jpg", "Misc", 2);
        SiteStatus.testImage("https://www.btcguild.com/images/top-bg.png", "Misc", 3);
    },

    init: function () {
        //Calling the site status initilization
        SiteStatus.Exchanges();
        SiteStatus.Forums();
        SiteStatus.Misc();

        $('.coinType').prepend(AltCurrency);
        $('.CurrentValue').prepend(avg);
        $('#altDifference')[0].value = altDifference;

        //On change of #SiteSelect it calls the sitestatus script for the picked option
        $("#SiteSelect").change(function () {
            var changedVal = $("#SiteSelect").val();
            SiteStatus.testImage(changedVal, 4);
        });
    }
};

var BalanceBox = {

    //not tested the below.. WIP!
    ProfitCalcSubmit: function () {
        var UserBalance = BalanceBox.CleanUp(document.getElementById("BalanceInput").value);
        UserBalance = (parseFloat(UserBalance)).toFixed(6);

        var InitCoinVal = BalanceBox.CleanUp(document.getElementById("CoinInit").value);
        InitCoinVal = (parseFloat(InitCoinVal)).toFixed(6);


        if (InitCoinVal.length === 0 || UserBalance.length === 0) {
            alert("Dont leave the initial coin value/balance fields empty!");
        } else {
            var profitblah = BalanceBox.profit(InitCoinVal, UserBalance);
            $('.ProfitTD').empty().prepend(profitblah);
        }
    },

    CalculateDiffProfit: function () {
        var BaseToUse = BalanceBox.CleanUp(document.getElementById("BaseToUse").value);
        BaseToUse = (parseFloat(BaseToUse)).toFixed(6);

        if (BaseToUse.length === 0) {
            alert("Dont leave the" + BaseCurrency + "field empty!");
        } else {
            var differenceProfit = (((BaseToUse/highestbuy)*lowestsell)-BaseToUse).toFixed(6);
            $('.ProfitTD2').empty().prepend(differenceProfit);
        }      
    },

    CleanUp: function (Value) {
        Value = Value.replace(/,/g, '');
        return Value;
    },

    profit: function (InitCoinVal, Balance) {
        var profit = ((Balance * avg) - (Balance * InitCoinVal)).toFixed(6);
        profit = parseFloat(profit);
        return profit;
    },

    //Two following functions could be squished into the one function.
    //However, one is a wordy string, and the other is a numbery string.
    balanceType: function (tr) {
        var balanceType = $("#balancebox .mylists tr:nth-child(" + tr + ") td:nth-child(1)").html();
        balanceType = balanceType.trim();
        return balanceType;
    },

    balance: function (tr) {
        var Balance = $("#balancebox .mylists tr:nth-child(" + tr + ") td:nth-child(2)").html();
        Balance = parseFloat(Balance);
        return Balance;
    }
};

// When document is ready run thru our code.
$(document).ready(function () {
    //Refresh page every  90 secs
    //Can make this a user variable instead of fixed @ 90seconds.
    setTimeout('location.reload();', 90000);

    // Initialization
    init.avg();
    init.LoginStatus();

    init.Loop('link', 'mainwindow', 2, 1, 3, 'buy');
    init.Loop('link', 'mainwindow', 2, 1, 3, 'sell');
    init.Loop('text', 'mainwindow', 3, 2, 4, 'rec');
    Vircurex.TimeDiffColour();

    SiteStatus.init();
    InitResults.recBuySell();
    InitResults.BSquantitytotal();
    //strikeThrough.StrikeResult(giBuyStrikeCount, '1', '2', 'Buy');
    //strikeThrough.StrikeResult(giSellStrikeCount, '3', '4', 'Sell');
    //strikeThrough.StrikeResult(giRecentStrikeCount, '5', '6', 'Recent');
    

    $("#Calculate").click(function () {
        BalanceBox.ProfitCalcSubmit();
    });

    $("#CalculateDiffProfit").click(function () {
        BalanceBox.CalculateDiffProfit();
    });
});