document.addEventListener('DOMContentLoaded', (event) => {
    loadRecentItems();
});


const mockItems = [
    { id: 1, name: 'Brown Leather Wallet', location: 'Near Central Park entrance', date: '2 days ago', status: 'Lost', imageUrl: 'images.unsplash.com' },
    { id: 2, name: 'Black Umbrella', location: 'Bus Stop 4B', date: '1 day ago', status: 'Found', imageUrl: 'images.unsplash.com' },
    { id: 3, name: 'Silver Wedding Ring', location: 'Beach shore', date: '3 hours ago', status: 'Lost', imageUrl: 'images.unsplash.com' },
    { id: 4, name: 'Dog (Golden Retriever)', location: 'Oak Street, near school', date: '5 days ago', status: 'Lost', imageUrl: 'images.unsplash.com' },
    { id: 5, name: 'Keys on a Batman keychain', location: 'Coffee Shop on Main St.', date: 'Just now', status: 'Found', imageUrl: 'images.unsplash.com' },
    { id: 6, name: 'Laptop bag (Black)', location: 'Library 3rd floor', date: '4 hours ago', status: 'Found', imageUrl: 'images.unsplash.com' },
];

function loadRecentItems() {
    const itemsGrid = document.getElementById('itemsGrid');
    itemsGrid.innerHTML = ''; 
    
    mockItems.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');
        itemCard.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="item-card-image">
            <div class="item-card-content">
                <h4>${item.name}</h4>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Reported:</strong> ${item.date}</p>
                <span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span>
            </div>
        `;
        itemCard.addEventListener('click', () => {
            alert(`Viewing details for: ${item.name}`);
        });
        itemsGrid.appendChild(itemCard);
    });
}

function searchItem() {
    const query = document.getElementById('searchBox').value;
    if (query.trim()) {
        alert(`Searching for items matching: "${query}"`);
    } else {
        alert('Please enter a search term.');
    }
}

function loadMoreItems() {
    alert('Loading more items... (Functionality to be implemented in a database connection)');
}
