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
                // sendText = "RRR" + " ::: " + text + " ::: " + WholeData[0][0] + WholeData[0][1] + WholeData[0][2] + WholeData[0][3];

                if (WholeData[row][0] == text) {
                    // sendText = "Name :: " + WholeData[row][0] + "\n" + "Number :: " + WholeData[row][1] + "\n" + "Standard :: " + WholeData[row][2] + "\n" + "Address :: " + WholeData[row][3];
                    // sendText = "Name :: " + WholeData[row][0] + "\t" + "Number :: " + WholeData[row][1] + "\t" + "Standard :: " + WholeData[row][2] + "\t" + "Address :: " + WholeData[row][3];
                    // sendText = "*Name* :: " + WholeData[row][0] + "  ---  " + "*Number* :: " + WholeData[row][1] + "  ---  " + "*Standard* :: " + WholeData[row][2] + "  ---  " + "*Address* :: " + WholeData[row][3];
                    //   sendText = "Name :: " + WholeData[row][0] + "         " + "Number :: " + WholeData[row][1] + "         " + "Standard :: " + WholeData[row][2] + "         " + "Address :: " + WholeData[row][3];
                    sendText = WholeData[row][0] + "         " + WholeData[row][1] + "         " + WholeData[row][2] + "         " + WholeData[row][3];

                    //   sendText = "Name :: " + WholeData[row][0] + "|||||||||| Number :: " + WholeData[row][1] + "|||||||||| Standard :: " + WholeData[row][2] + "|||||||||| Address :: " + WholeData[row][3];
                    Final = sendText;
                }
            }
        }
        catch (e) {
            sendText = encodeURIComponent(e);
        }

    } else {
        // var sendText = encodeURIComponent(command[text]);
        Final = encodeURIComponent(command[text]);
    }

    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + Final;
    // var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + from + "&text=" + sendText;
    var opts = { "muteHttpExceptions": true }
    UrlFetchApp.fetch(url, opts).getContentText();
}


function doGet(e) {
    return ContentService.createTextOutput("Method GET not allowed");
}
