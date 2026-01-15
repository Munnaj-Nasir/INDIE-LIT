document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // You could add logic here to change the image to a second view
        console.log("Viewing " + card.querySelector('h3').innerText);
    });
});