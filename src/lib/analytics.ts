export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, params);
  }
};

export const getHomeVariant = (): "A" | "B" => {
  if (typeof window === "undefined") return "A";
  try {
    const stored = window.localStorage.getItem("home_variant");
    const normalized = stored ? stored.trim().toUpperCase() : "";
    return normalized === "B" ? "B" : "A";
  } catch {
    return "A";
  }
};

export const setGAUserProperties = (props: Record<string, any>) => {
  if (typeof window === "undefined") return;
  try {
    if ((window as any).gtag) {
      (window as any).gtag("set", "user_properties", props);
    }
  } catch {
    // no-op
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
export const trackPurchase = (transactionId: string, value: number = 25.0, params?: Record<string, any>) => {
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
      }],
      ...(params ?? {})
    });
    
    // Google Ads conversion event
    (window as any).gtag('event', 'conversion', {
      send_to: "AW-400922729/LFG4CLCi_7IbEOmwlr8B",
      transaction_id: transactionId,
      value: value,
      currency: "BRL"
    });
    console.log('🎯 Google Ads conversion tracked:', transactionId, value);
  }
};

// Track begin_checkout for Google Ads
export const trackBeginCheckout = (value: number = 50.0, params?: Record<string, any>) => {
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
      }],
      ...(params ?? {})
    });
  }
};

// Track CTA Desbloqueio Click
export const trackCtaDesbloqueioClick = (location: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cta_desbloqueio_click', {
      event_category: 'engagement',
      event_label: location,
      value: 25
    });
  }
  
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', 'CtaDesbloqueioClick', {
      location: location
    });
  }
  console.log('📊 CTA Desbloqueio tracked:', location);
};

// Track Checkout Success (alias for trackPurchase for clarity)
export const trackCheckoutSuccess = (transactionId: string, value: number = 25.0, params?: Record<string, any>) => {
  trackPurchase(transactionId, value, params);
};

// Track Cupom WhatsApp Click
export const trackCupomWhatsappClick = () => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'cupom_whatsapp_click', {
      event_category: 'engagement',
      event_label: 'discount_coupon_request',
      value: 5
    });
  }
  
  // Facebook Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', 'CupomWhatsappClick', {
      discount_value: 5
    });
  }
  console.log('📊 Cupom WhatsApp tracked');
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
