(function () {
  const API_BASE = typeof window !== "undefined" && window.API_BASE ? window.API_BASE : "";
  const TOKEN_KEY = "portfolio_admin_token";

  const loginSection = document.getElementById("login-section");
  const dashboardSection = document.getElementById("dashboard-section");
  const loginForm = document.getElementById("login-form");
  const loginMsg = document.getElementById("login-msg");
  const messagesList = document.getElementById("messages-list");
  const messagesEmpty = document.getElementById("messages-empty");
  const logoutBtn = document.getElementById("logout-btn");

  function getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }
  function setToken(token) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  }

  function showMsg(el, text, isError) {
    if (!el) return;
    el.textContent = text;
    el.classList.toggle("error", !!isError);
  }

  function showDashboard() {
    if (loginSection) loginSection.classList.add("hidden");
    if (dashboardSection) dashboardSection.classList.remove("hidden");
    loadMessages();
  }
  function showLogin() {
    setToken(null);
    if (dashboardSection) dashboardSection.classList.add("hidden");
    if (loginSection) loginSection.classList.remove("hidden");
  }

  if (getToken() && API_BASE) {
    fetch(`${API_BASE}/api/auth/me`, {
      headers: { Authorization: "Bearer " + getToken() },
    })
      .then((r) => (r.ok ? showDashboard() : showLogin()))
      .catch(() => showLogin());
  } else {
    showLogin();
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      showMsg(loginMsg, "Signing in…", false);
      if (!API_BASE) {
        showMsg(loginMsg, "API not configured. Set window.API_BASE and run the backend.", true);
        return;
      }
      try {
        const res = await fetch(`${API_BASE}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: loginForm.email.value.trim(),
            password: loginForm.password.value,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success && data.data && data.data.token) {
          setToken(data.data.token);
          showMsg(loginMsg, "", false);
          showDashboard();
        } else {
          showMsg(loginMsg, data.message || "Login failed.", true);
        }
      } catch (err) {
        showMsg(loginMsg, "Network error. Is the backend running?", true);
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      showLogin();
    });
  }

  function loadMessages() {
    if (!messagesList || !API_BASE || !getToken()) return;
    fetch(`${API_BASE}/api/messages`, {
      headers: { Authorization: "Bearer " + getToken() },
    })
      .then((r) => r.json())
      .then((json) => {
        if (!json.success || !json.data) {
          messagesList.innerHTML = "";
          if (messagesEmpty) messagesEmpty.classList.remove("hidden");
          return;
        }
        const list = json.data;
        if (messagesEmpty) messagesEmpty.classList.toggle("hidden", list.length > 0);
        messagesList.innerHTML = list
          .map(
            (m) =>
              `<li data-id="${m.id}">
                <div class="meta">${escapeHtml(m.name)} &middot; ${escapeHtml(m.email)} &middot; ${m.createdAt || ""}</div>
                <div class="body">${escapeHtml(m.message)}</div>
                <button type="button" class="delete-msg">Delete</button>
              </li>`
          )
          .join("");
        messagesList.querySelectorAll(".delete-msg").forEach((btn) => {
          btn.addEventListener("click", function () {
            const id = this.closest("li").dataset.id;
            deleteMessage(id);
          });
        });
      })
      .catch(() => {
        messagesList.innerHTML = "";
        if (messagesEmpty) {
          messagesEmpty.textContent = "Failed to load messages.";
          messagesEmpty.classList.remove("hidden");
        }
      });
  }

  function deleteMessage(id) {
    if (!API_BASE || !getToken()) return;
    fetch(`${API_BASE}/api/messages/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + getToken() },
    })
      .then((r) => {
        if (r.ok) {
          const li = messagesList.querySelector(`[data-id="${id}"]`);
          if (li) li.remove();
          if (messagesList.children.length === 0 && messagesEmpty) {
            messagesEmpty.textContent = "No messages yet.";
            messagesEmpty.classList.remove("hidden");
          }
        }
      })
      .catch(() => {});
  }

  function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }
})();
