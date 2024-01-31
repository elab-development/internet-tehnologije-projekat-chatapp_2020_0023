import React from 'react';

const Message = ({ id, body, userName }) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{body}</td>
      <td>{userName}</td>
    </tr>
  );
};

export default Message;
