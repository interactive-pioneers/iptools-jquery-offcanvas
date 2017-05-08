/*jshint -W003 */

(function($, window, document) {

  'use strict';

  var pluginName = 'iptOffCanvas';

  var dataAttr = {
    open: 'offcanvas-open',
    close: 'offcanvas-close',
    toggle: 'offcanvas-toggle'
  };

  var alwaysTrue = function() {
    return true;
  };

  var defaults = {
    baseClass: 'offcanvas',
    closeOnClickOutside: false,
    single: true,
    static: false,
    staticCloseCondition: alwaysTrue,
    type: 'right'
  };

  var types = {
    top: {
      baseClass: '--top',
      activeClass: '--top--active'
    },
    right: {
      baseClass: '--right',
      activeClass: '--right--active'
    },
    bottom: {
      baseClass: '--bottom',
      activeClass: '--bottom--active'
    },
    left: {
      baseClass: '--left',
      activeClass: '--left--active'
    },
  };

  var modifiers = {
    initialized: '--initialized'
  };

  function IPTOffCanvas(element, options) {
    this.settings = $.extend({}, defaults, options);
    this.$element = $(element);

    this.id = this.$element.attr('id');
    this.$open = $('[data-' + dataAttr.open + '="' + this.id + '"]');
    this.$close = $('[data-' + dataAttr.close + '="' + this.id + '"]');
    this.$toggle = $('[data-' + dataAttr.toggle + '="' + this.id + '"]');

    this.$element.addClass(this.settings.baseClass + types[this.settings.type].baseClass);

    addEventListeners(this);
    initialize(this);

    this.$element.trigger(getNamespacedEvent('initialized', this.id));
  }

  IPTOffCanvas.prototype.getSettings = function() {
    return this.settings;
  };

  IPTOffCanvas.prototype.isActive = function() {
    return this.$element.hasClass(this.settings.baseClass + types[this.settings.type].activeClass);
  };

  IPTOffCanvas.prototype.toggle = function(open) {
    var activeTypeClass = this.settings.baseClass + types[this.settings.type].activeClass;
    var offcanvasInstance;
    var offcanvasSettings;
    var self = this;

    open = typeof open === 'undefined' ? !this.isActive() : open;

    if (this.settings.single && open) {
      $(selectorFromClass(this.settings.baseClass, modifiers.initialized)).each(function() {

        offcanvasInstance = $(this).data('plugin_' + pluginName);
        offcanvasSettings = offcanvasInstance.getSettings();

        if (
          self.$element !== offcanvasInstance.$element &&
          offcanvasInstance.isActive() &&
          (
            !offcanvasSettings.static ||
            offcanvasSettings.static && offcanvasSettings.staticCloseCondition()
          )
        ) {
          offcanvasInstance.toggle(false);
        }

      });
    }

    // trigger opened closed events for instance
    var eventName = '';
    if (open && !this.isActive()) {
      eventName = 'opened';
      bindCloseOnClickOutsideEvents(this);
    } else if (!open && this.isActive()) {
      eventName = 'closed';
      unbindCloseOnClickOutsideEvents(this);
    }
    if (eventName !== '') {
      this.$element.trigger(getNamespacedEvent(eventName, this.id));
    }

    this.$element.toggleClass(activeTypeClass, open);
  };

  IPTOffCanvas.prototype.destroy = function() {
    this.$open.off('.' + pluginName);
    this.$close.off('.' + pluginName);
    this.$toggle.off('.' + pluginName);
    this.$element
      .removeClass(this.settings.baseClass + modifiers.initialized)
      .removeClass(this.settings.baseClass + types[this.settings.type].activeClass)
      .removeData('plugin_' + pluginName);
  };

  function initialize(instance) {
    if (instance.settings.static) {
      instance.toggle(true);
    }

    instance.$element.addClass(instance.settings.baseClass + modifiers.initialized);
  }

  function open(event) {
    event.data.toggle(true);
    event.stopPropagation();
  }

  function close(event) {
    event.data.toggle(false);
    event.stopPropagation();
  }

  function toggle(event) {
    event.data.toggle();
    event.stopPropagation();
  }

  function bindCloseOnClickOutsideEvents(instance) {
    if (instance.settings.closeOnClickOutside && !instance.settings.static) {
      $(document)
        .on(getNamespacedEvent('click', instance.id), null, instance, handleDocumentClick)
        .on(getNamespacedEvent('touchstart', instance.id), null, instance, handleDocumentClick);
    }
  }

  function unbindCloseOnClickOutsideEvents(instance) {
    $(document)
      .off(getNamespacedEvent('click', instance.id))
      .off(getNamespacedEvent('touchstart', instance.id));
  }

  function handleDocumentClick(event) {
    var self = event.data;
    if (!self.$element.is(event.target) && self.$element.has(event.target).length === 0) {
      self.toggle(false);
    }
  }

  function selectorFromClass(baseClass, className) {
    return '.' + baseClass + className;
  }

  function getNamespacedEvent(eventType, id) {
    if (typeof id === 'undefined') {
      return eventType + '.' + pluginName;
    } else {
      return eventType + '.' +  id + '@' + pluginName;
    }
  }

  function addEventListeners(instance) {
    instance.$open
      .on(getNamespacedEvent('click', instance.id), null, instance, open)
      .on(getNamespacedEvent('touchstart', instance.id), null, instance, open);
    instance.$close
      .on(getNamespacedEvent('click', instance.id), null, instance, close)
      .on(getNamespacedEvent('touchstart', instance.id), null, instance, close);
    instance.$toggle
        .on(getNamespacedEvent('click', instance.id), null, instance, toggle)
        .on(getNamespacedEvent('touchstart', instance.id), null, instance, toggle);
  }

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTOffCanvas(this, options));
      }
    });

  };

})(jQuery, window, document);
