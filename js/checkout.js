/********************** * AXT PREMIUM CHECKOUT ENGINE 
 * Version 2.0 - Refactored for Stability
 **********************/

const CheckoutManager = {
    config: {
        url: 'https://script.google.com/macros/s/AKfycbyst4ZCZIYFdGOsvBORifGSjwpHOX3_uS0LLm18lJoRE9s31hLZQ-W9cMKEZYL7yd3z/exec',
        currency: 'GBP',
        coupons: { 'SAVE10': 0.10, 'INDUSTRIAL20': 0.20 }
    },

    state: {
        cart: [],
        discount: 0,
        isSubmitting: false
    },

    init() {
        this.state.cart = this.getNormalizedCart();
        this.renderOrder();
        this.setupEventListeners();
    },

    // --- Data Management ---
    getNormalizedCart() {
        try {
            const raw = JSON.parse(localStorage.getItem('cart')) || [];
            return raw.map(it => ({
                id: it.id || 'N/A',
                name: it.name || 'Premium Asset',
                price: parseFloat(it.price) || 0,
                qty: parseInt(it.qty) || 1
            }));
        } catch (e) {
            console.error("Cart corruption detected:", e);
            return [];
        }
    },

    getTotals() {
        const subtotal = this.state.cart.reduce((sum, it) => sum + (it.price * it.qty), 0);
        const total = Math.max(0, subtotal - this.state.discount);
        return { subtotal, discount: this.state.discount, total };
    },

    // --- UI Rendering ---
    renderOrder() {
        const tbody = document.getElementById('orderLines');
        if (!tbody) return;

        tbody.innerHTML = this.state.cart.map(it => `
            <tr class="order-row">
                <td class="py-3">
                    <span class="fw-bold">${it.name}</span>
                    <span class="text-muted d-block small">Qty: ${it.qty}</span>
                </td>
                <td class="text-end py-3 fw-medium">${this.fmt(it.price * it.qty)}</td>
            </tr>
        `).join('');

        const { subtotal, discount, total } = this.getTotals();
        document.getElementById('cartSubtotal').textContent = this.fmt(subtotal);
        document.getElementById('orderTotal').textContent = this.fmt(total);
        
        const discRow = document.getElementById('rowDiscount');
        if (discount > 0) {
            discRow.classList.remove('d-none');
            document.getElementById('cartDiscount').textContent = `-${this.fmt(discount)}`;
        }
    },

    fmt(n) {
        return new Intl.NumberFormat('en-GB', { 
            style: 'currency', 
            currency: this.config.currency 
        }).format(n);
    },

    // --- Validation Logic ---
    validateForm(data) {
        const errors = [];
        if (this.state.cart.length === 0) errors.push("Cart is empty.");
        if (data.fullName.length < 3) errors.push("Full name is required.");
        if (!/^\S+@\S+\.\S+$/.test(data.email)) errors.push("Invalid email format.");
        if (data.address1.length < 5) errors.push("Detailed address is required.");
        if (data.zip.length < 3) errors.push("Valid Postal/ZIP required.");
        return errors;
    },

    // --- Network Actions ---
    async submitOrder() {
        if (this.state.isSubmitting) return;

        const msgEl = document.getElementById('checkoutMsg');
        const btn = document.getElementById('placeOrderBtn');
        
        const customer = {
            fullName: `${document.getElementById('c_fname').value} ${document.getElementById('c_lname').value}`.trim(),
            email: document.getElementById('c_email_address').value,
            phone: document.getElementById('c_phone').value,
            address1: document.getElementById('c_address').value,
            zip: document.getElementById('c_postal_zip').value,
            notes: document.getElementById('c_order_notes').value
        };

        const errors = this.validateForm(customer);
        if (errors.length > 0) {
            this.updateStatus(errors[0], 'text-danger');
            return;
        }

        try {
            this.setLoading(true);
            const { subtotal, total } = this.getTotals();
            
            const payload = {
                orderId: `AXT-${Date.now()}`,
                customer,
                items: this.state.cart,
                subtotal,
                total,
                timestamp: new Date().toISOString()
            };

            const response = await fetch(this.config.url, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (result.ok) {
                localStorage.removeItem('cart');
                window.location.href = `thankyou.html?order=${payload.orderId}`;
            } else {
                throw new Error(result.error || 'Server error');
            }
        } catch (err) {
            this.updateStatus("Order failed. Please check connection.", 'text-danger');
            console.error(err);
        } finally {
            this.setLoading(false);
        }
    },

    // --- Helpers ---
    setLoading(isLoading) {
        this.state.isSubmitting = isLoading;
        const btn = document.getElementById('placeOrderBtn');
        btn.disabled = isLoading;
        btn.innerHTML = isLoading ? 
            '<span class="spinner-border spinner-border-sm"></span> Processing...' : 
            'Place Order';
    },

    updateStatus(text, className) {
        const msg = document.getElementById('checkoutMsg');
        msg.textContent = text;
        msg.className = `small mt-2 ${className}`;
    },

    setupEventListeners() {
        document.getElementById('placeOrderBtn').onclick = (e) => {
            e.preventDefault();
            this.submitOrder();
        };

        document.getElementById('couponApplyBtn').onclick = (e) => {
            e.preventDefault();
            const code = document.getElementById('c_code').value.toUpperCase();
            const rate = this.config.coupons[code];
            if (rate) {
                const { subtotal } = this.getTotals();
                this.state.discount = subtotal * rate;
                this.updateStatus("Coupon applied successfully!", "text-success");
                this.renderOrder();
            } else {
                this.updateStatus("Invalid coupon code.", "text-danger");
            }
        };
    }
};

document.addEventListener('DOMContentLoaded', () => CheckoutManager.init());