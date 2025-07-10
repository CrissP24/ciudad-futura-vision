
import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useToast } from '@/hooks/use-toast';
import { BlogHeader } from '@/components/blog-management/BlogHeader';
import { BlogForm } from '@/components/blog-management/BlogForm';
import { BlogPostCard } from '@/components/blog-management/BlogPostCard';
import { EmptyBlogState } from '@/components/blog-management/EmptyBlogState';

export function BlogManagement() {
  const { 
    currentCity, 
    cities, 
    blogPosts, 
    addBlogPost, 
    updateBlogPost, 
    deleteBlogPost 
  } = useApp();
  const { toast } = useToast();
  
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    author: 'Administrador'
  });
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const cityInfo = cities.find(city => city.id === currentCity);
  const cityPosts = blogPosts.filter(post => post.city === currentCity);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    addBlogPost({
      ...newPost,
      city: currentCity,
      date: new Date().toISOString().split('T')[0]
    });

    resetForm();
    
    toast({
      title: "Publicación creada",
      description: "La nueva publicación ha sido agregada exitosamente.",
    });
  };

  const handleEditPost = (postId: string) => {
    const post = cityPosts.find(p => p.id === postId);
    if (post) {
      setNewPost({
        title: post.title,
        content: post.content,
        author: post.author
      });
      setEditingPost(postId);
      setShowNewPostForm(true);
    }
  };

  const handleUpdatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !newPost.title.trim() || !newPost.content.trim()) return;

    updateBlogPost(editingPost, {
      title: newPost.title,
      content: newPost.content,
      author: newPost.author
    });

    resetForm();
    
    toast({
      title: "Publicación actualizada",
      description: "La publicación ha sido actualizada exitosamente.",
    });
  };

  const handleDeletePost = (postId: string) => {
    deleteBlogPost(postId);
    toast({
      title: "Publicación eliminada",
      description: "La publicación ha sido eliminada del sistema.",
    });
  };

  const handleCancel = () => {
    resetForm();
  };

  const resetForm = () => {
    setNewPost({ title: '', content: '', author: 'Administrador' });
    setEditingPost(null);
    setShowNewPostForm(false);
  };

  const handleFormChange = (field: string, value: string) => {
    setNewPost(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <BlogHeader 
        cityName={cityInfo?.displayName}
        onNewPost={() => setShowNewPostForm(true)}
      />

      {showNewPostForm && (
        <BlogForm
          post={newPost}
          isEditing={!!editingPost}
          onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
          onCancel={handleCancel}
          onChange={handleFormChange}
        />
      )}

      <div className="grid gap-4">
        {cityPosts.length === 0 ? (
          <EmptyBlogState cityName={cityInfo?.displayName} />
        ) : (
          cityPosts.map((post) => (
            <BlogPostCard
              key={post.id}
              post={post}
              cityInfo={cityInfo}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
            />
          ))
        )}
      </div>
    </div>
  );
}
