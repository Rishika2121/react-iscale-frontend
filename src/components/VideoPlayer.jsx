import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoading(true);
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
          headers['x-auth-token'] = token;
        }

        // Call the VdoCipher API backend endpoint provided
        console.log("Sending Topic ID:", videoId);
        const response = await fetch('https://iscale-backend.onrender.com/api/video/play_video', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
  topic_id: videoId
}) // Passed from EnrollCourseDetailsList
        });

        const data = await response.json();
        console.log("VIDEO RESPONSE:", data);
        
        if (data.status && data.src) {
           setVideoUrl(data.src);
        } else {
           throw new Error('Video URL not found in response');
        }
      } catch (err) {
        console.error('Error fetching video:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading Video Player...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>
        <p>Error loading video: {error}</p>
        <p style={{ fontSize: '12px', marginTop: '10px', color: '#94a3b8' }}>Debug Video ID: {String(videoId)}</p>
      </div>
    );
  }

  if (!videoUrl) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Video details not available. Please check the backend response.</div>;
  }

  return (
    <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <iframe
        src={videoUrl}
        style={{ border: 0, width: '100%', height: '100%' }}
        allow="encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        title="VdoCipher Video Player"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
