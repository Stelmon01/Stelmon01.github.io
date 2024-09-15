import React from 'react';

function RandomSite({ sites }) {
  return (
    <section className="randomSite">
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

export default RandomSite;