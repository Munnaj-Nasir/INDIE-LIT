document.addEventListener('DOMContentLoaded', () => {
    // 1. Verify the Cart system exists
    if (typeof Cart === 'undefined') {
        console.error("CRITICAL ERROR: 'Cart' object not found. Ensure cart-core.js is loaded first.");
        return;
    }

    const buttons = document.querySelectorAll('.add-cart');
    const sideSubtotal = document.getElementById('side-cart-subtotal');

    // Helper to update the sidebar total
    const updateSidebar = () => {
        if (sideSubtotal) {
            const total = Cart.subtotal ? Cart.subtotal() : 0;
            sideSubtotal.textContent = `£${parseFloat(total).toFixed(2)}`;
        }
    };

    // Initial UI update
    updateSidebar();

    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Extract data from the button attributes
            const id = btn.getAttribute('data-id');
            const title = btn.getAttribute('data-title');
            const price = btn.getAttribute('data-price');
            const image = btn.getAttribute('data-image');

            // Construct item object
            const item = {
                id: id,
                title: title,
                price: parseFloat(price),
                image: image,
                quantity: 1
            };

            // Call the add function from your cart-core.js
            try {
                Cart.add(item);
                
                // Visual Feedback
                const originalText = btn.textContent;
                btn.textContent = "ADDED ✓";
                btn.style.backgroundColor = "#27ae60";
                
                updateSidebar();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = "";
                }, 1000);

            } catch (error) {
                console.error("Failed to add to cart:", error);
            }
        });
    });
});