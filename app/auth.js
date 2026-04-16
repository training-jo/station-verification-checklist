async function checkAuth() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/protected", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();

    if (!data.ok) {
      logout();
      return;
    }

    // ✅ Save user
    window.currentUser = data.user;

    // ✅ Expiration check (NOW safe)
    const now = Date.now() / 1000;
    if (data.user.exp < now) {
      logout();
      return;
    }

    // ✅ Role-based body class
    if (data.user.role === "admin") {
      document.body.classList.add("admin");
    } else {
      document.body.classList.add("store");
    }

    // ✅ Safe admin panel display
    const adminPanel = document.getElementById("adminPanel");
    if (adminPanel && data.user.role === "admin") {
      adminPanel.style.display = "block";
    }

    // ✅ Protect admin page itself
    if (window.location.pathname.includes("admin.html")) {
      if (data.user.role !== "admin") {
        alert("Access denied");
        window.location.href = "index.html";
      }
    }

  } catch (err) {
    console.error(err);
    logout();
  }
}


function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}