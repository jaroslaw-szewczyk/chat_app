{
  const loginForm = document.getElementById('welcome-form');
  const messagesSection = document.getElementById('messages-section');
  const messageList = document.getElementById('messages-list');
  const addMessageForm = document.getElementById('add-messages-form');
  const userNameInput = document.getElementById('username');
  const messageContentInput = document.getElementById('message-content');

  let userName = '';

  const login = () => {
    if(userNameInput.value.length === 0) {
      prompt('Please give your name');
    } else {
      userName = userNameInput.value;
    }
  }

  loginForm.addEventListener( e => {
    e.preventDefault();
    login();
  })
}