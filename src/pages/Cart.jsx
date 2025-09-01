import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import CartItem from '../components/CartItem';
import FavoritesCarousel from '../components/FavoritesCarousel';

export default function CartPage() {
    const { cart, totalPrice } = useContext(AppContext);

    return (
<div>
<section className="fav pt-4">
<div className="container mt-4 pt-4">
<div className="products row">
{cart.length === 0 ? (
<div className="col-12 text-center text-muted">Cart is empty</div>
) : (
cart.map(item => <CartItem key={item.id} item={item} />)
)}
</div>
</div>


<div className="total d-flex justify-content-center border-bottom mb-4 pt-2 pb-4" style={{ fontSize: 20 }}>
<h5 className="totalTitle mr-3">Total</h5>
<div className="totalPrice mr-2">{totalPrice.toFixed ? totalPrice.toFixed(2) : totalPrice}</div>
</div>
</section>


<div className="fav bg-primary text-white" style={{ minHeight: '100vh' }}>
<div className="fav-Header mb-4">
<h2 className="fav-header-title text-center text-white">Favorites</h2>
<div className="line bg-light" style={{ height: 2, margin: '0 auto', width: 100 }}></div>
</div>
<section className="container mt-4 pt-4">
<FavoritesCarousel />
</section>
</div>
</div>
);

}