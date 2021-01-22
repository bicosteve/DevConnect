import React, { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar';
import Videolist from './components/Videolist';
import VideoDetail from './components/VideoDetail';
import youtube from './api/youtube';

const Youtube = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    onSearchVideo('react programming');
  }, []);

  const onSearchVideo = async (video) => {
    try {
      const { data } = await youtube.get('/search', { params: { q: video } });
      setVideos(data.items);
      setSelectedVideo(data.items[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onSelectedVideo = (video) => {
    setSelectedVideo(video);
  };

  return (
    <div className='ui container'>
      <SearchBar onSearchVideo={onSearchVideo} />
      <div className='ui grid'>
        <div className='ui row'>
          <div className='eleven wide column'>
            <VideoDetail video={selectedVideo} />
          </div>
          <div className='five wide column'>
            <Videolist onSelectedVideo={onSelectedVideo} videos={videos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Youtube;
