'use strict';
const theme = {
  /**
   * Theme's components/functions list
   * Comment out or delete the unnecessary component.
   * Some components have dependencies (plugins).
   * Do not forget to remove dependency from src/js/vendor/ and recompile.
   */
  init: function () {
    theme.stickyHeader()
    theme.offCanvas()
    theme.isotope()
    theme.onepageHeaderOffset()
    theme.anchorSmoothScroll()
    theme.svgInject()
    theme.backgroundImage()
    theme.backgroundImageMobile()
    theme.imageHoverOverlay()
    theme.rellax()
    theme.scrollCue()
    theme.swiperSlider()
    theme.lightbox()
    theme.plyr()
    theme.progressBar()
    theme.loader()
    theme.pageProgress()
    theme.counterUp()
    theme.bsTooltips()
    theme.bsPopovers()
    theme.bsModal()
    theme.textRotator()
  },
  /**
   * Sticky Header
   * Enables sticky behavior on navbar on page scroll
   * Requires assets/js/vendor/headhesive.min.js
   */
  stickyHeader: () => {
    let navbar = document.querySelector('.navbar')
    if (navbar == null) return
    let options = {
      offset: 350,
      offsetSide: 'top',
      classes: {
        clone: 'navbar-clone fixed',
        stick: 'navbar-stick',
        unstick: 'navbar-unstick',
      },
      onStick: function () {
        let navbarClonedClass = this.clonedElem.classList
        if (
          navbarClonedClass.contains('transparent') &&
          navbarClonedClass.contains('navbar-dark')
        ) {
          this.clonedElem.className = this.clonedElem.className.replace(
            'navbar-dark',
            'navbar-light'
          )
        }
      },
    }
    let banner = new Headhesive('.navbar', options)
  },
  /**
   * Offcanvas
   * Enables offcanvas-nav, closes offcanvas on anchor clicks
   */
  offCanvas: function () {
    const navOffCanvasBtn = document.querySelectorAll('.offcanvas-nav-btn')
    const navOffCanvas = document.querySelector(
      '.navbar:not(.navbar-clone) .offcanvas-nav'
    )
    const bsOffCanvas = new bootstrap.Offcanvas(navOffCanvas, { scroll: true })
    const scrollLink = document.querySelectorAll('.onepage .navbar li a.scroll')
    navOffCanvasBtn.forEach((e) => {
      e.addEventListener('click', (event) => {
        bsOffCanvas.show()
      })
    })
    scrollLink.forEach((e) => {
      e.addEventListener('click', (event) => {
        bsOffCanvas.hide()
      })
    })
  },
  /**
   * Isotope
   * Enables isotope grid layout and filtering
   * Requires assets/js/vendor/isotope.pkgd.min.js
   * Requires assets/js/vendor/imagesloaded.pkgd.min.js
   */
  isotope: function () {
    let grids = document.querySelectorAll('.grid')
    if (grids != null) {
      grids.forEach((g) => {
        let grid = g.querySelector('.isotope')
        let filtersElem = g.querySelector('.isotope-filter')
        let buttonGroups = g.querySelectorAll('.isotope-filter')
        let iso = new Isotope(grid, {
          itemSelector: '.item',
          layoutMode: 'masonry',
          masonry: {
            columnWidth: grid.offsetWidth / 12,
          },
          percentPosition: true,
          transitionDuration: '0.7s',
        })
        imagesLoaded(grid).on('progress', function () {
          iso.layout({
            masonry: {
              columnWidth: grid.offsetWidth / 12,
            },
          })
        }),
          window.addEventListener(
            'resize',
            function () {
              iso.arrange({
                masonry: {
                  columnWidth: grid.offsetWidth / 12,
                },
              })
            },
            true
          )
        if (filtersElem != null) {
          filtersElem.addEventListener('click', function (event) {
            if (!matchesSelector(event.target, '.filter-item')) {
              return
            }
            let filterValue = event.target.getAttribute('data-filter')
            iso.arrange({
              filter: filterValue,
            })
          })
          for (let i = 0, len = buttonGroups.length; i < len; i++) {
            let buttonGroup = buttonGroups[i]
            buttonGroup.addEventListener('click', function (event) {
              if (!matchesSelector(event.target, '.filter-item')) {
                return
              }
              buttonGroup.querySelector('.active').classList.remove('active')
              event.target.classList.add('active')
            })
          }
        }
      })
    }
  },
  /**
   * Onepage Header Offset
   * Adds an offset value to anchor point equal to sticky header height on a onepage
   */
  onepageHeaderOffset: function () {
    const header_height = document.querySelector('.navbar').offsetHeight
    const shrinked_header_height = 75
    const sections = document.querySelectorAll('.onepage section')
    sections.forEach((section) => {
      section.style.paddingTop = shrinked_header_height + 'px'
      section.style.marginTop = '-' + shrinked_header_height + 'px'
    })
    const first_section = document.querySelector(
      '.onepage section:first-of-type'
    )
    if (first_section != null) {
      first_section.style.paddingTop = header_height + 'px'
      first_section.style.marginTop = '-' + header_height + 'px'
    }
  },
  /**
   * Anchor Smooth Scroll
   * Adds smooth scroll animation to links with .scroll class
   * Requires assets/js/vendor/smoothscroll.js
   */
  anchorSmoothScroll: function () {
    const links = document.querySelectorAll('.scroll')
    for (const link of links) {
      link.addEventListener('click', clickHandler)
    }
    function clickHandler(e) {
      e.preventDefault()
      this.blur()
      const href = this.getAttribute('href')
      const offsetTop = document.querySelector(href).offsetTop
      scroll({
        top: offsetTop,
        behavior: 'smooth',
      })
    }
  },
  /**
   * SVGInject
   * Replaces an img element with an inline SVG so you can apply colors to your SVGs
   * Requires assets/js/vendor/svg-inject.min.js
   */
  svgInject: function () {
    SVGInject.setOptions({
      onFail: function (img, svg) {
        img.classList.remove('svg-inject')
      },
    })
    document.addEventListener('DOMContentLoaded', function () {
      SVGInject(document.querySelectorAll('img.svg-inject'), {
        useCache: true,
      })
    })
  },
  /**
   * Background Image
   * Adds a background image link via data attribute "data-image-src"
   */
  backgroundImage: function () {
    let bg = document.querySelectorAll('.bg-image')
    for (let i = 0; i < bg.length; i++) {
      let url = bg[i].getAttribute('data-image-src')
      bg[i].style.backgroundImage = "url('" + url + "')"
    }
  },
  /**
   * Background Image Mobile
   * Adds .mobile class to background images on mobile devices for styling purposes
   */
  backgroundImageMobile: function () {
    let isMobile =
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i)
        ? true
        : false
    if (isMobile) {
      document.querySelectorAll('.image-wrapper').forEach((e) => {
        e.classList.add('mobile')
      })
    }
  },
  /**
   * Image Hover Overlay
   * Adds span.bg inside .overlay for simpler markup and styling purposes
   */
  imageHoverOverlay: function () {
    let overlay = document.querySelectorAll('.overlay > a, .overlay > span')
    for (let i = 0; i < overlay.length; i++) {
      let overlay_bg = document.createElement('span')
      overlay_bg.className = 'bg'
      overlay[i].appendChild(overlay_bg)
    }
  },
  /**
   * Rellax.js
   * Adds parallax animation to shapes and elements
   * Requires assets/js/vendor/rellax.min.js
   */
  rellax: function () {
    if (document.querySelector('.rellax') != null) {
      window.onload = function () {
        let rellax = new Rellax('.rellax', {
          speed: 2,
          center: true,
          breakpoints: [576, 992, 1201],
        })
        let projects_overflow = document.querySelectorAll('.projects-overflow')
        imagesLoaded(projects_overflow, function () {
          rellax.refresh()
        })
      }
    }
  },
  /**
   * scrollCue.js
   * Enables showing elements by scrolling
   * Requires assets/js/vendor/scrollCue.min.js
   */
  scrollCue: function () {
    scrollCue.init({
      interval: -400,
      duration: 700,
      percentage: 0.8,
    })
    scrollCue.update()
  },
  /**
   * Swiper Slider
   * Enables carousels and sliders
   * Requires assets/js/vendor/swiper-bundle.min.js
   */
  swiperSlider: function () {
    let carousel = document.querySelectorAll('.swiper-container')
    for (let i = 0; i < carousel.length; i++) {
      let slider1 = carousel[i]
      slider1.classList.add('swiper-container-' + i)
      let controls = document.createElement('div')
      controls.className = 'swiper-controls'
      let pagi = document.createElement('div')
      pagi.className = 'swiper-pagination'
      let navi = document.createElement('div')
      navi.className = 'swiper-navigation'
      let prev = document.createElement('div')
      prev.className = 'swiper-button swiper-button-prev'
      let next = document.createElement('div')
      next.className = 'swiper-button swiper-button-next'
      slider1.appendChild(controls)
      controls.appendChild(navi)
      navi.appendChild(prev)
      navi.appendChild(next)
      controls.appendChild(pagi)
      let sliderEffect = slider1.getAttribute('data-effect')
        ? slider1.getAttribute('data-effect')
        : 'slide'
      let sliderItems = slider1.getAttribute('data-items')
        ? slider1.getAttribute('data-items')
        : 3 // items in all devices
      let sliderItemsXs = slider1.getAttribute('data-items-xs')
        ? slider1.getAttribute('data-items-xs')
        : 1 // start - 575
      let sliderItemsSm = slider1.getAttribute('data-items-sm')
        ? slider1.getAttribute('data-items-sm')
        : Number(sliderItemsXs) // 576 - 767
      let sliderItemsMd = slider1.getAttribute('data-items-md')
        ? slider1.getAttribute('data-items-md')
        : Number(sliderItemsSm) // 768 - 991
      let sliderItemsLg = slider1.getAttribute('data-items-lg')
        ? slider1.getAttribute('data-items-lg')
        : Number(sliderItemsMd) // 992 - 1199
      let sliderItemsXl = slider1.getAttribute('data-items-xl')
        ? slider1.getAttribute('data-items-xl')
        : Number(sliderItemsLg) // 1200 - end
      let sliderItemsXxl = slider1.getAttribute('data-items-xxl')
        ? slider1.getAttribute('data-items-xxl')
        : Number(sliderItemsXl) // 1500 - end
      let sliderSpeed = slider1.getAttribute('data-speed')
        ? slider1.getAttribute('data-speed')
        : 500
      let sliderAutoPlay = slider1.getAttribute('data-autoplay') !== 'false'
      let sliderAutoPlayTime = slider1.getAttribute('data-autoplaytime')
        ? slider1.getAttribute('data-autoplaytime')
        : 5000
      let sliderAutoHeight = slider1.getAttribute('data-autoheight') === 'true'
      let sliderMargin = slider1.getAttribute('data-margin')
        ? slider1.getAttribute('data-margin')
        : 30
      let sliderLoop = slider1.getAttribute('data-loop') === 'true'
      let swiper = slider1.querySelector('.swiper:not(.swiper-thumbs)')
      let swiperTh = slider1.querySelector('.swiper-thumbs')
      let sliderTh = new Swiper(swiperTh, {
        slidesPerView: 5,
        spaceBetween: 10,
        loop: false,
        threshold: 2,
      })
      if (slider1.getAttribute('data-thumbs') === 'true') {
        let thumbsInit = sliderTh
        let swiperMain = document.createElement('div')
        swiperMain.className = 'swiper-main'
        swiper.parentNode.insertBefore(swiperMain, swiper)
        swiperMain.appendChild(swiper)
        slider1.removeChild(controls)
        swiperMain.appendChild(controls)
      } else {
        let thumbsInit = null
      }
      let slider = new Swiper(swiper, {
        on: {
          beforeInit: function () {
            if (
              slider1.getAttribute('data-nav') !== 'true' &&
              slider1.getAttribute('data-dots') !== 'true'
            ) {
              controls.remove()
            }
            if (slider1.getAttribute('data-dots') !== 'true') {
              pagi.remove()
            }
            if (slider1.getAttribute('data-nav') !== 'true') {
              navi.remove()
            }
          },
          init: function () {
            if (slider1.getAttribute('data-autoplay') !== 'true') {
              this.autoplay.stop()
            }
            this.update()
          },
        },
        autoplay: {
          delay: sliderAutoPlayTime,
          disableOnInteraction: false,
        },
        speed: sliderSpeed,
        slidesPerView: sliderItems,
        loop: sliderLoop,
        spaceBetween: Number(sliderMargin),
        effect: sliderEffect,
        autoHeight: sliderAutoHeight,
        grabCursor: true,
        resizeObserver: false,
        breakpoints: {
          0: {
            slidesPerView: Number(sliderItemsXs),
          },
          576: {
            slidesPerView: Number(sliderItemsSm),
          },
          768: {
            slidesPerView: Number(sliderItemsMd),
          },
          992: {
            slidesPerView: Number(sliderItemsLg),
          },
          1200: {
            slidesPerView: Number(sliderItemsXl),
          },
          1400: {
            slidesPerView: Number(sliderItemsXxl),
          },
        },
        pagination: {
          el: carousel[i].querySelector('.swiper-pagination'),
          clickable: true,
        },
        navigation: {
          prevEl: slider1.querySelector('.swiper-button-prev'),
          nextEl: slider1.querySelector('.swiper-button-next'),
        },
        thumbs: {
          swiper: thumbsInit,
        },
      })
    }
  },
  /**
   * GLightbox
   * Enables lightbox functionality
   * Requires assets/js/vendor/glightbox.js
   */
  lightbox: function () {
    const lightbox = GLightbox({
      selector: '*[data-glightbox]',
      touchNavigation: true,
      loop: false,
      zoomable: false,
      autoplayVideos: true,
      moreLength: 0,
      slideExtraAttributes: {
        poster: '',
      },
      plyr: {
        css: '',
        js: '',
        config: {
          ratio: '16:9',
          fullscreen: {
            enabled: false,
            iosNative: false,
          },
          youtube: {
            noCookie: true,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
          },
          vimeo: {
            byline: false,
            portrait: false,
            title: false,
            transparent: false,
          },
        },
      },
    })
  },
  /**
   * Plyr
   * Enables media player
   * Requires assets/js/vendor/plyr.js
   */
  plyr: function () {
    let players = Plyr.setup('.player', {
      loadSprite: true,
    })
  },
  /**
   * Progressbar
   * Enables animated progressbars
   * Requires assets/js/vendor/progressbar.min.js
   * Requires assets/js/vendor/noframework.waypoints.min.js
   */
  progressBar: function () {
    const pline = document.querySelectorAll('.progressbar.line')
    const pcircle = document.querySelectorAll('.progressbar.semi-circle')
    pline.forEach((e) => {
      let line = new ProgressBar.Line(e, {
        strokeWidth: 6,
        trailWidth: 6,
        duration: 3000,
        easing: 'easeInOut',
        text: {
          style: {
            color: 'inherit',
            position: 'absolute',
            right: '0',
            top: '-30px',
            padding: 0,
            margin: 0,
            transform: null,
          },
          autoStyleContainer: false,
        },
        step: (state, line) => {
          line.setText(Math.round(line.value() * 100) + ' %')
        },
      })
      let value = e.getAttribute('data-value') / 100
      new Waypoint({
        element: e,
        handler: function () {
          line.animate(value)
        },
        offset: 'bottom-in-view',
      })
    })
    pcircle.forEach((e) => {
      let circle = new ProgressBar.SemiCircle(e, {
        strokeWidth: 6,
        trailWidth: 6,
        duration: 2000,
        easing: 'easeInOut',
        step: (state, circle) => {
          circle.setText(Math.round(circle.value() * 100))
        },
      })
      let value = e.getAttribute('data-value') / 100
      new Waypoint({
        element: e,
        handler: function () {
          circle.animate(value)
        },
        offset: 'bottom-in-view',
      })
    })
  },
  /**
   * Loader
   *
   */
  loader: function () {
    let preloader = document.querySelector('.page-loader')
    if (preloader != null) {
      document.body.onload = function () {
        setTimeout(function () {
          if (!preloader.classList.contains('done')) {
            preloader.classList.add('done')
          }
        }, 1000)
      }
    }
  },
  /**
   * Page Progress
   * Shows page progress on the bottom right corner of pages
   */
  pageProgress: function () {
    let progressWrap = document.querySelector('.progress-wrap')
    let progressPath = document.querySelector('.progress-wrap path')
    let pathLength = progressPath.getTotalLength()
    let offset = 50
    if (progressWrap != null) {
      progressPath.style.transition = progressPath.style.WebkitTransition =
        'none'
      progressPath.style.strokeDasharray = pathLength + ' ' + pathLength
      progressPath.style.strokeDashoffset = pathLength
      progressPath.getBoundingClientRect()
      progressPath.style.transition = progressPath.style.WebkitTransition =
        'stroke-dashoffset 10ms linear'
      window.addEventListener('scroll', function (event) {
        let scroll =
          document.body.scrollTop || document.documentElement.scrollTop
        let height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight
        let progress = pathLength - (scroll * pathLength) / height
        progressPath.style.strokeDashoffset = progress
        let scrollElementPos =
          document.body.scrollTop || document.documentElement.scrollTop
        if (scrollElementPos >= offset) {
          progressWrap.classList.add('active-progress')
        } else {
          progressWrap.classList.remove('active-progress')
        }
      })
      progressWrap.addEventListener('click', function (e) {
        e.preventDefault()
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
      })
    }
  },
  /**
   * Counter Up
   * Counts up to a targeted number when the number becomes visible
   * Requires assets/js/vendor/counterup.min.js
   * Requires assets/js/vendor/noframework.waypoints.min.js
   */
  counterUp: function () {
    let counterUp = window.counterUp['default']
    const counters = document.querySelectorAll('.counter')
    counters.forEach((el) => {
      new Waypoint({
        element: el,
        handler: function () {
          counterUp(el, {
            duration: 1000,
            delay: 50,
          })
          this.destroy()
        },
        offset: 'bottom-in-view',
      })
    })
  },
  /**
   * Bootstrap Tooltips
   * Enables Bootstrap tooltips
   * Requires Poppers library
   */
  bsTooltips: function () {
    let tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    )
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        trigger: 'hover',
      })
    })
    let tooltipTriggerWhite = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="white-tooltip"]')
    )
    let tooltipWhite = tooltipTriggerWhite.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl, {
        customClass: 'white-tooltip',
        trigger: 'hover',
        placement: 'left',
      })
    })
  },
  /**
   * Bootstrap Popovers
   * Enables Bootstrap popovers
   * Requires Poppers library
   */
  bsPopovers: function () {
    let popoverTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="popover"]')
    )
    let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl)
    })
  },
  /**
   * Bootstrap Modal
   * Enables Bootstrap modal popup
   */
  bsModal: function () {
    if (document.querySelector('.modal-popup') != null) {
      let myModalPopup = new bootstrap.Modal(
        document.querySelector('.modal-popup')
      )
      setTimeout(function () {
        myModalPopup.show()
      }, 200)
    }
    // Fixes jumping of page progress caused by modal
    let innerWidth = window.innerWidth
    let clientWidth = document.body.clientWidth
    let scrollSize = innerWidth - clientWidth
    let myModalEl = document.querySelectorAll('.modal')
    let navbarFixed = document.querySelector('.navbar.fixed')
    let pageProgress = document.querySelector('.progress-wrap')
    function setPadding() {
      if (navbarFixed != null) {
        navbarFixed.style.paddingRight = scrollSize + 'px'
      }
      if (pageProgress != null) {
        pageProgress.style.marginRight = scrollSize + 'px'
      }
    }
    function removePadding() {
      if (navbarFixed != null) {
        navbarFixed.style.paddingRight = ''
      }
      if (pageProgress != null) {
        pageProgress.style.marginRight = ''
      }
    }
    myModalEl.forEach((myModalEl) => {
      myModalEl.addEventListener('show.bs.modal', function (e) {
        setPadding()
      })
      myModalEl.addEventListener('hidden.bs.modal', function (e) {
        removePadding()
      })
    })
  },
  textRotator: function () {
    if (document.querySelector('.rotator-zoom') != null) {
      let replace = new ReplaceMe(document.querySelector('.rotator-zoom'), {
        animation: 'animate__animated animate__zoomIn',
        speed: 2500,
        separator: ',',
        clickChange: false,
        loopCount: 'infinite',
      })
    }
    if (document.querySelector('.rotator-fade') != null) {
      let replace = new ReplaceMe(document.querySelector('.rotator-fade'), {
        animation: 'animate__animated animate__fadeInDown',
        speed: 2500,
        separator: ',',
        clickChange: false,
        loopCount: 'infinite',
      })
    }
  },
}
theme.init();