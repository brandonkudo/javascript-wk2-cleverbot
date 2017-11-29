export class CleverbotConversation {
  constructor() {
    this.apiKey = "CC5nm2ROQS_ql3mwZ7VWXd6hAGg";
    this.cs = null;
    this.lastResponses = ["", ""];
    this.person1Turn = true;
    this.apiURL = `https://www.cleverbot.com/getreply?key=${this.apiKey}`;
  }
  swapTurn(sentMessage) {
    if (this.person1Turn) {
      this.lastResponses[0] = sentMessage;
    }
    else {
      this.lastResponses[1] = sentMessage;
    }
    this.person1Turn = !this.person1Turn;
  }
  sendRequest(input, onSuccess, onError) {
    let requestURL = this.apiURL + "&input=" + input;
    if (this.cs !== null) {
      requestURL += "&cs=" + this.cs;
    }
    $.ajax({
      url: requestURL,
      type: "GET",
      data: {
        format: "json"
      },
      success: (response) => {
        this.cs = response.cs;
        let result = response.output;
        this.swapTurn(result);
        onSuccess(result);
      },
      error: function() {
        onError();
      }
    });
  }
}
