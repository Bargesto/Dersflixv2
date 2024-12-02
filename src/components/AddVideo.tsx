import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video } from '../types';
import { useAuth } from '../context/AuthContext';
import { extractVideoInfo } from '../utils/videoHelpers';

const AddVideo = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    videoUrl: '',
    class: '',
    subject: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const videoInfo = extractVideoInfo(formData.videoUrl);
      if (!videoInfo) {
        setError('Please enter a valid video URL from YouTube, Vimeo, or Dailymotion');
        return;
      }

      const newVideo: Video = {
        id: crypto.randomUUID(),
        title: formData.title,
        videoUrl: formData.videoUrl,
        platform: videoInfo.platform,
        videoId: videoInfo.videoId,
        class: formData.class,
        subject: formData.subject,
        userId: user!.id,
        watched: false,
        favorite: false,
        createdAt: new Date(),
      };

      // Store in localStorage
      const existingVideos = localStorage.getItem('videos');
      const videos = existingVideos ? JSON.parse(existingVideos) : [];
      videos.push(newVideo);
      localStorage.setItem('videos', JSON.stringify(videos));

      navigate('/');
    } catch (error) {
      setError('Error adding video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add New Video</h2>
      {error && (
        <div className="bg-red-500 text-white p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-gray-800 rounded-md px-4 py-2"
          />
        </div>
        <div>
          <label className="block mb-1">Video URL</label>
          <input
            type="url"
            required
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            className="w-full bg-gray-800 rounded-md px-4 py-2"
            placeholder="Enter YouTube, Vimeo, or Dailymotion URL"
          />
        </div>
        <div>
          <label className="block mb-1">Class</label>
          <input
            type="text"
            required
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            className="w-full bg-gray-800 rounded-md px-4 py-2"
            placeholder="9, 10, 11, etc."
          />
        </div>
        <div>
          <label className="block mb-1">Subject</label>
          <input
            type="text"
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            className="w-full bg-gray-800 rounded-md px-4 py-2"
            placeholder="Mathematics, Physics, etc."
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? 'Adding Video...' : 'Add Video'}
        </button>
      </form>
    </div>
  );
};

export default AddVideo;