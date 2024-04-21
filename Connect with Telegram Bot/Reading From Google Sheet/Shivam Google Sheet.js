// configuration
var apiToken = "<Your Telegram bot Token ID>";
var appUrl = "<Your Deployment URL of Google App Script as Web App>";
var SheetID = "<Your Sheet ID from URL>";
var apiUrl = "https://api.telegram.org/bot" + token;


var command = {
    "/start": "welcome to my bot",
    "Hi": "hello",
    "what is your name?": "My name is Shivam bot",
    "Hello": "hi",
    "599" : "FIBRE BASIC OTT",
    "FIBRE BASIC OTT" : "599 add on 18% GST",
    "699" : "FIBRE BASIC PLUS OTT",
    "FIBRE BASIC PLUS OTT" : "699 add on 18% GST",
    "799" : "FIBRE VALUE OTT",
    "FIBRE VALUE OTT" : "799 add on 18% GST",
    "999" : "SUPER STAR PREMIUM PLUS",
    "SUPER STAR PREMIUM PLUS" : "999 add on 18% GST",
    "1499" : "FIBRE PREMIUM PLUS OTT",
    "FIBRE PREMIUM PLUS OTT" : "1499 add on 18% GST",
    "1799" : "FIBRE ULTRA OTT",
    "FIBRE ULTRA OTT" : "1799 add on 18% GST",
    "329" : "FIBRE ENTRY",
    "FIBRE ENTRY" : "329 add on 18% GST",
    "999" : "FIBRE 999 : RURAL",
    "FIBRE 999 : RURAL" : "999 add on 18% GST",
    "399" : "HOME WIFI/ GHAR KA WIFI",
    "HOME WIFI/ GHAR KA WIFI" : "399 add on 18% GST",
    "449" : "FIBRE BASIC NEO",
    "FIBRE BASIC NEO" : "449 add on 18% GST",
    "5399" : "FIBRE 3300GB CS374 ANNUAL PLAN",
    "FIBRE 3300GB CS374 ANNUAL PLAN" : "5399 add on 18% GST",
    "499" : "FIBRE BASIC",
    "FIBRE BASIC" : "499 add on 18% GST",
    "599" : "FIBRE BASIC PLUS",
    "FIBRE BASIC PLUS" : "599 add on 18% GST",
    "699" : "FIBRE BASIC SUPER",
    "FIBRE BASIC SUPER" : "699 add on 18% GST",
    "849" : "FIBRE VALUES PLUS",
    "FIBRE VALUES PLUS" : "849 add on 18% GST",
    "1299" : "FIBRE PREMIUM PLUS",
    "FIBRE PREMIUM PLUS" : "1299 add on 18% GST",
    "799" : "FIBRE GOVERNMENT",
    "FIBRE GOVERNMENT" : "799 add on 18% GST",
    "249" : "RURAL FTTH VOICE UNLIMITED",
    "RURAL FTTH VOICE UNLIMITED" : "799 add on 18% GST",
    "299" : "URBAN FTTH VOICE UNLIMITED",
    "URBAN FTTH VOICE UNLIMITED" : "299 add on 18% GST"
}

// set webhook
function setWebhook() {
    var url = apiUrl + "/setwebhook?url=" + appUrl;
    var res = UrlFetchApp.fetch(url).getContentText();
    Logger.log(res);
}

// handle webhook
function doPost(e) {
    var webhookData = JSON.parse(e.postData.contents);
    var from = webhookData.message.from.id;
    var text = webhookData.message.text;
    var Final = "No Data Found";
    var Final1 = "No Data Found";
    var Final2 = "No Data Found";
    var Final3 = "No Data Found";
    var Final4 = "No Data Found";
    var Final5 = "No Data Found";
    var Final6 = "No Data Found";
    var Final7 = "No Data Found";
    var Final8 = "No Data Found";
    var Final9 = "No Data Found";
    var Final10 = "No Data Found";
    var Final11 = "No Data Found";
    var WholeData;
    if (typeof command[text] == 'undefined') {
        // var sendText = encodeURIComponent("command not found");
        var sendText = encodeURIComponent("Tasin");

        var rangeName = "Sheet1!A:K";
        sendText = encodeURIComponent("Arbaz");
        try {
            WholeData = Sheets.Spreadsheets.Values.get(SheetID, rangeName).values;
            sendText = encodeURIComponent("Riyaz");
            sendText = encodeURIComponent(WholeData);

            for (var row = 0; row < WholeData.length; row++) {
                sendText = "RRR" + " ::: " + text + " ::: " + WholeData[row][0] + WholeData[row][1] + WholeData[row][2] + WholeData[row][3];

                if (WholeData[row][0] == text) {
                    if(WholeData[row][0]){
                        Final1 = "Number :: " + WholeData[row][0];
                    } else {
                        Final1 = "Number :: Not Mentioned in the Excel"
                    }

                    if(WholeData[row][1]){
                        Final2 = "Exchange code :: "+ WholeData[row][1];
                    } else {
                        Final2 = "Exchange code :: Not Mentioned in the Excel"
                    }

                    if(WholeData[row][2]){
                        Final3 = "Customer :: " + WholeData[row][2];
                    } else {
                        Final3 = "Customer :: Not Mentioned in the Excel"
                    }

                    if(WholeData[row][3]){
                        Final4 = "Address :: " + WholeData[row][3];
                    } else {
                        Final4 = "Address :: Not Mentioned in the Excel"
                    }

                    if(WholeData[row][4]){
                        Final5 = "Mobile :: " + WholeData[row][4];
                    } else {
                        Final5 = "Mobile :: Not Mentioned in the Excel"
                    }

                    if(WholeData[row][5]){
                        Final6 = "OLT IP :: " + WholeData[row][5];
                    } else {
                        Final6 = "OLT IP :: Not Mentioned in the Excel"
                    }

                    if(WholeData[row][6]){
                        Final7 = "Plan :: " + WholeData[row][6];
                    } else {
                        Final7 = "Plan :: Not Mentioned in the Excel"
                    }

                    if(WholeData[row][7]){
                        Final8 = "BB USER ID :: " + WholeData[row][7];
                    } else {
                        Final8 = "BB USER ID :: Not Mentioned in the Excel"
                    }

                    if(WholeData[row][8]){
                        Final9 = "OLT Power :: " + WholeData[row][8];
                    } else {
                        Final9 = "OLT Power :: Not Mentioned in the Excel"
                    }

                    if(WholeData[row][9]){
                        Final10 = "Vlan :: " + WholeData[row][9];
                    } else {
                        Final10 = "Vlan :: Not Mentioned in the Excel"
                    }

                    if(WholeData[row][10]){
                        Final11 = "Voice :: " + WholeData[row][10];
                    } else {
                        Final11 = "Voice :: Not Mentioned in the Excel"
                    }

                    var opts = { "muteHttpExceptions": true }
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final1;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final2;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final3;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final4;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final5;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final6;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final7;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final8;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final9;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final10;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final11;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + "============================";
                    UrlFetchApp.fetch(url, opts).getContentText();
                }
            }
            
        }
        catch (e) {
            sendText = encodeURIComponent(e);
        }

    } else {
        Final = encodeURIComponent(command[text]);
        var opts = { "muteHttpExceptions": true }
        var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final;
        UrlFetchApp.fetch(url, opts).getContentText();
    }
}
function doGet(e) {
    return ContentService.createTextOutput("Method GET not allowed");
}
