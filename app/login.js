async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("https://station-verification-checklist-backend.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    const data = await res.json();

    if (data.ok) {
      // ✅ Save token
      localStorage.setItem("token", data.token);

      // ✅ Redirect
      window.location.href = "homepage.html";
    } else {
      alert("Invalid credentials");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
}