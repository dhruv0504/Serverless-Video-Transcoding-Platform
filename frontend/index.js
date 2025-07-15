// // pages/index.js
// import { useState, useEffect } from 'react';
// import VideoUpload from '../components/VideoUpload';
// import VideoList from '../components/VideoList';

// export default function Home() {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     // Fetch the list of videos from your API
//     fetchVideos();
//   }, []);

//   const fetchVideos = async () => {
//     // Replace with your actual API endpoint
//     const response = await fetch('/api/videos');
//     const data = await response.json();
//     setVideos(data);
//   };

//   const handleUploadSuccess = (newVideo) => {
//     setVideos([...videos, newVideo]);
//   };

//   return (
//     <div>
//       <h1>Video Upload and Streaming</h1>
//       <VideoUpload onUploadSuccess={handleUploadSuccess} />
//       <VideoList videos={videos} onStatusChange={fetchVideos} />
//     </div>
//   );
// }

// // components/VideoUpload.js
// import { useState } from 'react';

// export default function VideoUpload({ onUploadSuccess }) {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append('video', file);

//     // Replace with your actual upload API endpoint
//     const response = await fetch('/api/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     const newVideo = await response.json();
//     onUploadSuccess(newVideo);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleFileChange} accept="video/*" />
//       <button type="submit">Upload</button>
//     </form>
//   );
// }

// // components/VideoList.js
// import VideoPlayer from './VideoPlayer';

// export default function VideoList({ videos, onStatusChange }) {
//   useEffect(() => {
//     // Set up a websocket or polling mechanism to listen for status changes
//     // When a change is detected, call onStatusChange()
//   }, []);

//   return (
//     <ul>
//       {videos.map((video) => (
//         <li key={video.id}>
//           {video.title} - Status: {video.status}
//           {video.status === 'processed' && (
//             <VideoPlayer src={video.hlsUrl} />
//           )}
//         </li>
//       ))}
//     </ul>
//   );
// }

// // components/VideoPlayer.js
// import { useEffect, useRef } from 'react';
// import Hls from 'hls.js';

// export default function VideoPlayer({ src }) {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       const video = videoRef.current;

//       if (Hls.isSupported()) {
//         const hls = new Hls();
//         hls.loadSource(src);
//         hls.attachMedia(video);
//         hls.on(Hls.Events.MANIFEST_PARSED, () => {
//           video.play();
//         });
//       } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
//         video.src = src;
//         video.addEventListener('loadedmetadata', () => {
//           video.play();
//         });
//       }
//     }
//   }, [src]);

//   return <video ref={videoRef} controls />;
// }