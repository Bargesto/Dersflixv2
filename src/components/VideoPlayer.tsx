import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { Video } from '../types';
import { ArrowLeft, Star, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const VideoPlayer = () => {
  const { videoId } = useParams();
  const [video, setVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchVideo = () => {
      if (!videoId) return;
      
      try {
        const storedVideos = localStorage.getItem('videos');
        const videos: Video[] = storedVideos ? JSON.parse(storedVideos) : [];
        const foundVideo = videos.find(v => v.id === videoId);
        if (foundVideo) {
          setVideo(foundVideo);
        }
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [videoId]);

  const updateVideoStatus = async (updates: Partial<Video>) => {
    if (!video || !user) return;

    try {
      const storedVideos = localStorage.getItem('videos');
      const videos: Video[] = storedVideos ? JSON.parse(storedVideos) : [];
      const updatedVideos = videos.map(v => 
        v.id === video.id ? { ...v, ...updates } : v
      );
      localStorage.setItem('videos', JSON.stringify(updatedVideos));
      setVideo({ ...video, ...updates });
    } catch (error) {
      console.error('Error updating video:', error);
    }
  };

  const toggleWatched = () => {
    if (!user) return;
    updateVideoStatus({ watched: !video?.watched });
  };

  const toggleFavorite = () => {
    if (!user) return;
    updateVideoStatus({ favorite: !video?.favorite });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!video) {
    return <div>Video not found</div>;
  }

  const renderVideoPlayer = () => {
    if (video.platform === 'embed') {
      return (
        <div 
          className="w-full h-full"
          dangerouslySetInnerHTML={{ 
            __html: video.videoId.includes('<iframe') 
              ? video.videoId 
              : `<iframe src="${video.videoId}" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`
          }}
        />
      );
    }

    return (
      <ReactPlayer
        url={video.videoUrl}
        width="100%"
        height="100%"
        controls
        playing
      />
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="flex items-center gap-2 mb-4 text-gray-400 hover:text-white">
        <ArrowLeft size={20} />
        Back to Dashboard
      </Link>
      <div className="aspect-video mb-4 bg-gray-900">
        {renderVideoPlayer()}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
          <p className="text-gray-400">
            Class {video.class} - {video.subject}
          </p>
          <span className="text-sm text-gray-500 uppercase mt-2 inline-block">
            {video.platform}
          </span>
        </div>
        {user && (
          <div className="flex gap-4">
            <button
              onClick={toggleWatched}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                video.watched
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <CheckCircle size={20} />
              {video.watched ? 'Watched' : 'Mark as Watched'}
            </button>
            <button
              onClick={toggleFavorite}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition ${
                video.favorite
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Star
                size={20}
                fill={video.favorite ? 'currentColor' : 'none'}
              />
              {video.favorite ? 'Favorited' : 'Add to Favorites'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;