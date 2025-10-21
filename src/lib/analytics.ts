export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

// Track Google Ads conversion
export const trackConversion = (conversionLabel: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': conversionLabel,
      'value': value || 50.0,
      'currency': 'BRL'
    });
  }
};

// Track purchase specifically for Google Ads
export const trackPurchase = (transactionId: string, value: number = 50.0) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    // Enhanced ecommerce event for Google Analytics
    (window as any).gtag('event', 'purchase', {
      transaction_id: transactionId,
      value: value,
      currency: 'BRL',
      items: [{
        item_id: 'pacote-completo',
        item_name: 'Pacote Completo de Preparação',
        item_category: 'Concursos Públicos',
        price: value,
        quantity: 1
      }]
    });
    
    // Google Ads conversion event
    (window as any).gtag('event', 'conversion', {
      'send_to': 'AW-400922729/Oe_YCMbbs_cYEOmwlr8B',
      'transaction_id': transactionId,
      'value': value,
      'currency': 'BRL'
    });
  }
};

// Track begin_checkout for Google Ads
export const trackBeginCheckout = (value: number = 50.0) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'begin_checkout', {
      value: value,
      currency: 'BRL',
      items: [{
        item_id: 'pacote-completo',
        item_name: 'Pacote Completo de Preparação',
        item_category: 'Concursos Públicos',
        price: value,
        quantity: 1
      }]
    });
  }
};

export const initGoogleAnalytics = (measurementId: string) => {
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');
  `;
  document.head.appendChild(script2);
};
