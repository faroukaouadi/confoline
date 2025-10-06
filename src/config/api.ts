// API Configuration
export const API_CONFIG = {
  baseUrl: {
    development: "http://127.0.0.1:8000",
    production: ""
  },
  endpoints: {
    partners: "/admin/confoline-Api/partners.php",
    partnersHome: "/admin/confoline-Api/partners-home.php",
    news: "/admin/confoline-Api/news.php",
    newsById: "/admin/confoline-Api/news-one.php",
    gallery: "/admin/confoline-Api/gallery.php"
  }
};

export const getApiUrl = (endpoint: keyof typeof API_CONFIG.endpoints): string => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseUrl = isDev ? API_CONFIG.baseUrl.development : API_CONFIG.baseUrl.production;
  return `${baseUrl}${API_CONFIG.endpoints[endpoint]}`;
};
