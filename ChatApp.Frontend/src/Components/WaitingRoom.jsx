import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types"; // Import PropTypes

const WaitingRoom = ({ joinChatRoom }) => {
  const [userName, setUserName] = useState();
  const [chatRoom, setChatRoom] = useState();

  const handleJoinChatRoom = async (e) => {
    e.preventDefault();
    await joinChatRoom(userName, chatRoom);
  };
  return (
    <Form onSubmit={handleJoinChatRoom}>
      <Row className="px-5 py-5">
        <Col sm={12}>
          <Form.Group>
            <Form.Control
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <Form.Control
              placeholder="Chatroom"
              onChange={(e) => setChatRoom(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={12}>
          <hr />
          <Button variant="success" type="submit">
            Join
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
WaitingRoom.propTypes = {
  joinChatRoom: PropTypes.func.isRequired, // Expect joinChatRoom to be a required function
};
export default WaitingRoom;
