import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const SendMessageForm = ({ connection }) => {
  const [msg, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (connection && connection.invoke) {
      try {
        await connection.invoke("SendMessage", msg);
        setMessage(""); // Clear the input field
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    } else {
      console.error("Connection is not properly initialized.");
    }
  };

  return (
    <Form onSubmit={handleSendMessage}>
      <InputGroup className="mb-3">
        <InputGroup.Text>Chat</InputGroup.Text>
        <Form.Control
          onChange={(e) => setMessage(e.target.value)}
          value={msg}
          placeholder="lekh muji"
        ></Form.Control>
        <Button variant="primary" type="submit" disabled={!msg}>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
