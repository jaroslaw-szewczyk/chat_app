{
  const loginForm = document.getElementById('welcome-form');
  const messagesSection = document.getElementById('messages-section');
  const messageList = document.getElementById('messages-list');
  const addMessageForm = document.getElementById('add-messages-form');
  const userNameInput = document.getElementById('username');
  const messageContentInput = document.getElementById('message-content');

  let userName = '';

  const socket = io();
  
  socket.on('message', ({ author, content }) => addMessage(author, content))
  socket.on('newUser', ({bot, botMessage}) => addMessage(bot, botMessage));

  function login (e) {
    e.preventDefault();
    if(!userNameInput.value) {
      alert('Please give your name');
    } else {
      userName = userNameInput.value;
      loginForm.classList.remove('show');
      messagesSection.classList.add('show');
      socket.emit('join', userName);
    }
  }

  function addMessage (author, content) {
    const message = document.createElement('li'); 
    message.classList.add('message', 'message--received');
    if(author === userName) message.classList.add('message--self');

    const headerAuthor = document.createElement('h3');
    headerAuthor.classList.add('message', 'message__author');
    author === userName ? author = 'you' : author;
    headerAuthor.textContent = author;

    const newDiv = document.createElement('div'); 
    author === 'Chat Bot' ? newDiv.classList.add('message__content', 'chat--bot') : newDiv.classList.add('message__content');
    newDiv.textContent = content;

    message.appendChild(headerAuthor); 
    message.appendChild(newDiv);

    messageList.appendChild(message);
  }

  function sendMessage (e) {
    e.preventDefault();

    let messageContent = messageContentInput.value;

    if(!messageContent.length) {
      alert('You have to type something!');
    }
    else {
      addMessage(userName, messageContent);
      socket.emit('message', { author: userName, content: messageContent })
      messageContentInput.value = '';
    }
  }

  loginForm.addEventListener('submit', login);

  addMessageForm.addEventListener('submit', sendMessage);

}