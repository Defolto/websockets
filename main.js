// Узнать ip можно в терминале через ipconfig
export const wsConnection = new WebSocket("ws://192.168.0.106:8999");

wsConnection.onopen = function () {
  console.log("Соединение установлено.");
};

wsConnection.onclose = function (event) {
  if (event.wasClean) {
    console.log("Соединение закрыто чисто");
  } else {
    console.log("Обрыв соединения"); // например, "убит" процесс сервера
  }
  console.log("Код: " + event.code + " причина: " + event.reason);
};

wsConnection.onerror = function (error) {
  console.log("Ошибка " + error.message);
};

document.querySelector("button").addEventListener("click", () => {
  const message = document.querySelector("input").value;
  document.querySelector("input").value = "";
  wsConnection.send(JSON.stringify(message));
});

const chat = document.querySelector(".chat");
wsConnection.onmessage = function (event) {
  event.data.text().then((res) => {
    const message = res.replace(/"/g, '');
    chat.insertAdjacentHTML("beforeend", `<p>${message}</p>`);
  });
};
