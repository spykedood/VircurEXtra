var InitResults = {

    PumpDump: function (pumpdump, balance) {
        if (pumpdump="pump"){
            InitResults.PumpDumpLoop(1, balance);
        } else {
            InitResults.PumpDumpLoop(5, balance);
        }
    },

    PumpDumpLoop: function (td_child, balance) {
        var qty = 0, qtytotal = 0;
       
        for (var i = 3; i < 23; i++) {
            qty = $("a", "tr:nth-child(" + i + ") td.coinformat:nth-child(" + td_child + ")").text();
                var urrency = balance;
                currency -= qty;

                if (currency <= 0){
                    var NewPrice = Vircurex.derp('link', i, 2);
                    break;
                } else if (currency > 0 && i=23) {
                    var NewPrice = Vircurex.derp('link', 23, 2);
                    break;
                }
        }        
    }
};