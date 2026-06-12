const API_URL = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', (event) => {
    loadRecentItems();
});
 

let itemsPerPage = 8;   
let currentPage = 1;    
let allItems = [];     


async function loadRecentItems() {
    const itemsGrid = document.getElementById('itemsGrid');
    try {
        const response = await fetch(`${API_URL}/api/items`);
        if (!response.ok) throw new Error("Server responded with an error");

        allItems = await response.json();  // store all items
        displayItems(allItems.slice(0, itemsPerPage)); // show first batch
    } catch (error) {
        console.error("Fetch error:", error);
        itemsGrid.innerHTML = `<p>Error loading items. Is the server running?</p>`;
    }
}


function loadMoreItems() {
    currentPage++;
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;

    const nextItems = allItems.slice(start, end);

    if (nextItems.length === 0) {
        document.querySelector('.load-more-btn').style.display = 'none'; // hide button if no more items
        return;
    }

   
    nextItems.forEach(item => {
        const itemsGrid = document.getElementById('itemsGrid');
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');

        const folder = item.status === 'Lost' ? 'lost' : 'found';
        const imageSrc = item.imagePath ? `${API_URL}/uploads/${folder}/${item.imagePath}` : 'placeholder.jpg';

        itemCard.innerHTML = `
            <img src="${imageSrc}" alt="${item.itemName}" class="item-card-image">
            <div class="item-card-content">
                <h4>${item.itemName}</h4>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Reported:</strong> ${new Date(item.date).toLocaleDateString()}</p>
                <span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span>
            </div>
        `;

        itemCard.addEventListener('click', () => {
            alert(`Contact ${item.userName} at ${item.userMobile}`);
        });

        itemsGrid.appendChild(itemCard);
    });
}


function displayItems(items) {
    const itemsGrid = document.getElementById('itemsGrid');
    itemsGrid.innerHTML = ''; 

    if (items.length === 0) {
        itemsGrid.innerHTML = '<p>No items found.</p>';
        return;
    }

    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.classList.add('item-card');
        
        
        const folder = item.status === 'Lost' ? 'lost' : 'found';
        const imageSrc = item.imagePath ? `${API_URL}/uploads/${folder}/${item.imagePath}` : 'placeholder.jpg';

        itemCard.innerHTML = `
            <img src="${imageSrc}" alt="${item.itemName}" class="item-card-image">
            <div class="item-card-content">
                <h4>${item.itemName}</h4>
                <p><strong>Location:</strong> ${item.location}</p>
                <p><strong>Reported:</strong> ${new Date(item.date).toLocaleDateString()}</p>
                <span class="status-badge status-${item.status.toLowerCase()}">${item.status}</span>
            </div>
        `;
        
        itemCard.addEventListener('click', () => {
            alert(`Contact ${item.userName} at ${item.userMobile}`);
        });
        itemsGrid.appendChild(itemCard);
    });
}

async function searchItem() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    if (!query.trim()) return alert('Please enter a search term.');

    try {
        const response = await fetch(`${API_URL}/api/items`);
        allItems = await response.json();

        const filtered = allItems.filter(item =>
            item.itemName.toLowerCase().includes(query) ||
            item.location.toLowerCase().includes(query)
        );

        currentPage = 1; // reset pagination
        displayItems(filtered.slice(0, itemsPerPage));
    } catch (error) {
        console.error("Search failed:", error);
    }
}