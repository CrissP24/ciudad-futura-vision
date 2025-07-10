import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type City = 'jipijapa' | 'puerto-lopez' | 'pajan';

export interface CityInfo {
  id: City;
  name: string;
  displayName: string;
  description: string;
  color: string;
  gradient: string;
  image: string;
  defaultUser: {
    username: string;
    password: string;
    fullName: string;
    role: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  date: string;
  city: City;
  author: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'active' | 'maintenance' | 'inactive';
  city: City;
}

interface AppState {
  currentCity: City;
  setCurrentCity: (city: City) => void;
  isAuthenticated: boolean;
  currentUser: string | null;
  login: (city: City, username: string, password: string) => boolean;
  logout: () => void;
  cities: CityInfo[];
  blogPosts: BlogPost[];
  services: Service[];
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const citiesData: CityInfo[] = [
  {
    id: 'jipijapa',
    name: 'jipijapa',
    displayName: 'Jipijapa',
    description: 'Ciudad de los tejidos y la hospitalidad manabita',
    color: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    gradient: 'from-yellow-400/20 to-orange-500/20',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
    defaultUser: {
      username: 'admin.jipijapa',
      password: 'jipijapa2024',
      fullName: 'María Elena Rodríguez',
      role: 'Coordinadora SmartCity'
    }
  },
  {
    id: 'puerto-lopez',
    name: 'puerto-lopez',
    displayName: 'Puerto López',
    description: 'Portal de entrada al Parque Nacional Machalilla',
    color: 'bg-gradient-to-r from-blue-400 to-cyan-500',
    gradient: 'from-blue-400/20 to-cyan-500/20',
    image: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop',
    defaultUser: {
      username: 'admin.puertolopez',
      password: 'puertolopez2024',
      fullName: 'Carlos Mendoza Vera',
      role: 'Director de Tecnología'
    }
  },
  {
    id: 'pajan',
    name: 'pajan',
    displayName: 'Paján',
    description: 'Tierra de tradición y desarrollo sostenible',
    color: 'bg-gradient-to-r from-green-400 to-emerald-500',
    gradient: 'from-green-400/20 to-emerald-500/20',
    image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&h=600&fit=crop',
    defaultUser: {
      username: 'admin.pajan',
      password: 'pajan2024',
      fullName: 'Ana Patricia Silva',
      role: 'Gerente de Innovación'
    }
  }
];

const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Nueva infraestructura tecnológica en Jipijapa',
    content: 'Se ha implementado una red de fibra óptica que conecta toda la ciudad, mejorando significativamente la conectividad y preparando el terreno para servicios inteligentes.',
    date: '2024-07-08',
    city: 'jipijapa',
    author: 'Alcaldía de Jipijapa'
  },
  {
    id: '2',
    title: 'Programa de monitoreo marino en Puerto López',
    content: 'Se inicia un programa de monitoreo inteligente de la vida marina utilizando sensores IoT y análisis de datos en tiempo real.',
    date: '2024-07-07',
    city: 'puerto-lopez',
    author: 'Ministerio del Ambiente'
  },
  {
    id: '3',
    title: 'Agricultura inteligente en Paján',
    content: 'Implementación de sistemas de riego automatizado y monitoreo de cultivos mediante drones y sensores IoT.',
    date: '2024-07-06',
    city: 'pajan',
    author: 'MAGAP'
  }
];

const initialServices: Service[] = [
  {
    id: '1',
    name: 'Gestión de Agua',
    description: 'Monitoreo y control inteligente del sistema de agua potable',
    icon: 'droplets',
    status: 'active',
    city: 'jipijapa'
  },
  {
    id: '2',
    name: 'Energía Eléctrica',
    description: 'Red eléctrica inteligente con medidores IoT',
    icon: 'zap',
    status: 'active',
    city: 'jipijapa'
  },
  {
    id: '3',
    name: 'Monitoreo Marino',
    description: 'Sistema de vigilancia y protección del ecosistema marino',
    icon: 'waves',
    status: 'active',
    city: 'puerto-lopez'
  },
  {
    id: '4',
    name: 'Turismo Inteligente',
    description: 'Plataforma digital para gestión turística',
    icon: 'camera',
    status: 'maintenance',
    city: 'puerto-lopez'
  },
  {
    id: '5',
    name: 'Agricultura Digital',
    description: 'Sistema de monitoreo y automatización agrícola',
    icon: 'leaf',
    status: 'active',
    city: 'pajan'
  },
  {
    id: '6',
    name: 'Transporte Rural',
    description: 'Gestión inteligente del transporte rural',
    icon: 'truck',
    status: 'inactive',
    city: 'pajan'
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentCity, setCurrentCity] = useState<City>('jipijapa');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [services] = useState<Service[]>(initialServices);

  useEffect(() => {
    const stored = localStorage.getItem('smartcity-auth');
    if (stored) {
      const { city, user, timestamp } = JSON.parse(stored);
      // Verificar si la sesión no ha expirado (24 horas)
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        setCurrentCity(city);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('smartcity-auth');
      }
    }

    const storedCity = localStorage.getItem('smartcity-current-city');
    if (storedCity && !isAuthenticated) {
      setCurrentCity(storedCity as City);
    }
  }, [isAuthenticated]);

  const login = (city: City, username: string, password: string): boolean => {
    const cityInfo = citiesData.find(c => c.id === city);
    if (!cityInfo) return false;

    const isValid = cityInfo.defaultUser.username === username && 
                   cityInfo.defaultUser.password === password;

    if (isValid) {
      setCurrentCity(city);
      setCurrentUser(cityInfo.defaultUser.fullName);
      setIsAuthenticated(true);
      localStorage.setItem('smartcity-auth', JSON.stringify({
        city,
        user: cityInfo.defaultUser.fullName,
        timestamp: Date.now()
      }));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('smartcity-auth');
  };

  const handleSetCurrentCity = (city: City) => {
    setCurrentCity(city);
    localStorage.setItem('smartcity-current-city', city);
  };

  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...post,
      id: Date.now().toString()
    };
    setBlogPosts(prev => [newPost, ...prev]);
  };

  const updateBlogPost = (id: string, updatedPost: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id));
  };

  return (
    <AppContext.Provider value={{
      currentCity,
      setCurrentCity: handleSetCurrentCity,
      isAuthenticated,
      currentUser,
      login,
      logout,
      cities: citiesData,
      blogPosts,
      services,
      addBlogPost,
      updateBlogPost,
      deleteBlogPost
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
