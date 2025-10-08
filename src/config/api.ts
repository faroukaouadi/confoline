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
    gallery: "/admin/confoline-Api/gallery.php",
    opportunities: "/admin/confoline-Api/opportunities.php",
    opportunity: "/admin/confoline-Api/opportunity.php"
  }
};

export const getApiUrl = (endpoint: keyof typeof API_CONFIG.endpoints): string => {
  const isDev = process.env.NODE_ENV === 'development';
  const baseUrl = isDev ? API_CONFIG.baseUrl.development : API_CONFIG.baseUrl.production;
  const fullUrl = `${baseUrl}${API_CONFIG.endpoints[endpoint]}`;
  console.log("API Config - isDev:", isDev, "baseUrl:", baseUrl, "endpoint:", endpoint, "fullUrl:", fullUrl);
  return fullUrl;
};
