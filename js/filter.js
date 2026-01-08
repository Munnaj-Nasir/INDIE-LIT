document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.category-filter');
    const products = document.querySelectorAll('.premium-card');

    filters.forEach(filter => {
        filter.addEventListener('change', () => {
            const activeFilters = Array.from(filters)
                .filter(f => f.checked)
                .map(f => f.value);

            products.forEach(product => {
                const productCategory = product.getAttribute('data-category');
                
                // Show product if no filters are selected OR if it matches a selected filter
                if (activeFilters.length === 0 || activeFilters.includes(productCategory)) {
                    product.style.display = 'block';
                    // Optional: Add a fade-in animation
                    product.style.opacity = '1';
                } else {
                    product.style.display = 'none';
                    product.style.opacity = '0';
                }
            });
        });
    });
});