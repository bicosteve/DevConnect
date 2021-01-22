import axios from 'axios';

//const KEY = 'AIzaSyAy8sV7oXoBmgNxqBhwS-IooDjju8hcd2Q';

const youtube = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 5,
    key: 'AIzaSyAy8sV7oXoBmgNxqBhwS-IooDjju8hcd2Q',
  },
});

export default youtube;
