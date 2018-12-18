import React from 'react';
import './style.css';

function SearchResultItem({ url = 'https://www.google.com', title = 'Your Website Title', description = 'Your website description'}) {
  return (
    <div className='flex flex-column ba b--black pa3  pointer'>
      <div>
        <a href={url} className='no-underline' >
          <div className='f4 fw5 mb1 title'>{title}</div>
          <div className='dark-green fw5 mb1 flex items-center'>
            {url}
            <i className="fas fa-caret-down ml1"></i>
          </div>
        </a>
      </div>
      <div className='black-70'>
        {description}
      </div>
    </div>
  );
}

export default SearchResultItem;
