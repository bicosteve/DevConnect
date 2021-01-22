import React from 'react';
import VideoItem from './VideoItem';

const Videolist = ({ videos, onSelectedVideo }) => {
  const renderedList = videos.map((video, index) => {
    return (
      <VideoItem onSelectedVideo={onSelectedVideo} key={index} video={video} />
    );
  });

  return <div className='ui relaxed divided list'>{renderedList}</div>;
};

export default Videolist;
