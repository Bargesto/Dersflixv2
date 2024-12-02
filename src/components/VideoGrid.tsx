import { Link } from 'react-router-dom';
import { Video } from '../types';
import { getThumbnailUrl } from '../utils/videoHelpers';
import { Star, CheckCircle } from 'lucide-react';

interface VideoGridProps {
  videos: Video[];
}

const VideoGrid = ({ videos }: VideoGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <Link
          key={video.id}
          to={`/watch/${video.id}`}
          className="bg-gray-800 rounded-md overflow-hidden hover:scale-105 transition group"
        >
          <div className="relative">
            <img
              src={getThumbnailUrl(video.platform, video.videoId)}
              alt={video.title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute top-2 right-2 flex gap-2">
              {video.watched && (
                <div className="bg-green-600 p-1 rounded-full">
                  <CheckCircle size={16} />
                </div>
              )}
              {video.favorite && (
                <div className="bg-yellow-600 p-1 rounded-full">
                  <Star size={16} fill="currentColor" />
                </div>
              )}
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg">{video.title}</h3>
            <p className="text-gray-400 text-sm">
              Class {video.class} - {video.subject}
            </p>
            <span className="text-xs text-gray-500 uppercase mt-2 inline-block">
              {video.platform}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VideoGrid;