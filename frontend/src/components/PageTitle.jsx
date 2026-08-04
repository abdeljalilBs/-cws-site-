import { useEffect, useRef } from 'react';

const PageTitle = () => {
  const baseTitle = 'Coach Wellness Sports';

  const sectionTitles = useRef({
    hero: `${baseTitle} — Salle de sport premium`,
    club: `${baseTitle} — Découvrir le club`,
    about: `${baseTitle} — L'esprit CWS`,
    testimonials: `${baseTitle} — Avis de nos clients`,
    coachs: `${baseTitle} — Les coachs`,
    tarifs: `${baseTitle} — Tarifs & abonnements`,
    faq: `${baseTitle} — Questions fréquentes`,
  });

  useEffect(() => {
    const sectionIds = ['hero', 'club', 'about', 'testimonials', 'coachs', 'tarifs', 'faq'];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const id = visible.target.id;
          const newTitle = sectionTitles.current[id] || baseTitle;
          if (document.title !== newTitle) {
            document.title = newTitle;
          }
        }
      },
      { threshold: [0.4, 0.6], rootMargin: '-10% 0px -10% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [baseTitle]);

  return null;
};

export default PageTitle;