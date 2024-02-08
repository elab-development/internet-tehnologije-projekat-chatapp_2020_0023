import React, { useState } from 'react';
import axios from 'axios';

const Message = ({ id, body, userName, userId, loggedInUserId, authToken, messages, setMessages }) => {
  const [editing, setEditing] = useState(false);
  const [editedMessageText, setEditedMessageText] = useState(body);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/messages/${id}`,
        {
          body: editedMessageText,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      // Ažurirajmo poruku u lokalnom stanju
      const updatedMessages = messages.map((msg) =>
        msg.id === id ? { ...msg, body: editedMessageText } : msg
      );
      setMessages(updatedMessages);

      setEditing(false);
    } catch (error) {
      console.error('Greška pri ažuriranju poruke:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,  
        },
      });
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error('Greška pri brisanju poruke:', error);
    }
  };

  return (
    <tr>
      <td>{id}</td>
      <td>
        {editing ? (
          <input
            type="text"
            value={editedMessageText}
            onChange={(e) => setEditedMessageText(e.target.value)}
          />
        ) : (
          body
        )}
      </td>
      <td>{userName}</td>
      {userId === loggedInUserId && (
        <td>
          {!editing ? (
            <button onClick={handleEdit}>Uredi</button>
          ) : (
            <>
              <button onClick={handleSaveEdit}>Sačuvaj</button>
              <button onClick={handleCancelEdit}>Otkaži</button>
            </>
          )}
          <button onClick={handleDelete}>Obriši</button>
        </td>
      )}
    </tr>
  );
};

export default Message;
