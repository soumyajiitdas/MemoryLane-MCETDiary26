export const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Probably already formatted string like "August 2022"
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  export const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return 'Just now';
  };
  
  export const filterBySearch = (items, query, fields) => {
    if (!query) return items;
    const lowerQuery = query.toLowerCase();
    
    return items.filter(item => {
      return fields.some(field => {
        const val = item[field];
        if (typeof val === 'string') {
          return val.toLowerCase().includes(lowerQuery);
        }
        return false;
      });
    });
  };
  
  // Array of visually pleasing nostalgia-themed gradients
  const gradients = [
    'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
    'linear-gradient(135deg, #16a085 0%, #f4d03f 100%)'
  ];
  
  export const getRandomGradient = (seed) => {
    // Determine gradient based on a seed (like ID or string) for consistency
    if (seed !== undefined) {
      let hash = 0;
      const str = String(seed);
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const index = Math.abs(hash) % gradients.length;
      return gradients[index];
    }
    
    const index = Math.floor(Math.random() * gradients.length);
    return gradients[index];
  };
  
