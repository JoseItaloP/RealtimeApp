(function () {
  const socket = io();
  const MessageForm = document.getElementById("MessageForm");
  const Newmessage = document.getElementById("Newmessage");
  const Username = document.getElementById("Uname");
  const UserNameForm = document.getElementById("UserNameForm");
  const BoxMessages = document.querySelector("#MessagesBox");

  UserNameForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (Username.value.length === 0) {
      alert("Digite um nome para continuar.");
      return;
    }

    socket.emit("newUser", Username.value);

    const USNForm = document.getElementById("UserNameForm");
    USNForm.classList.toggle("showBar");
    USNForm.classList.toggle("NotshowBar");
  });

  MessageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (Newmessage.value) {
      const chatMensage = {
        name: Username.value,
        message: Newmessage.value,
      };
      renderMessage("my", chatMensage);
      socket.emit("chat_message", chatMensage);
      Newmessage.value = "";
    }
  });

  // window.addEventListener("l", (e) => {
  //   // e.preventDefault();
  //   console.log(Username.value.length)
  //   if(Username.value.length === 0){
  //     return;
  //   }
  //   socket.emit("newUser", Username.value);
  // });

  window.onbeforeunload = function(){
    if(Username.value.length === 0 ){
      return;
    }
    return "Deseja mesmo sair do site?"
  }

  window.addEventListener("beforeunload", (e)=>{
    e.preventDefault()

    if(Username.value.length === 0 ){
      return;
    }
      return socket.emit("exitUser", Username.value);
    
  })


  // window.addEventListener("close", (e) => {
  //   console.log(Username.value.length)
  //   // e.preventDefault();
  //   if(Username.value.length === 0){
  //     return;
  //   }
  //   socket.emit("newUser", Username.value);
  // });

  socket.on("update", function (update) {
    renderMessage("update", update);
  });

  socket.on("chat", function (chatMensage) {
    renderMessage("other", chatMensage);
  });

  socket.on("exit", function (Username) {
    renderMessage("exit", Username);
  });

  function renderMessage(type, Message) {
    const div = document.createElement("div");
    switch (type) {
      case "my":
        div.setAttribute("class", "YouMessagesBoxNew");
        div.innerHTML = `
                <div class="YouMessagesNew YouMAnimation">
                    <div class="MessageNewname"> Você </div>
                    <p class="MessageNewMessage"> ${Message.message} </div>
                </div>
            `;
        BoxMessages.appendChild(div);
        break;
      case "other":
        div.setAttribute("class", "MessagesBoxNew OtherMAnimation");
        div.innerHTML = `
                <div class="MessagesNew">
                    <div class="MessageNewname">${Message.name} </div>
                    <p class="MessageNewMessage"> ${Message.message} </div>
                </div>
            `;
        BoxMessages.appendChild(div);
        break;
      case "update":
        div.setAttribute("class", "MessagesBoxNew");
        div.innerHTML = `
        <div class="NewUserMessage">
            <h1 class="UserEntry"> O usuário <strong class="UserNameM">${Message}</strong> acabou de entrar! </h1>
        </div>
    `;
        BoxMessages.appendChild(div);
        break;
      case "exit":
        div.setAttribute("class", "MessagesBoxNew");
        div.innerHTML = `
        <div class="NewUserMessage">
            <h1 class="UserEntry"> O usuário <strong class="UserNameM">${Message}</strong> acabou de sair! </h1>
        </div>
    `;
        BoxMessages.appendChild(div);
        break;
    }
    BoxMessages.scrollTop = BoxMessages.scrollHeight - BoxMessages.clientHeight;
  }
})();
