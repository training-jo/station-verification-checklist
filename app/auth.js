async function checkAuth() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  try {
    const res = await fetch("https://station-verification-checklist-backend.onrender.com/protected", {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const data = await res.json();

    if (!data.ok) {
      logout();
      return;
    }

    // ✅ Save user globally
    window.currentUser = data.user;

    // ✅ Expiration check
    const now = Date.now() / 1000;
    if (data.user.exp < now) {
      logout();
      return;
    }

    // ✅ Role-based UI
    if (data.user.role === "admin") {
      document.body.classList.add("admin");
    } else {
      document.body.classList.add("store");
    }

    // ✅ Show admin panel if exists
    setTimeout(() => {
    const adminPanel = document.getElementById("adminPanel");

    if (adminPanel && window.currentUser?.role === "admin") {
    adminPanel.style.display = "block";
    }
    }, 100);

    // ✅ Protect admin page
    if (window.location.pathname.includes("admin.html")) {
      if (data.user.role !== "admin") {
        alert("Access denied");
        window.location.href = "index.html";
      }
    }

  } catch (err) {
    console.error("Auth error:", err);
    logout();
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}