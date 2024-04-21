var token = "<Your Telegram bot Token ID>";
var appUrl = "<Your Deployment URL of Google App Script as Web App>";
var SheetID = "<Your Sheet ID from URL>";
var apiUrl = "https://api.telegram.org/bot" + token;

var From = "";
var ChatID = "";
var Count = 0;
var isMessage = false;
var DebugMode = false;
// var DebugMode = true;

function doPost(e) {
    var stringJson = e.postData.getDataAsString();
    var updates = JSON.parse(stringJson);
    var from = updates.message.from.id;
    From = from;
    ChatID = updates.message.chat.id;

    if (DebugMode) {
        var opts = { "muteHttpExceptions": true }
        var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + From + "&text=inside Do Post method";
        UrlFetchApp.fetch(url, opts).getContentText();
    }

    if (updates.message.text) {
        FindData(updates.message.text);
    }
}

// Arbaz Work - Data Fetching - Start ----------------------------------------
function Sheet0Data() {
    var rangeName = 'MessageSheet!A2:B';
    var rows = Sheets.Spreadsheets.Values.get(SheetID, rangeName).values;
    return rows;
}
function Sheet1Data() {
    var rangeName = 'Sheet1!A2:K';
    var rows = Sheets.Spreadsheets.Values.get(SheetID, rangeName).values;
    return rows;
}
function Sheet2Data() {
    var rangeName = 'Sheet2!A2:B';
    var rows = Sheets.Spreadsheets.Values.get(SheetID, rangeName).values;
    return rows;
}

// Arbaz Work - Data Fetching - End ------------------------------------------

function FindData(UserMessage) {
    var msg = "";
    if (DebugMode) {
        var opts = { "muteHttpExceptions": true }
        var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + From + "&text=inside find data method";
        UrlFetchApp.fetch(url, opts).getContentText();
    }

    var SheetData = Sheet0Data();
    for (var row = 0; row < SheetData.length; row++) {
        if (SheetData[row][0].toLowerCase() == UserMessage.toLowerCase()) {
            isMessage = true;
            if(SheetData[row][1]){   
                msg += SheetData[row][1];
            } else {
                if(msg){
                    msg += "\n"
                }
                msg += "Not Mentiond in the Excel....";
            }
        }
    }
    if (!isMessage) {
        // Arbaz Work - Message Printing - Start --------------------------------
        var SheetData = Sheet1Data();
        for (var row = 0; row < SheetData.length; row++) {
            if (SheetData[row][0] == UserMessage) {
                Count++;
                if (DebugMode) {
                    var opts = { "muteHttpExceptions": true }
                    var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + From + "&text=Data Found in Sheet 1 " + SheetData[row][2] + SheetData[row][3] + SheetData[row][4];
                    UrlFetchApp.fetch(url, opts).getContentText();
                }
                msg += "Data From Sheet 1" + "RRRRR" +
                    "Service Number :: " + SheetData[row][0] + "RRRRR" +
                    "Exchange Code :: " + SheetData[row][1] + "RRRRR" +
                    "Customer :: " + SheetData[row][2] + "RRRRR" +
                    "Address :: " + SheetData[row][3] + "RRRRR" +
                    "Mobile :: " + SheetData[row][4] + "RRRRR" +
                    "OLT IP :: " + SheetData[row][5] + "RRRRR" +
                    "Plan :: " + SheetData[row][6] + "RRRRR" +
                    "BB USER ID :: " + SheetData[row][7] + "RRRRR" +
                    "Power :: " + SheetData[row][8] + "RRRRR" +
                    "Vlan :: " + SheetData[row][9] + "RRRRR" +
                    "Voice :: " + SheetData[row][10] + "RRRRR" +
                    "=================================RRRRR";
            }
        }
        var SheetData = Sheet2Data();
        for (var row = 0; row < SheetData.length; row++) {
            if (SheetData[row][0] == UserMessage) {
                Count++;
                msg += "Data From Sheet 2 " + "RRRRR" +
                    "Number :: " + SheetData[row][0] + "RRRRR" +
                    "Name :: " + SheetData[row][1] + "RRRRR" +
                    "=================================RRRRR";
            }
        }
    }
    // Arbaz Work - Message Printing - End ----------------------------------------------------
    sendText(ChatID, msg);
}

function sendText(chatid, text, replymarkup) {
    if (text) {
        text = text.split("RRRRR");
        var msg = "";
        for (var i = 0; i < text.length; i++) {
            msg += text[i] + "\n\n";
        }
        if (isMessage) {
            text = msg;
        } else {
            text = "Total Records Found :: " + Count + "\n==========================\n" + msg;
        }
    } else {
        text = "No Data Found";
    }
    if (DebugMode) {
        var opts = { "muteHttpExceptions": true }
        var url = apiUrl + "/sendmessage?parse_mode=HTML&chat_id=" + From + "&text=text";
        UrlFetchApp.fetch(url, opts).getContentText();
    }
    var data = {
        method: "post",
        payload: {
            method: "sendMessage",
            chat_id: String(chatid),
            text: text,
            parse_mode: "HTML",
            reply_markup: JSON.stringify(replymarkup)
        }
    };
    UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);
}