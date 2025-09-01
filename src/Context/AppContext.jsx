import React, { createContext, useEffect, useState } from 'react';


export const AppContext = createContext();


const initialProducts = [
{ id: 1, title: "Dell G15-5520", category: "Labtop", color: "Black", price: 36870, salePrice: 36270, image: "/images/Labtop1.jpg" },
{ id: 2, title: "Lenovo V15", category: "Labtop", color: "gray", price: 13333, salePrice: 13011, image: "/images/Labtop2.jpg" },
{ id: 3, title: "HP Victus", category: "Labtop", color: "Black", price: 47699, salePrice: 47438, image: "/images/Labtop3.jpg" },
{ id: 4, title: "Dell Vostro", category: "Labtop", color: "Black", price: 29660, salePrice: 29320, image: "/images/Labtop4.jpg" },
{ id: 5, title: "R50i", category: "Earbuds", color: "Black", price: 1699, salePrice: 1399, image: "/images/Earbuds1.jpg" },
{ id: 6, title: "R100", category: "Earbuds", color: "White", price: 1600, salePrice: 1499, image: "/images/Earbuds.jpg" },
{ id: 7, title: "Life P2", category: "Earbuds", color: "Black", price: 2899, salePrice: 2699, image: "/images/Earbuds3.jpg" },
{ id: 8, title: "Life Note E", category: "Earbuds", color: "Black", price: 2485, salePrice: 1600, image: "/images/Earbuds4.jpg" },
{ id: 9, title: "Generic", category: "Over Ear", color: "Blue", price: 215, salePrice: 185, image: "/images/Over Ear1.jpg" },
{ id: 10, title: "Panduo", category: "smart watch", color: "Green", price: 450, salePrice: 375, image: "/images/smartwatch1.jpg" },
{ id: 11, title: "Muktrics", category: "smart watch", color: "Black", price: 400, salePrice: 350, image: "/images/smartwatch2.jpg" },
{ id: 12, title: "BigPlayer", category: "smart watch", color: "Brown", price: 730, salePrice: 650, image: "/images/smartwatch3.jpg" },
{ id: 13, title: "Samsung Galaxy A34", category: "phone", color: "Awesome Silver", price: 11286, salePrice: 10400, image: "/images/phone1.jpg" },
{ id: 14, title: "A24", category: "phone", color: "Black", price: 49900, salePrice: 38090, image: "/images/phone2.jpg" },
{ id: 15, title: "Oppo Reno 8T", category: "phone", color: "gray", price: 12793, salePrice: 12445, image: "/images/phone3.jpg" },
{ id: 16, title: "Galaxy S22", category: "phone", color: "Green", price: 24299, salePrice: 24899, image: "/images/phone4.jpg" },
{ id: 17, title: "Galaxy S22 Ultra", category: "phone", color: "Phantom Black", price: 32800, salePrice: 33400, image: "/images/phone5.jpg" },
{ id: 18, title: "Galaxy S21", category: "phone", color: "Light Green", price: 21990, salePrice: 19299, image: "/images/phone6.jpg" },
{ id: 19, title: "Galaxy Z Fold5", category: "phone", color: "Light blue", price: 73930, salePrice: 66000, image: "/images/phone7.jpg" },
];

export function AppProvider({ children }) {
const [user, setUser] = useState(() => localStorage.getItem('userName') || '');
const [products] = useState(() => {
try {
const saved = localStorage.getItem('products:v1');
return saved ? JSON.parse(saved) : initialProducts;
} catch {
return initialProducts;
}
});



const [cart, setCart] = useState(() => {
try { return JSON.parse(localStorage.getItem('proudectInCart')) || []; } catch { return []; }
});
const [favorites, setFavorites] = useState(() => {
try { return JSON.parse(localStorage.getItem('favorites')) || []; } catch { return []; }
});
const [totalPrice, setTotalPrice] = useState(() => +(localStorage.getItem('totalPrice')) || 0);


useEffect(() => {
localStorage.setItem('proudectInCart', JSON.stringify(cart));
}, [cart]);
useEffect(() => {
localStorage.setItem('favorites', JSON.stringify(favorites));
}, [favorites]);
useEffect(() => {
localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
}, [totalPrice]);
useEffect(() => {
if (user) localStorage.setItem('userName', user);
else localStorage.removeItem('userName');
}, [user]);

function login(name, pass) {
const storedName = localStorage.getItem('userName');
const storedPass = localStorage.getItem('password');
if (storedName && storedPass && storedName.trim() === name.trim() && storedPass.trim() === pass.trim()) {
setUser(name);
return true;
}
return false;
}

function logout() {
localStorage.clear();
setUser('');
setCart([]);
setFavorites([]);
setTotalPrice(0);
}
function register(name, email, pass) {
localStorage.setItem('userName', name);
localStorage.setItem('email', email);
localStorage.setItem('password', pass);
return true;
}

function addToCart(productId) {
  if (!user) return false;
  const prod = products.find(p => p.id === productId);
  if (!prod) return;

  setCart(prev => {
    const exists = prev.find(p => p.id === productId);

    if (exists) {
      
      const next = prev.map(p =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      );
      setTotalPrice(prevTotal => prevTotal + prod.salePrice);
      return next;
    } else {
      // منتج جديد -> ضيفه
      const qty = +(localStorage.getItem(`quantity-${productId}`)) || 1;
      const next = [...prev, { ...prod, quantity: qty }];

      setTotalPrice(prevTotal => prevTotal + prod.salePrice * qty);
      return next;
    }
  });

  return true;
}


function removeFromCart(productId) {
setCart(prev => prev.filter(p => p.id !== productId));
// Recalculate total
setTotalPrice(prev => {
const prod = products.find(p => p.id === productId);
if (!prod) return prev;
const qty = +(localStorage.getItem(`quantity-${productId}`)) || 1;
return prev - prod.salePrice * qty;
});
}



function changeQuantity(productId, delta) {
setCart(prev => {
const next = prev.map(p => p.id === productId ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p);
return next;
});
const prod = products.find(p => p.id === productId);
if (prod) setTotalPrice(t => t + prod.salePrice * delta);
localStorage.setItem(`quantity-${productId}`, String((+(localStorage.getItem(`quantity-${productId}`)) || 1) + delta));
}

function addToFavorites(productId) {
if (!user) return false;
setFavorites(prev => {
if (prev.includes(productId)) return prev;
return [...prev, productId];
});
return true;
}
function removeFromFavorites(productId) {
setFavorites(prev => prev.filter(id => id !== productId));
}


return (
<AppContext.Provider value={{ user, products, cart, favorites, totalPrice, login, logout, register, addToCart, removeFromCart, changeQuantity, addToFavorites, removeFromFavorites }}>
{children}
</AppContext.Provider>
);


}

