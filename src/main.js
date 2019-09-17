import "@babel/polyfill";
import { default as Headroom } from 'headroom.js';
import * as mdc from 'material-components-web';
import { ComponentsInitialiser } from '../node_modules/@scvo/common/old/components-initialiser';
import * as querystring from 'querystring';
import { Auth } from '../node_modules/@scvo/common/old/firebase-auth';


import * as cookieInfoScript from '../node_modules/@scvo/common/old/cookie-info-script' ;

export class SaltireAwards {
  constructor(firebaseConfig) {
    this.firebaseConfig = firebaseConfig;
    this.auth = new Auth(this.firebaseConfig, '/upgrade-token?token={idToken}', 'sa_cookie');

    this.componentsInitialiser = new ComponentsInitialiser();
    this.componentsInitialiser.initialise();

    this.displayMode = null;
    this.displayModes = [
      { name: 'mobile', min: 0, max: 599 },
      { name: 'tablet', min: 600, max: 959 },
      { name: 'desktop', min: 960, max: 20000 }
    ];

    this.ie = navigator.appName.indexOf('Microsoft') > -1 || navigator.userAgent.indexOf('Trident') > -1;
    this.occasionalDrawers = Array.from(document.querySelectorAll('.mdc-drawer--occasional')).map(el => {
      return {
        element: el,
        mdc: null
      };
    });

    $(window).on('resize', () => {
      this.windowResized();
    });
    this.windowResized();

    // Headroom
    var header = document.querySelector("header.top-bar-stuck");
    var headroom  = new Headroom(header, {
      "offset": 100,
      "tolerance": 5
    });
    headroom.init();

    const ci = new cookieinfo();
    ci.options.message = "We use cookies to track anonymous usage statistics and do not collect any personal information that can be used to identify you. By continuing to visit this site you agree to our use of cookies.";
    ci.options.fontFamily = "'Open Sans',Helvetica,Arial,sans-serif";
    ci.options.bg = "#fff";
    ci.options.link = "#448532";
    ci.options.divlink = "#fff";
    ci.options.divlinkbg = "#448532";
    ci.options.position = "bottom";
    ci.options.acceptOnScroll = "true";
    ci.options.moreinfo = "/cookies";
    ci.options.cookie = "CookieInfoScript";
    ci.options.textAlign = "left";
    ci.run();
  }

  windowResized() {
    var width = $(window).width();
    var newDisplayMode = null;
    this.displayModes.forEach(function(mode) {
      if (width >= mode.min && width < mode.max) {
        newDisplayMode = mode.name;
      }
    });
    if (newDisplayMode !== this.displayMode) {
      this.displayMode = newDisplayMode;
      this.displayModeChanged();
    }
    this.fie();
  }

  displayModeChanged() {
    // console.log('Display Mode!xs:', this.displayMode);
    this.occasionalDrawers.forEach(od => {
      var menuButton = $(od.element).data('menu-button');
      if (this.displayMode === 'desktop') {
        if (od.mdc) {
          od.mdc.destroy();
        }
        $(od.element).removeClass('mdc-drawer--modal');
        $(menuButton).off('click');
      } else {
        $(od.element).addClass('mdc-drawer--modal');
        od.mdc = mdc.drawer.MDCDrawer.attachTo(od.element);
        $(menuButton).on('click', () => { od.mdc.open = !od.mdc.open; });
      }
    });
  }

  helpBoxes() {
    this.$helpBoxes = $('[data-help-box-id]').each((i, o) => {
      const $helpBox = $(o);
      const id = $helpBox.data('help-box-id');
      const $dismissButton = $helpBox.find('.help-box__dismiss-button');
      $dismissButton.on('click', (evt) => {
        $helpBox.addClass('help-box--dismissed');
        const dismissedCookie = this.getCookie('sa_dismissed') || '';
        const dismissedList = dismissedCookie.substr(1, dismissedCookie.length - 2).split('][');
        if (dismissedList.indexOf(id) === -1) {
          dismissedList.push(id);
        }
        const newCookie = '[' + dismissedList.join('][') + ']';
        this.setCookie('sa_dismissed', newCookie);
      });
    });

    this.$helpBoxToggles = $('[data-help-box-toggle]').click(evt => {
      const $helpBoxToggle = $(evt.currentTarget);
      const id = $helpBoxToggle.data('help-box-toggle');
      const $helpBox = $('[data-help-box-id="' + id + '"]');

      if ($helpBox.hasClass('help-box--dismissed')) {
        $helpBox.removeClass('help-box--dismissed');
      } else {
        $helpBox.addClass('help-box--flash').fadeOut(50).fadeIn(250);
      }
    });
  }

  fie() {
    if (!this.ie) return;
    $('.mdc-drawer--occasional .mdc-drawer__drawer').each(function(i, o) {
      var $o = $(o);
      var parentHeight = $o.parent().height();
      $o.css('height', parentHeight);
    });
  }

  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/; secure";
  }

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  disable(elements, disable) {
    disable = typeof disable === 'undefined' ? true : disable;
    for (var e = 0; e < elements.length; ++e) {
      var element = elements[e];
      var opacity = disable ? 0.5 : 1;
      $(element).prop('disabled', disable).css('opacity', opacity);
    }
  }
}