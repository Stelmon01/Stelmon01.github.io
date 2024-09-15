import React from 'react';

function Category({ category, sites }) {
  return (
    <section className="category">
      <h2>{category}</h2>
      <ul>
        {sites.map((site) => (
          <li key={site.name}>
            <p><a href={site.link} target="_blank" rel="noopener noreferrer">{site.name}</a></p>
            <p>{site.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Category;