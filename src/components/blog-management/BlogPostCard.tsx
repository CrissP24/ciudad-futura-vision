
import React from 'react';
import { Edit3, Trash2, Calendar, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  city: string;
}

interface BlogPostCardProps {
  post: BlogPost;
  cityInfo: {
    displayName: string;
    color: string;
  } | undefined;
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
}

export function BlogPostCard({ post, cityInfo, onEdit, onDelete }: BlogPostCardProps) {
  return (
    <Card className="glass-effect border-white/10 hover:border-primary/20 transition-all">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <Badge className={`${cityInfo?.color} text-black`}>
                {cityInfo?.displayName}
              </Badge>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              {post.content}
            </p>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString('es-ES')}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2 ml-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(post.id)}
              className="text-blue-400 hover:text-blue-300"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(post.id)}
              className="text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
