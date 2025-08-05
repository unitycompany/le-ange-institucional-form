import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import utmPersist from '../utils/utmPersist.js';

/**
 * Hook para garantir que UTMs sejam capturadas em mudanças de rota do React Router
 * Opcional - o UTM Persist já funciona automaticamente
 */
export const useUTMPersist = () => {
  const location = useLocation();

  useEffect(() => {
    // Força a captura de UTMs quando a rota muda
    utmPersist.captureUTMsFromURL();
  }, [location.pathname, location.search]);

  // Retorna método para obter UTMs atuais
  return {
    getCurrentUTMs: () => utmPersist.getCurrentUTMs(),
    clearUTMs: () => utmPersist.clearUTMs()
  };
};

export default useUTMPersist;
