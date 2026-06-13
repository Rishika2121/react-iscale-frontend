import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ videoId }) => {
  const [videoData, setVideoData] = useState({ otp: '', playbackInfo: '' });
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
          // Some backends expect 'Bearer ' prefix, others don't. We use standard Bearer.
          headers['Authorization'] = `Bearer ${token}`;
          // Also adding a fallback token header just in case this specific API requires it:
          headers['x-auth-token'] = token;
        }

        // Call the VdoCipher API backend endpoint provided
        const response = await fetch('https://iscale-backend.onrender.com/api/video/play_video', {
          method: 'POST',
          headers: headers,
          // If a videoId is required by backend, we pass it. Otherwise, backend might have a default or take it from another param.
          body: JSON.stringify({ videoId: videoId || "sample_video_id" }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch video details');
        }

        const data = await response.json();
        
        // Handle common API response structures for otp and playbackInfo
        if (data.otp && data.playbackInfo) {
          setVideoData({ otp: data.otp, playbackInfo: data.playbackInfo });
        } else if (data.data && data.data.otp && data.data.playbackInfo) {
           setVideoData({ otp: data.data.otp, playbackInfo: data.data.playbackInfo });
        } else {
           // Fallback mechanism
           setVideoData({ 
             otp: data.otp || (data.data && data.data.otp), 
             playbackInfo: data.playbackInfo || (data.data && data.data.playbackInfo) 
           });
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
    return <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>Error loading video: {error}</div>;
  }

  if (!videoData.otp || !videoData.playbackInfo) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Video details not available. Please check the backend response.</div>;
  }

  return (
    <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#000', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
      <iframe
        src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}`}
        style={{ border: 0, width: '100%', height: '100%' }}
        allow="encrypted-media"
        allowFullScreen
        title="VdoCipher Video Player"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
