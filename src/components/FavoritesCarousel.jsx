import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function FavoritesCarousel() {
    const { favorites, products, removeFromFavorites } = useContext(AppContext);
if (!favorites.length) return <div className="text-center">No favorites yet</div>;


const itemsPerSlide = 3;
const slides = [];
for (let i = 0; i < favorites.length; i += itemsPerSlide) {
const chunk = favorites.slice(i, i + itemsPerSlide);
slides.push(chunk);
}

return (
<div id="favoritesCarousel" className="carousel slide" data-ride="carousel">
<div className="carousel-inner">
{slides.map((chunk, idx) => (
<div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
<div className="row">
{chunk.map(id => {
const item = products.find(p => p.id === id);
if (!item) return null;
return (
<div key={id} className="col-4">
<div className="card border border-info pt-3">
<img className="product-item-img card-img-top m-auto" src={item.image} alt={item.title} style={{ width: '80%', height: 150 }} />
<div className="row">
<div className="product-itm-desc card-body pb-2 pl-4 col-10">
<p className="card-title">Product: {item.title}.</p>
<p className="card-text">Category: {item.category}.</p>
</div>
<div className="product-item-action d-flex justify-content-between mt-4 pt-4 col-2">
<i id={`fav-${item.id}`} className={`fas fa-heart`} onClick={() => removeFromFavorites(item.id)}></i>
</div>
</div>
</div>
</div>
);
})}
</div>
</div>
))}
</div>
</div>
);
}