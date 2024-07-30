const baseURL = "http://localhost:8080";
const form = document.forms.namedItem("add");
const ul = document.querySelector("ul");

form.onsubmit = (e) => {
  e.preventDefault();

  const user = {
    id: crypto.randomUUID(),
    name: new FormData(e.target).get("name"),
  };

  fetch(baseURL + "/users", {
    method: "POST",
    body: JSON.stringify(user),
  }).then((res) => console.log(res));
};

fetch(baseURL + "/users")
  .then((res) => res.json())
  .then((users) => {
    ul.innerHTML = "";
    for (let user of users) {
      const li = document.createElement("li");
      const del = document.createElement("button");
      const checked = document.createElement("button");

      li.innerHTML = user.name;
      del.innerHTML = "delete";
      checked.innerHTML = "checked";

      li.append(del, checked);
      ul.append(li);

      del.onclick = () => {
        fetch(baseURL + `/users/${user.id}`, {
          method: "DELETE",
        }).then((res) => {
          if (res.status === 200) {
            li.remove();
          } else {
            alert("Error");
          }
        });
      };

      checked.onclick = () => {
        li.style.textDecoration = "line-through";
      };
    }
  });
