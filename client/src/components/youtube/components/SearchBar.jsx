import React, { useState } from 'react';

const SearchBar = ({ onSearchVideo }) => {
  const [video, setVideo] = useState('');

  const onInputChange = (event) => {
    setVideo(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    onSearchVideo(video);
    setVideo('');
  };

  return (
    <div className='search-item ui segment'>
      <form className='ui form' onSubmit={onFormSubmit}>
        <div className='field'>
          <input
            value={video}
            onChange={onInputChange}
            type='text'
            placeholder='Search for a video...'
          />
        </div>
        <button className='ui button' type='submit'>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
