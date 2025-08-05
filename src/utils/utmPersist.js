/**
 * UTM Persist - Sistema para manter parâmetros UTM durante navegação
 */

class UTMPersist {
  constructor() {
    this.utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    this.storageKey = 'utm_params';
    this.init();
  }

  init() {
    // Aguarda o DOM estar pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.captureUTMsFromURL();
        this.setupLinkInterception();
        this.setupHistoryInterception();
      });
    } else {
      // DOM já está pronto
      this.captureUTMsFromURL();
      this.setupLinkInterception();
      this.setupHistoryInterception();
    }
  }

  /**
   * Captura parâmetros UTM da URL atual e armazena no localStorage
   */
  captureUTMsFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const currentUTMs = {};
    let hasNewUTMs = false;

    // Captura UTMs da URL atual
    this.utmParams.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        currentUTMs[param] = value;
        hasNewUTMs = true;
      }
    });

    // Se encontrou novos UTMs, atualiza o storage
    if (hasNewUTMs) {
      this.storeUTMs(currentUTMs);
    }
  }

  /**
   * Armazena UTMs no localStorage com timestamp
   */
  storeUTMs(utms) {
    const utmData = {
      ...utms,
      timestamp: Date.now(),
      expires: Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 dias
    };
    
    localStorage.setItem(this.storageKey, JSON.stringify(utmData));
    console.log('UTMs armazenados:', utmData);
  }

  /**
   * Recupera UTMs armazenados (válidos)
   */
  getStoredUTMs() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return null;

      const utmData = JSON.parse(stored);
      
      // Verifica se não expirou
      if (Date.now() > utmData.expires) {
        localStorage.removeItem(this.storageKey);
        return null;
      }

      // Remove campos de controle antes de retornar
      const { timestamp, expires, ...utms } = utmData;
      return utms;
    } catch (error) {
      console.error('Erro ao recuperar UTMs:', error);
      return null;
    }
  }

  /**
   * Adiciona UTMs a uma URL
   */
  addUTMsToURL(url) {
    const storedUTMs = this.getStoredUTMs();
    if (!storedUTMs) return url;

    try {
      const urlObj = new URL(url, window.location.origin);
      
      // Não adiciona UTMs se a URL já tem parâmetros UTM
      const hasUTMs = this.utmParams.some(param => urlObj.searchParams.has(param));
      if (hasUTMs) return url;

      // Adiciona UTMs armazenados
      Object.entries(storedUTMs).forEach(([key, value]) => {
        if (value && this.utmParams.includes(key)) {
          urlObj.searchParams.set(key, value);
        }
      });

      return urlObj.toString();
    } catch (error) {
      console.error('Erro ao adicionar UTMs à URL:', error);
      return url;
    }
  }

  /**
   * Verifica se é um link interno
   */
  isInternalLink(url) {
    try {
      const link = new URL(url, window.location.origin);
      return link.origin === window.location.origin;
    } catch (error) {
      // Se não conseguir criar URL, assume que é relativo (interno)
      return !url.startsWith('http') && !url.startsWith('//');
    }
  }

  /**
   * Intercepta cliques em links para adicionar UTMs
   */
  setupLinkInterception() {
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return;
      }

      // Só processa links internos
      if (this.isInternalLink(href)) {
        const newHref = this.addUTMsToURL(href);
        if (newHref !== href) {
          link.setAttribute('href', newHref);
        }
      }
    }, true); // Use capture phase para interceptar antes de outros handlers

    // Também intercepta mudanças na URL (para React Router)
    let lastUrl = window.location.href;
    new MutationObserver(() => {
      const url = window.location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        this.captureUTMsFromURL();
      }
    }).observe(document, { subtree: true, childList: true });

    // Intercepta eventos de popstate (botão voltar/avançar)
    window.addEventListener('popstate', () => {
      setTimeout(() => {
        this.captureUTMsFromURL();
      }, 100);
    });
  }

  /**
   * Intercepta navegação programática (React Router, etc.)
   */
  setupHistoryInterception() {
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = (...args) => {
      const [state, title, url] = args;
      if (url && this.isInternalLink(url)) {
        const newUrl = this.addUTMsToURL(url);
        args[2] = newUrl;
      }
      return originalPushState.apply(history, args);
    };

    history.replaceState = (...args) => {
      const [state, title, url] = args;
      if (url && this.isInternalLink(url)) {
        const newUrl = this.addUTMsToURL(url);
        args[2] = newUrl;
      }
      return originalReplaceState.apply(history, args);
    };
  }

  /**
   * Método público para obter UTMs (para usar no popup)
   */
  getCurrentUTMs() {
    // Primeiro tenta da URL atual
    const urlParams = new URLSearchParams(window.location.search);
    const currentUTMs = {};
    
    this.utmParams.forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        currentUTMs[param] = value;
      }
    });

    // Se não encontrou na URL, pega do storage
    if (Object.keys(currentUTMs).length === 0) {
      const storedUTMs = this.getStoredUTMs();
      if (storedUTMs) {
        this.utmParams.forEach(param => {
          if (storedUTMs[param]) {
            currentUTMs[param] = storedUTMs[param];
          }
        });
      }
    }

    // Preenche campos vazios com fallback
    this.utmParams.forEach(param => {
      if (!currentUTMs[param]) {
        currentUTMs[param] = param === 'utm_source' ? 'organico' : null;
      }
    });

    return currentUTMs;
  }

  /**
   * Limpa UTMs armazenados
   */
  clearUTMs() {
    localStorage.removeItem(this.storageKey);
  }
}

// Instância global
const utmPersist = new UTMPersist();

export default utmPersist;
