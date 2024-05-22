const resetOutput = () => {
  document.getElementById("output").innerText = "{}"
}

const sendMessage = async () => {
  resetOutput()
  const form = document.querySelector("form")
  const formData = new FormData(form)
  const text = formData.get("text")
  await fetch("http://localhost:3000/api/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("output").innerText = JSON.stringify(data, null, 2)
      form.reset()
    })
    .catch((error) => {
      document.getElementById("output").innerText = JSON.stringify({ error: error.message }, null, 2)
    })
}

const simulateError = async () => {
  resetOutput()
  await fetch("http://localhost:3000/api/error")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("output").innerText = JSON.stringify(data, null, 2)
    })
    .catch((error) => {
      document.getElementById("output").innerText = JSON.stringify({ error: error.message }, null, 2)
    })
}
