import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import WaitingRoom from "./Components/waitingroom";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatRoom from "./Components/ChatRoom";

function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      // initiate connection
      //specifying the port using hubconnbuilder
      const conn = new HubConnectionBuilder()
        .withUrl("http://localhost:5073/Chat")
        .configureLogging(LogLevel.Information)
        .build();
      //this is a event handler which is invoked once we get reply from api
      conn.on("JoinSpecificChatRoom", (eventUsername, msg) => {
        console.log("msg : ", msg);
      });

      conn.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages((messages) => [...messages, { username, msg }]);
      });

      await conn.start();
      //invoking the event handler
      await conn.invoke("JoinSpecificChatRoom", { username, chatroom });
      setConnection(conn);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <main>
        <Container>
          <Row className="px-5 my-5">
            <Col sm="12">
              <h1 className="font-weight-light">Welcome to chatapp</h1>
            </Col>
          </Row>
          {!connection ? (
            <WaitingRoom joinChatRoom={joinChatRoom} />
          ) : (
            <ChatRoom messages={messages} connection={connection} />
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
