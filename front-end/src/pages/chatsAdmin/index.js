import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AdminSideBar } from '../../components';
import TrybeerContext from '../../context/TrybeerContext';
import { getAllMessage } from '../../service/trybeerApi';

export default function ChatsAdmin() {
  const [allMessages, setAllMessages] = useState([]);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { setClientEmail } = useContext(TrybeerContext);

  const requestAllMessage = async () => {
    const messages = await getAllMessage();
    setAllMessages(messages);
  };

  const handleClick = (e, email) => {
    e.preventDefault();
    console.log(email);
    setClientEmail(email);
    setShouldRedirect(true);
  };

  useEffect(() => {
    requestAllMessage();
  }, []);

  if (shouldRedirect) return <Redirect to="/admin/chats/chat" />;

  return (
    <div>
      <AdminSideBar />
      <h1>Conversas</h1>
      {!allMessages.length ? (
        <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>
      ) : (
        allMessages.map((chat) => (
          <button
            key={ chat.client }
            data-testid="containerChat"
            type="button"
            onClick={ (e) => handleClick(e, chat.client) }
          >
            <p data-testid="profile-name">{chat.client}</p>
            <p data-testid="last-message">
              {`Última menssagem às ${chat.timeLastMessage}`}
            </p>
          </button>
        ))
      )}
    </div>
  );
}
