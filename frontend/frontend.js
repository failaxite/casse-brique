const button = document.getElementById("button");
button.addEventListener('click', () => {
    fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body: JSON.stringify({
            firstName: "Alex"
        })
    })
});

const socket =  io("http://localhost:3000/");

socket.emit("/d", {msg: "coucou 👋"});