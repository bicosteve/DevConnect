import React from 'react';

const VideoItem = ({ video, onSelectedVideo }) => {
  // console.log(video);
  return (
    <div onClick={() => onSelectedVideo(video)} className='video-item item'>
      <img
        alt='video.snippet.description'
        className='ui image'
        src={video.snippet.thumbnails.medium.url}
      />
      <div className='content'>
        <div className='header'>{video.snippet.title}</div>
      </div>
    </div>
  );
};

export default VideoItem;
