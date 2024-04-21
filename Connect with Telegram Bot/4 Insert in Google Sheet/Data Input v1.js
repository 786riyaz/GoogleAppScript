var token = "<Your Telegram bot Token ID>";
var webAppUrl = "<Your Deployment URL of Google App Script as Web App>";
var SheetID = "<Your Sheet ID from URL>";
var telegramAppurl = "https://api.telegram.org/bot" + token;

function getMe() {
  var url = telegramAppurl + "/getMe";
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText())
}
function setWebhook() {
  var url = telegramAppurl + "/setWebhook?url=" + webAppUrl;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText())
}

function sendText(id, text) {     // Replace with Serive Call - Pending
  var url = telegramAppurl + "/sendMessage?chat_id=" + id + "&text=" + text;
  var response = UrlFetchApp.fetch(url);
  Logger.log(response.getContentText())
}
function sendTextRiyaz(chatid, text, replymarkup) {
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
function doGet(e) {
  return HtmlService.createHtmlOutput("hi");
}
function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var text = data.message.text;
  var id = data.message.chat.id;
  if(false){
    sendTextRiyaz(id,JSON.stringify(data));
  }
  // var name = data.message.chat.first_name + " " + data.message.chat.last_name;
  var name = "Shivam";
  var answer = "Hi This is " + name + ", Your Data has been submitted.";
  // SpreadsheetApp.openById(SheetID).getSheets()[0].appendRow([new Date(), id, name, text, answer]);

  // Input Rectification Processing
  if (text) {
    var totalMessages = text.split(" ");

    if (totalMessages.length >= 3) {
      var CorrectRecord = true;
      // sendText(id,"Correct Format of the Input.....");
      var issueNumber = totalMessages[0];
      if (issueNumber) {
        issueNumber = issueNumber.split("-");
        if (issueNumber.length == 2) {
          var isAreaCodeCorrect = true;
          var isCorrctLength = false;
          // sendText(id, "telephone number has 2 parameters");
          var AreaCodeArray = ["079","02717"];
          if(AreaCodeArray.indexOf(issueNumber[0]) >= 0){
            // sendText(id, "Area Code is Correct");
            CorrectRecord = true;
          }else {
            isAreaCodeCorrect = false;
            sendText(id, "Area Code is Incorrect");
            CorrectRecord = false;
          }
          if(isAreaCodeCorrect){
            if((issueNumber[0] == "079" && issueNumber[1].length == 8) || (issueNumber[0] == "02717" && issueNumber[1].length == 6)){
              // sendText(id, "Correct Length of Part 2 in the number");
              isCorrctLength = true;
              CorrectRecord = true;
            } else {
              if(issueNumber[0] == "079"){
                sendText(id, "Please check number, it must be 8 digits");
              }
              if(issueNumber[0] == "02717"){
                sendText(id, "Please check number, it must be 6 digits");
              }
              CorrectRecord = false;
            }
          }
          if(isCorrctLength){
            // sendText(id, "cheching in the Regex");
            var CharacterDetected = false;
            for(let j=0;j<issueNumber[1].length;j++){
              var NumberArray = ["0","1","2","3","4","5","6","7","8","9"];
              if(NumberArray.indexOf(issueNumber[1][j]) == -1){
                CharacterDetected = true;
              }
            }
            if(!CharacterDetected){
              // sendText(id,"Correct Number");
              CorrectRecord = true;
            } else {
              sendText(id,"Incorrect Number");
              CorrectRecord = false;
            }
          }
        } else {
          sendText(id, "Entered Number is not Correct");
          CorrectRecord = false;
        }
      }
      var status = "";
      for (var i = 1; i < totalMessages.length; i++) {
        status += totalMessages[i] + " ";
      }
      // var status = totalMessages[totalMessages.length-1];
      if (CorrectRecord) {
        issueNumber = issueNumber[0] + "-" + issueNumber[1];
        SpreadsheetApp.openById(SheetID).getSheets()[0].appendRow([new Date(), id, text, issueNumber, status]);
        sendText(id, "Your Data has been submitted.....");
      }
    } else {
      sendText(id, "Input Format ::: 079-XXXXXXXX/02717-XXXXXX Issue-Description Status");
    }
  }
  // sendText(id, answer);


}

/*
{
    "update_id": 567231937,
    "message": {
        "message_id": 326,
        "from": {
            "id": 810549857,
            "is_bot": false,
            "first_name": "OTIS",
            "language_code": "en"
        },
        "chat": {
            "id": 810549857,
            "first_name": "OTIS",
            "type": "private"
        },
        "date": 1713683357,
        "text": "Hi"
    }
}
"{\"update_id\":567231936,\n\"message\":{\"message_id\":325,\"from\":{\"id\":810549857,\"is_bot\":false,\"first_name\":\"OTIS\",\"language_code\":\"en\"},\"chat\":{\"id\":810549857,\"first_name\":\"OTIS\",\"type\":\"private\"},\"date\":1713683217,\"text\":\"Hi\"}}"


{
    "parameters": {},
    "postData": {
        "contents": "{\"update_id\":567231934,\n\"message\":{\"message_id\":323,\"from\":{\"id\":810549857,\"is_bot\":false,\"first_name\":\"OTIS\",\"language_code\":\"en\"},\"chat\":{\"id\":810549857,\"first_name\":\"OTIS\",\"type\":\"private\"},\"date\":1713682923,\"text\":\"Hi\"}}",
        "length": 224,
        "name": "postData",
        "type": "application/json"
    },
    "contextPath": "",
    "queryString": "",
    "parameter": {},
    "contentLength": 224
}
*/
