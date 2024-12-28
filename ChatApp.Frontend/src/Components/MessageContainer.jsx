import PropTypes from "prop-types";

const MessageContainer = ({ messages }) => {
  return (
    <div className="container mt-3">
      {messages.map((msg, index) => (
        <table className="table table-striped table-bordered mb-3" key={index}>
          <thead>
            <tr>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>{msg.username}:</strong> {msg.msg}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};
MessageContainer.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      msg: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default MessageContainer;
