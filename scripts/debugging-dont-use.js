    Loop: function (LinkOrText, location, columnVal, columnQty, CurrencyLoc, striketype, Gradient) {
        for (var i = 3; i < 23; i++) {
            var BuySellRec = Vircurex.derp(LinkOrText, i, columnVal);
            var BSRCell = Vircurex.getCell(location, i, columnVal);

            var qty = Vircurex.derp(LinkOrText, i, columnQty);
            var qtyCell = Vircurex.getCell(location, i, columnQty);

            var currencyQty = Vircurex.derp(LinkOrText, i, CurrencyLoc);
            var currencyQtyCell = Vircurex.getCell(location, i, CurrencyLoc);
            
            var pctDiff = (Math.abs(((BuySellRec/avg) * 100) - 100)).toFixed(2);
            
            Vircurex.Colours(BSRCell, pctDiff, pctDiffArr, Gradient);
            Vircurex.Colours(qtyCell, qty, btcQtyArr, Gradient);
            Vircurex.Colours(currencyQtyCell, currencyQty, btcQtyArr, Gradient);
            //strikeThrough.Striking(btcqty, qtycell, CurrencyQtyCell, Colour, striketype);
        }
    }

    //Buy
    function (LinkOrText, location, columnVal, columnQty, CurrencyLoc, striketype, Gradient)
    init.Loop('link', 'mainwindow', 2, 1, 3, 1, BuyGradient);
    
    //Sell
    init.Loop('link', 'mainwindow', 6, 5, 7, 2, SellGradient);
    
    //Recent
    init.Loop('text', 'mainwindow', 11, 10, 12, 3, QtyGradient);

    derp: function (a, b, c) {
        var cellvalue = 0;

        if (a === 'link') {
            cellvalue = $('a', 'tr:nth-child(' + b + ') td.coinformat:nth-child(' + c + ')').text();
        } else if (a === 'text') {
            cellvalue = $('.mainwindow .mylists tr:nth-child(' + b + ') td.coinformat:nth-child(' + c + ')').text();
        } else if (a === 'time') {
            cellvalue = $('.mainwindow .mylists tr:nth-child(' + b + ') td:nth-child(' + c + ')').text();
        } else {
            alert("Value text type derp! text or hyperlink!" + a);
        }

        cellvalue = BalanceBox.CleanUp(cellvalue);
        return cellvalue;
    },

    //a=Location ie (.mainwindow .mylists) or ('a').
    //b=Row number (just pass through variable 'a' from loop!).
    //c=td nth child number.
    getCell: function (a, b, c) {
        var cell = 'test';
        if (a === 'mainwindow') {
            cell = $('.mainwindow .mylists tr:nth-child(' + b + ') td.coinformat:nth-child(' + c + ')')[0];
        } else if (a === 'right') {
            cell = $('.mainwindow .mylists tr:nth-child(' + b + ') td.coinformat:nth-child(' + c + ')')[0];
        } else if (a === 'maintop') {
            cell = $('.mainwindow .mylists tr:nth-child(' + b + ') th:nth-child(' + c + ')')[0];
        } else if (a === 'TimeCell') {
            cell = $('.mainwindow .mylists tr:nth-child(' + b + ') td:nth-child(' + c + ')')[0];
        } else {
            alert("Value location derp!");
        }
        return cell;
    },

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
    },

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