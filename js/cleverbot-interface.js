import {CleverbotConversation} from "./../js/CleverbotConversation.js";
let conversation = new CleverbotConversation();

function getChatResult(result) {
  $("#status-text").removeClass("black-text");
  $("#status-text").addClass("white-text");
  let personClass = (conversation.person1Turn) ? "person-1" : "person-2";
  $("#output").append(`<p class="${personClass}">${result}</p>`);
  let height = $("#output")[0].scrollHeight;
  $("#output").scrollTop(height);
}

function swapTurnAndGetChatResult(result) {
  getChatResult(result);
  conversation.swapTurn(result);
}

function sendHumanChat() {
  $("#status-text").text("Sending...");
  $("#status-text").removeClass("white-text");
  $("#status-text").addClass("black-text");
  let input = $("#input-form input").val();
  $("#input-form input").val("");
  let personClass = (conversation.person1Turn) ? "person-1" : "person-2";
  $("#output").append(`<p class="${personClass}">${input}</p>`);
  conversation.sendRequest(input, swapTurnAndGetChatResult);
}

$(document).ready(function() {
  setInterval(function(){
    if(conversation.autoMode === true) {
      $("#status-text").text("Sending...");
      $("#status-text").removeClass("white-text");
      $("#status-text").addClass("black-text");
      let input = (conversation.person1Turn) ? conversation.lastResponses[1] : conversation.lastResponses[0];
      conversation.sendRequest(input, getChatResult);
    }
  }, 3000);

 $("#input-form").submit(function(event) {
   event.preventDefault();
   sendHumanChat();
 });

 $("button[name=auto-mode]").click(function() {
     conversation.autoMode = !conversation.autoMode;
     let onText = (conversation.autoMode) ? "On" : "Off";
     $(this).toggleClass("btn-danger");
     $(this).toggleClass("btn-success");
     $(this).text(`Auto-Mode: ${onText}`);
 });
});
