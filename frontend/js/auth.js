const API_URL = "http://localhost:5000/api/auth";

// REGISTER
async function register(event) {
    if (event) event.preventDefault();

    const full_name = document.getElementById("full_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password")?.value;

    // Validation (if not already done by form validation)
    if (!full_name || !email || !password) {
        showToast("Please fill in all fields", "error");
        return;
    }

    if (confirm_password && password !== confirm_password) {
        showToast("Passwords do not match", "error");
        return;
    }

    // Show loading state
    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
        registerBtn.classList.add("loading");
        registerBtn.disabled = true;
    }

    const data = {
        full_name,
        email,
        password
    };

    try {
        const response = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            showToast(result.message || "Registration successful!", "success");
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            showToast(result.message || "Registration failed", "error");
            if (registerBtn) {
                registerBtn.classList.remove("loading");
                registerBtn.disabled = false;
            }
        }
    } catch (error) {
        console.error("Registration error:", error);
        showToast("Network error. Please check if the backend server is running.", "error");
        if (registerBtn) {
            registerBtn.classList.remove("loading");
            registerBtn.disabled = false;
        }
    }
}

// LOGIN
async function login(event) {
    if (event) event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Validation
    if (!email || !password) {
        showToast("Please enter email and password", "error");
        return;
    }

    // Show loading state
    const loginBtn = document.getElementById("loginBtn");
    if (loginBtn) {
        loginBtn.classList.add("loading");
        loginBtn.disabled = true;
    }

    const data = {
        email,
        password
    };

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.token) {
            // Store authentication data
            localStorage.setItem("token", result.token);
            localStorage.setItem("user_id", result.user.user_id);

            // Store user data for display purposes
            localStorage.setItem("user", JSON.stringify({
                user_id: result.user.user_id,
                full_name: result.user.full_name,
                email: result.user.email
            }));

            showToast("Login successful! Redirecting...", "success");

            setTimeout(() => {
                window.location.href = "dashboard.html";
            }, 1000);
        } else {
            showToast(result.message || "Invalid email or password", "error");
            if (loginBtn) {
                loginBtn.classList.remove("loading");
                loginBtn.disabled = false;
            }
        }
    } catch (error) {
        console.error("Login error:", error);
        showToast("Network error. Please check if the backend server is running on port 5000.", "error");
        if (loginBtn) {
            loginBtn.classList.remove("loading");
            loginBtn.disabled = false;
        }
    }
}

// LOGOUT
function logout() {
    localStorage.clear();
    showToast("Logged out successfully", "info");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
}

// Check if user is authenticated (for protected pages)
function checkAuth() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
        // Redirect to login if not authenticated
        window.location.href = "index.html";
        return false;
    }

    return true;
}

// Get current user data
function getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            console.error("Error parsing user data:", e);
            return null;
        }
    }
    return null;
}
