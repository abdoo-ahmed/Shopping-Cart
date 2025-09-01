import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const { products } = useContext(AppContext);
  const [mode, setMode] = useState('title');
  const [q, setQ] = useState('');

  const filtered = products.filter(p => {
    if (!q) return true;
    if (mode === 'title') return p.title.toLowerCase().includes(q.toLowerCase());
    return p.category.toLowerCase().includes(q.toLowerCase());
  });

  return (
    <main className='container'>
      
      <section className="searchDiv pt-4 container d-flex px-5">
        <div id="btnSeach" className="form-group me-2 col-6 p-0">
          <select
            className="form-control text-primary"
            id="searchOption"
            value={mode}
            onChange={e => {
              setMode(e.target.value);
              setQ('');
            }}
          >
            <option value="title">Search By Title</option>
            <option value="category">Search By Category</option>
          </select>
        </div>
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          className="form-control w-50 mb-4 col-6"
          type="text"
          id="search"
          placeholder={mode === 'title' ? 'Search By Title' : 'Search By Category'}
        />
      </section>

      
      <div className="Home m-0 mt-4">
        <div className="container px-5">
          <div className="products row">
            {filtered.length === 0 ? (
              <div className="col-12 text-center text-muted">No products yet</div>
            ) : (
              filtered.map(p => <ProductCard key={p.id} product={p} />)
            )}
          </div>
        </div>
      </div>

      <ul className="pagination justify-content-center mt-4">
        <li className="page-item disabled">
          <a className="page-link" href="#">Previous</a>
        </li>
        <li className="page-item active">
          <a className="page-link" href="#">1</a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">2</a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">Next</a>
        </li>
      </ul>
    </main>
  );
}
