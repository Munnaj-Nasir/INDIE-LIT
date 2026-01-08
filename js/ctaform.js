document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.btn-subscribe');
    const input = this.querySelector('input');
    
    btn.innerText = "Subscribed!";
    btn.style.backgroundColor = "#28a745"; // Success Green
    input.value = "";
    
    setTimeout(() => {
        btn.innerText = "Subscribe";
        btn.style.backgroundColor = ""; 
    }, 3000);
});