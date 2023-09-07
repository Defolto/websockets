// Узнать ip можно в терминале через ipconfig 
export const wsConnection = new WebSocket("ws://192.168.0.106:8999");

wsConnection.onopen = function () {
  alert("Соединение установлено.");
};

wsConnection.onclose = function (event) {
  if (event.wasClean) {
    alert("Соединение закрыто чисто");
  } else {
    alert("Обрыв соединения"); // например, "убит" процесс сервера
  }
  alert("Код: " + event.code + " причина: " + event.reason);
};

wsConnection.onerror = function (error) {
  alert("Ошибка " + error.message);
};

document.querySelector("button").addEventListener("click", () => {
  wsConnection.send(JSON.stringify({ event: "chat-message", payload: { userName: "Max", age: 24 } }));
});

wsConnection.onmessage = function (event) {
  event.data.text().then(res=>{
    console.log(res);
  });
};
