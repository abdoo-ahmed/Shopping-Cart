import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const { addToCart, addToFavorites, favorites } = useContext(AppContext);
  const isFavorite = favorites.includes(product.id);

  function handleAddToCart() {
    const ok = addToCart(product.id);
    if (!ok) {
      window.location.href = '/login';
    }
  }

  function toggleFav() {
    if (isFavorite) window.location.href = '/login';
    else addToFavorites(product.id);
   
  }

  const heightImage = product.category === 'phone' ? 330 : product.category === 'smart watch' ? 240 : 200;

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className={`card h-100 p-3 border-info ${styles.productCard}`}>
        <img
          className="card-img-top mx-auto"
          src={product.image}
          alt={product.title}
          style={{ width: '80%', height: heightImage }}
        />
        <div className="card-body pb-0 ps-4">
          <p className="card-title fw-bold">Product: {product.title}.</p>
          <p className="card-text">Category: {product.category}.</p>
          <p className="card-text">Color: {product.color}.</p>
          <p className="card-text fw-bold">
            Price: <span><del>{product.price} EGP</del> {product.salePrice} EGP</span>
          </p>
        </div>
        <div className="card-footer bg-transparent border-0 d-flex justify-content-between align-items-center px-4">
          <button
            id={`add-btn-${product.id}`}
            className="btn btn-primary fw-bold"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
          <i
            id={`fav-${product.id}`}
            className={`${isFavorite ? 'fas' : 'far'} fa-heart fa-lg ${styles.favIcon}`}
            onClick={toggleFav}
          ></i>
        </div>
      </div>
    </div>
  );
}