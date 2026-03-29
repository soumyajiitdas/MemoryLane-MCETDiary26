import React from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Clock } from 'lucide-react';
import { timeAgo, getRandomGradient } from '../../utils/helpers';
import GlassCard from '../ui/GlassCard';

const MemoryPost = ({ post }) => {
  const avatarGradient = getRandomGradient(post.author);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
    >
      <GlassCard className="mb-6">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div 
            className="w-12 h-12 rounded-full flex-shrink-0 shadow-lg border border-[var(--color-glass-border)]"
            style={{ background: avatarGradient }}
          />
          
          <div className="flex-grow min-w-0">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="font-medium text-white truncate text-lg">{post.author}</h4>
              <div className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] flex-shrink-0">
                <Clock size={12} />
                <span>{timeAgo(post.timestamp)}</span>
              </div>
            </div>
            
            <p className="text-gray-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap break-words mb-4 font-light">
              {post.content}
            </p>
            
            {post.image && (
              <div 
                className="w-full h-64 md:h-80 rounded-xl mb-4"
                style={{ background: post.image }}
              />
            )}
            
            {/* Actions */}
            <div className="flex items-center gap-6 pt-3 border-t border-[var(--color-glass-border)]">
              <button className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-rose-400 transition-colors group">
                <Heart size={18} className="group-hover:fill-rose-400/20" />
                <span className="text-sm font-medium">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-blue-400 transition-colors">
                <MessageCircle size={18} />
                <span className="text-sm font-medium">{post.comments || 0}</span>
              </button>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default MemoryPost;
