import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export function useNavbarAnimation(links) {
  const location = useLocation();
  const containerRef = useRef(null);
  const itemRefs = useRef(new Map());
  const [activeMetrics, setActiveMetrics] = useState({
    left: 0,
    width: 0,
    containerWidth: 0,
    isReady: false,
  });

  const getActiveId = useCallback(() => {
    const exact = links.find((link) => link.path === location.pathname);
    if (exact) return exact.id;

    const childMatch = links.find((link) => {
      if (link.children?.some((c) => c.path.split('?')[0] === location.pathname)) return true;
      if (link.groups?.some((g) => g.items?.some((i) => i.path.split('?')[0] === location.pathname))) return true;
      return false;
    });
    if (childMatch) return childMatch.id;

    const matches = links.filter((link) => link.path !== '/' && location.pathname.startsWith(link.path));
    if (matches.length > 0) {
      matches.sort((a, b) => b.path.length - a.path.length);
      return matches[0].id;
    }
    return links[0]?.id;
  }, [links, location.pathname]);

  const updateMetrics = useCallback(() => {
    const activeId = getActiveId();
    const activeEl = itemRefs.current.get(activeId);
    const container = containerRef.current;

    if (activeEl && container) {
      const containerRect = container.getBoundingClientRect();
      const itemRect = activeEl.getBoundingClientRect();
      const left = itemRect.left - containerRect.left;
      const width = itemRect.width;

      setActiveMetrics({
        left,
        width,
        containerWidth: containerRect.width,
        isReady: true,
      });
    }
  }, [getActiveId]);

  useEffect(() => {
    updateMetrics();

    const handleResize = () => {
      requestAnimationFrame(updateMetrics);
    };

    window.addEventListener('resize', handleResize);
    const observer = new ResizeObserver(() => {
      requestAnimationFrame(updateMetrics);
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [updateMetrics]);

  const registerItemRef = (id, el) => {
    if (el) {
      itemRefs.current.set(id, el);
    } else {
      itemRefs.current.delete(id);
    }
  };

  return {
    containerRef,
    registerItemRef,
    activeMetrics,
    activeId: getActiveId(),
  };
}
