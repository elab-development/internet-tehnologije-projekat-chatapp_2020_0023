import axios from 'axios';

const Message = ({ id, body, userName, userId, loggedInUserId, authToken, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,  
        },
      });
      onDelete(id);
    } catch (error) {
      console.error('Greška pri brisanju poruke:', error);
    }
  };
  console.log(userId);
  console.log(loggedInUserId);

  return (
    <tr>
      <td>{id}</td>
      <td>{body}</td>
      <td>{userName}</td>
      {userId === loggedInUserId && (
        <td>
          <button onClick={handleDelete}>Obriši</button>
        </td>
      )}
    </tr>
  );
};

export default Message;
