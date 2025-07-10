
import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function BlogSection() {
  const { currentCity, blogPosts, cities } = useApp();
  const cityPosts = blogPosts.filter(post => post.city === currentCity).slice(0, 3);
  const cityInfo = cities.find(city => city.id === currentCity);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Noticias y Eventos
          </span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Mantente informado sobre las últimas innovaciones y eventos en {cityInfo?.displayName}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cityPosts.map((post, index) => (
          <Card 
            key={post.id} 
            className="glass-effect border-white/10 hover:border-primary/30 transition-all duration-300 group hover:scale-105"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between mb-3">
                <Badge className={`${cityInfo?.color} text-black`}>
                  {cityInfo?.displayName}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(post.date)}
                </div>
              </div>
              <CardTitle className="text-xl font-semibold leading-tight line-clamp-2">
                {post.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                {post.content}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:text-primary/80 p-0 h-auto group-hover:translate-x-1 transition-transform"
                >
                  Leer más
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {cityPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="glass-effect rounded-lg p-8 max-w-md mx-auto">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${cityInfo?.gradient} mx-auto mb-4 flex items-center justify-center`}>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No hay noticias disponibles</h3>
            <p className="text-muted-foreground text-sm">
              Próximamente tendremos noticias y eventos de {cityInfo?.displayName}
            </p>
          </div>
        </div>
      )}

      {cityPosts.length > 0 && (
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="glass-effect border-primary/30 hover:border-primary/60 neon-glow"
          >
            Ver todas las noticias
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </section>
  );
}
