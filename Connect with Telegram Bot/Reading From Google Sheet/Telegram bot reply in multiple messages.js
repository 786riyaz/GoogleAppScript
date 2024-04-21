// configuration
var apiToken = "<Your Telegram bot Token ID>";
var appUrl = "<Your Deployment URL of Google App Script as Web App>";
var SheetID = "<Your Sheet ID from URL>";
var apiUrl = "https://api.telegram.org/bot" + token;


var command = {
    "/start": "welcome to my bot",
    "Hi": "hello",
    "what is your name?": "my name is devisty bot",
    "Hello": "hi"
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
    var WholeData;
    if (typeof command[text] == 'undefined') {
        // var sendText = encodeURIComponent("command not found");
        var sendText = encodeURIComponent("Tasin");

        var rangeName = "Sheet1!A:D";
        sendText = encodeURIComponent("Arbaz");
        try {
            WholeData = Sheets.Spreadsheets.Values.get(SheetID, rangeName).values;
            sendText = encodeURIComponent("Riyaz");
            sendText = encodeURIComponent(WholeData);

            for (var row = 0; row < WholeData.length; row++) {
                sendText = "RRR" + " ::: " + text + " ::: " + WholeData[row][0] + WholeData[row][1] + WholeData[row][2] + WholeData[row][3];

                if (WholeData[row][0] == text) {
                    Final1 = "Name :: " + WholeData[row][0];
                    Final2 = "Number :: " + WholeData[row][1];
                    Final3 = "Standard :: " + WholeData[row][2];
                    Final4 = "Address :: " + WholeData[row][3];

                    var opts = { "muteHttpExceptions": true }
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final1;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final2;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final3;
                    UrlFetchApp.fetch(url, opts).getContentText();
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final4;
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
