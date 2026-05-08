document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.hotel-trigger');
        if (trigger) {
            const parent = trigger.closest('.hotel-parent');
            if (parent) {
                const hotelId = parent.getAttribute('data-hotel-id');
                const children = document.querySelectorAll(`.hotel-child-${hotelId}`);
                const isHidden = children.length > 0 && children[0].style.display === 'none';
                
                children.forEach(child => {
                    child.style.display = isHidden ? '' : 'none'; 
                });
            }
        }
    });
});
