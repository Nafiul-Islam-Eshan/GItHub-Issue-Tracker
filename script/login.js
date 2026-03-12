document.getElementById("signInBtn").addEventListener("click", (event) => {
    const userName = document.getElementById("usernameInput").value;
    const password = document.getElementById("passInput").value;

    if (userName === "admin" && password === "admin123"){
        window.location.href = "./issues.html";
    }
    else if (userName.length ===0  && password.length ===0){
        alert("Please give your name and password")
    }
    else alert("Wrong Password and Username");
})