import React from 'react';

import Spinner from './Spinner';

const VideoDetail = ({ video }) => {
  if (!video) {
    return <Spinner className='spinner-item' />;
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div className='ui container'>
      <div className='ui segment'>
        <div className='ui embed'>
          <iframe title={video.id.videoId} src={videoSrc} />
        </div>
        <div className='ui segment'>
          <h4 className='ui header'>{video.snippet.title}</h4>
          <p>{video.snippet.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
