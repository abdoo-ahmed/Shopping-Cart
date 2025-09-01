import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function CartItem({ item }) {
  const { changeQuantity, removeFromCart } = useContext(AppContext);

  return (
    <div id={`product-${item.id}`} className="product-item col-6 mb-4">
      <div className="card border border-info h-100">
        <div className="row g-0">
          
          <div className="col-md-4 d-flex align-items-center">
            <img
              className="product-item-img img-fluid p-3"
              src={item.image}
              alt={item.title}/>
          </div>

          
          <div className="col-md-8">
            <div className="card-body pb-2">
              <p className="card-title fw-bold">Product: {item.title}</p>
              <p className="card-text">Category: {item.category}</p>
              <p className="card-text">Color: {item.color}</p>
              <p className="card-text">
                Price:{' '}
                <span>
                  <del className="text-muted">{item.price}</del>{' '}
                  <span className="fw-bold text-success">EGP {item.salePrice}</span>
                </span>
              </p>
            </div>

            
            <div className="card-footer bg-white border-0 d-flex justify-content-between align-items-center">
              <button
                id={`remove-btn-${item.id}`}
                className="RemoveFromCartBtn btn btn-primary btn-sm"
                onClick={() => removeFromCart(item.id)}>

                Remove From Cart
                
              </button>

              <div className="d-flex align-items-center">
                <button
                  className="btn btn-outline-danger btn-sm me-2 fw-bold"
                  onClick={() => changeQuantity(item.id, -1)}
                >
                  −
                </button>
                <span
                  id={`quantity-${item.id}`}
                  className="fs-5 text-primary fw-bold"
                >
                  {item.quantity}
                </span>
                <button
                  className="btn btn-outline-success btn-sm ms-2 fw-bold"
                  onClick={() => changeQuantity(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
