document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('click', (e) => {
        const hotelTrigger = e.target.closest('.hotel-trigger');
        if (hotelTrigger) {
            const parent = hotelTrigger.closest('.hotel-parent');
            if (parent) {
                const hotelId = parent.getAttribute('data-hotel-id');
                const children = document.querySelectorAll(`.hotel-child-${hotelId}`);
                const isHidden = children.length > 0 && children[0].style.display === 'none';
                
                children.forEach(child => {
                    child.style.display = isHidden ? '' : 'none'; 
                });
            }
        }

        const journeyTrigger = e.target.closest('.journey-trigger');
        if (journeyTrigger) {
            const parent = journeyTrigger.closest('.journey-parent');
            if (parent) {
                const journeyId = parent.getAttribute('data-journey-id');
                const children = document.querySelectorAll(`.journey-child-${journeyId}`);
                const isHidden = children.length > 0 && children[0].style.display === 'none';
                
                children.forEach(child => {
                    child.style.display = isHidden ? '' : 'none'; 
                });
            }
        }
    });
});
