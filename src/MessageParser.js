//here call Wit.ai
import { Wit } from "node-wit";

class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    const client = new Wit({ accessToken: "JBZHWQLH4XJW7RBHGWGAGONNCGNCY5F6" });
    var mensaje = lowerCaseMessage;
    client
      .message(mensaje, {})
      .then((data) => {
        var respuesta = data;
        this.actionProvider.greet(respuesta);
      })
      .catch((err) => this.actionProvider.greet("vacio"));
  }
}

export default MessageParser;
