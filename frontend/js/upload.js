function uploadResume() {
    const fileInput = document.getElementById("resume");
    const formData = new FormData();

    formData.append("resume", fileInput.files[0]);
    formData.append("user_id", localStorage.getItem("user_id"));

    fetch("http://localhost:5000/api/resume/upload", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(result => {
        alert(result.message);
    });
}
