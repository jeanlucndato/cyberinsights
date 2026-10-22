/**
* Template Name: Visible
* Template URL: https://bootstrapmade.com/visible-bootstrap-agency-template/
* Updated: May 22 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('#navmenu');
  let navBackdrop;

  function setMobileNav(open) {
    if (!mobileNavToggleBtn || !navMenu) return;
    const body = document.body;
    body.classList.toggle('mobile-nav-active', open);
    mobileNavToggleBtn.classList.toggle('bi-list', !open);
    mobileNavToggleBtn.classList.toggle('bi-x', open);
    mobileNavToggleBtn.setAttribute('aria-expanded', String(open));
    mobileNavToggleBtn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');

    if (open) {
      if (!navBackdrop) {
        navBackdrop = document.createElement('button');
        navBackdrop.type = 'button';
        navBackdrop.className = 'nav-backdrop';
        navBackdrop.setAttribute('aria-label', 'Fermer le menu');
        navBackdrop.addEventListener('click', () => setMobileNav(false));
        body.appendChild(navBackdrop);
      }
      requestAnimationFrame(() => navMenu.querySelector('a')?.focus());
    } else {
      navBackdrop?.remove();
      navBackdrop = null;
      mobileNavToggleBtn.focus();
    }
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', () => {
      setMobileNav(!document.body.classList.contains('mobile-nav-active'));
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && document.body.classList.contains('mobile-nav-active')) {
        setMobileNav(false);
      }
    });
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        setMobileNav(false);
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll Progress Indicator
   */
  function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) {
      // Create scroll progress element if it doesn't exist
      const progressBar = document.createElement('div');
      progressBar.id = 'scroll-progress';
      document.body.appendChild(progressBar);
    }

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    const progressElement = document.getElementById('scroll-progress');
    if (progressElement) {
      progressElement.style.width = scrolled + '%';
    }
  }

  window.addEventListener('scroll', updateScrollProgress);
  window.addEventListener('load', updateScrollProgress);

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
      });
    });
  }

  document.querySelectorAll('[data-contact-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const fields = new FormData(form);
      const subject = String(fields.get('subject') || 'Contact depuis mon portfolio').trim();
      const body = [
        `Nom : ${String(fields.get('name') || '').trim()}`,
        `E-mail : ${String(fields.get('email') || '').trim()}`,
        '',
        String(fields.get('message') || '').trim()
      ].join('\n');
      const recipient = form.dataset.contactEmail;
      if (!recipient) return;

      const sentMessage = form.querySelector('.sent-message');
      if (sentMessage) {
        sentMessage.textContent = 'Votre application de messagerie va s’ouvrir avec le message prérempli. Vous pourrez le relire avant de l’envoyer.';
        sentMessage.classList.add('is-visible');
      }
      window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS === 'undefined') return;
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 100,
      delay: 50,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') new PureCounter();

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') GLightbox({ selector: '.glightbox' });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    const portfolioContainer = isotopeItem.querySelector('.isotope-container');
    if (!portfolioContainer || typeof Isotope === 'undefined') return;
    const arrange = selectedFilter => initIsotope?.arrange({ filter: selectedFilter });
    const initLayout = () => {
      initIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    };
    if (typeof imagesLoaded !== 'undefined') imagesLoaded(portfolioContainer, initLayout);
    else initLayout();

    isotopeItem.querySelectorAll('.isotope-filters [data-filter]').forEach(function (filters) {
      filters.addEventListener('click', function () {
        isotopeItem.querySelectorAll('.isotope-filters [data-filter]').forEach(button => {
          const active = button === filters;
          button.classList.toggle('filter-active', active);
          button.setAttribute('aria-pressed', String(active));
        });
        arrange(this.getAttribute('data-filter'));
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.setAttribute('role', 'button');
    faqItem.setAttribute('tabindex', '0');
    faqItem.setAttribute('aria-expanded', String(faqItem.parentNode.classList.contains('faq-active')));
    const toggleFaq = () => {
      const open = faqItem.parentNode.classList.toggle('faq-active');
      faqItem.setAttribute('aria-expanded', String(open));
    };
    faqItem.addEventListener('click', toggleFaq);
    faqItem.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleFaq();
      }
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      const configElement = swiperElement.querySelector('.swiper-config');
      if (!configElement) return;
      let config;
      try {
        config = JSON.parse(configElement.innerHTML.trim());
      } catch (error) {
        console.error('Configuration du carrousel invalide.', error);
        return;
      }

      if (swiperElement.classList.contains('swiper-tab') && typeof initSwiperWithCustomPagination === 'function') {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = parseInt(getComputedStyle(section).scrollMarginTop, 10) || 0;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
