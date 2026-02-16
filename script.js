// ================= LOGIN / SIGNUP MODAL =================
let loginModal, signupModal;
window.onload = () => {
    loginModal = createModal("Login");
    signupModal = createModal("Sign Up");

    document.body.appendChild(loginModal);
    document.body.appendChild(signupModal);

    // Check if already logged in
    if (!localStorage.getItem("FirmsAcademyUser")) {
        showLogin();
    }
};

// Modal creation
function createModal(type) {
    let modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${type}</h2>
            ${type === "Login" ? `
            <input type="email" id="loginEmail" placeholder="Email">
            <input type="password" id="loginPassword" placeholder="Password">
            <button onclick="login()">Login</button>
            <p>Don't have an account? <span onclick="showSignup()" style="color:#6366f1;cursor:pointer;">Sign Up</span></p>
            ` : `
            <input type="text" id="signupName" placeholder="Full Name">
            <input type="email" id="signupEmail" placeholder="Email">
            <input type="password" id="signupPassword" placeholder="Password">
            <button onclick="signup()">Create Account</button>
            <p>Already have an account? <span onclick="showLogin()" style="color:#6366f1;cursor:pointer;">Login</span></p>
            `}
        </div>
    `;
    modal.style.display = "none";
    return modal;
}

// Show login modal
function showLogin() {
    loginModal.style.display = "flex";
    signupModal.style.display = "none";
}

// Show signup modal
function showSignup() {
    signupModal.style.display = "flex";
    loginModal.style.display = "none";
}

// Close modals
function closeModals() {
    loginModal.style.display = "none";
    signupModal.style.display = "none";
}

// Signup function
function signup() {
    let name = document.getElementById("signupName").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;

    if(name && email && password){
        localStorage.setItem("FirmsAcademyUser", JSON.stringify({name, email}));
        alert("Account created successfully!");
        closeModals();
    } else {
        alert("Please fill all fields.");
    }
}

// Login function
function login() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    let user = JSON.parse(localStorage.getItem("FirmsAcademyUser"));
    if(user && user.email === email){
        alert("Login successful!");
        closeModals();
    } else {
        alert("User not found! Please signup.");
        showSignup();
    }
}

// ================= COURSE ACCESS CONTROL =================
document.querySelectorAll(".course-card a, .btn-primary").forEach(link => {
    link.addEventListener("click", function(e){
        let user = localStorage.getItem("FirmsAcademyUser");
        if(!user){
            e.preventDefault();
            showLogin();
        }
    });
});

// ================= LOGOUT FUNCTION (Optional) =================
function logout() {
    localStorage.removeItem("FirmsAcademyUser");
    alert("You have logged out.");
    showLogin();
}
