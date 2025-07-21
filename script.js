let cart = [];
let products = [
  { name: 'Smartphone', category:'electronics', location: 2, price: '$199', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400' },
  { name: 'Laptop', category:'electronics', location: 5, price: '$799', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400' },
  { name: 'Football', category:'sports', location: 3, price: '$25', image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=400' },
  { name: 'Blender', category:'kitchen', location: 4, price: '$45', image: 'https://images.unsplash.com/photo-1606788075761-7ad4d02b6f59?w=400' },
  { name: 'Dumbbells', category:'gym', location: 2, price: '$60', image: 'https://images.unsplash.com/photo-1571019613914-85f342cfd08e?w=400' },
  { name: 'Garden Hose', category:'gardening', location: 6, price: '$15', image: 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400' },
  { name: 'Tractor Tool', category:'farming', location: 8, price: '$120', image: 'https://images.unsplash.com/photo-1597309387834-2b4c09f55591?w=400' },
  { name: 'Trekking Bag', category:'trekking', location: 4, price: '$40', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400' },
  { name: 'Toy Car', category:'toys', location: 1, price: '$10', image: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5?w=400' }
];

function displayProducts(list) {
  const container = document.getElementById('productContainer');
  container.innerHTML = '';
  if(list.length === 0){
    container.innerHTML = '<p>No products found within given radius or category.</p>';
    return;
  }
  list.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Distance: ${product.location} km</p>
      <p>Category: ${product.category}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    container.appendChild(card);
  });
}

function searchProducts(){
  const query = document.getElementById('searchInput').value.toLowerCase();
  const radius = parseFloat(document.getElementById('radiusInput').value);
  const filtered = products.filter(p => {
    const matchQuery = p.name.toLowerCase().includes(query);
    const withinRadius = isNaN(radius) ? true : (p.location <= radius);
    return matchQuery && withinRadius;
  });
  displayProducts(filtered);
}

function filterCategory(cat){
  const filtered = products.filter(p => p.category === cat);
  displayProducts(filtered);
}

function addToCart(index){
  cart.push(products[index]);
  alert(products[index].name + ' added to cart');
}

function openCart(){
  const list = document.getElementById('cartItems');
  list.innerHTML = '';
  if(cart.length === 0){
    list.innerHTML = '<li>Cart is empty</li>';
  } else {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item.name + ' - ' + item.price;
      list.appendChild(li);
    });
  }
  document.getElementById('cartModal').style.display = 'flex';
}
function closeCart(){ document.getElementById('cartModal').style.display = 'none'; }

function openLogin(){ document.getElementById('loginModal').style.display = 'flex'; }
function closeLogin(){ document.getElementById('loginModal').style.display = 'none'; }

function sendOTP(){
  let phone = document.getElementById('phoneInput').value;
  if(phone.length < 10){ alert('Enter valid phone number'); return; }
  alert('OTP sent to ' + phone);
  closeLogin();
  document.getElementById('profilePhoneInput').value = phone;
  document.getElementById('profileModal').style.display = 'flex';
}

function closeProfile(){ document.getElementById('profileModal').style.display = 'none'; }
function saveProfile(){
  let name = document.getElementById('nameInput').value;
  let phone = document.getElementById('profilePhoneInput').value;
  let address = document.getElementById('addressInput').value;
  let pin = document.getElementById('pincodeInput').value;
  alert(`Profile Saved:\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nPincode: ${pin}`);
  closeProfile();
}

// Initial display
displayProducts(products);