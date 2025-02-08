{
  const loginForm = document.getElementById('welcome-form');
  const messagesSection = document.getElementById('messages-section');
  const messageList = document.getElementById('messages-list');
  const addMessageForm = document.getElementById('add-messages-form');
  const userNameInput = document.getElementById('username');
  const messageContentInput = document.getElementById('message-content');

  let userName = '';

  const login = (e) => {
    e.preventDefault();
    if(!userNameInput.value) {
      alert('Please give your name');
    } else {
      userName = userNameInput.value;
      loginForm.classList.remove('show');
      messagesSection.classList.add('show');
    }
  }

  const addMessage = (author, content) => {
    const message = document.createElement('li'); 
    message.classList.add('message', 'message--received');
    if(author === userName) message.classList.add('message--self');

    const headerAuthor = document.createElement('h3');
    headerAuthor.classList.add('message', 'message__author');
    author === userName ? author = 'you' : author;
    headerAuthor.textContent = author;

    const newDiv = document.createElement('div'); 
    newDiv.classList.add('message__content');
    newDiv.textContent = content;

    message.appendChild(headerAuthor); 
    message.appendChild(newDiv);

    messageList.appendChild(message);
  }

  const sendMessage = (e) => {
    e.preventDefault();
    if(!messageContentInput.value) {
      alert('no message to send');
    } else {
      addMessage(userName, messageContentInput.value);
      messageContentInput.value = '';
    }
  }

  loginForm.addEventListener('submit', login);

  addMessageForm.addEventListener('submit', sendMessage);
}