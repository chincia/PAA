const form = document.getElementById("form");
var show_token = document.getElementById("show_token");
const BtnProtected = document.getElementById("protected");
const is_login = document.getElementById("is_login");
var token = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const username = formData.get("username");
  const password = formData.get("password");

  fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.access_token) {
        show_token.innerHTML = "Your access token is =>" + response.access_token;
      } else {
        show_token.innerHTML = "Authentication <strong>failed</strong>";
      }

      token = response.access_token;
      console.log(response.access_token);
    });
});

BtnProtected.addEventListener("click", (e) => {
  e.preventDefault();

  fetch("http://localhost:5000/protected", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      if (response.logged_in_as) {
        is_login.innerHTML = "Berhasil Login sebagai: " + response.logged_in_as;
      } else {
        is_login.innerHTML = "Token yang anda masukan tidak ditemukan";
      }
    });
});
