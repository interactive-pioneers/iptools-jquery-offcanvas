/*jshint -W003 */

(function($) {

  'use strict';

  var pluginName = 'iptOffCanvas';

  var dataAttr = {
    open: 'offcanvas-open',
    close: 'offcanvas-close'
  };

  var noop = function() {
    return true;
  };

  var defaults = {
    baseClass: 'offcanvas',
    single: true,
    static: false,
    staticCondition: noop,
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

  var baseClass = 'offcanvas';
  var classes = {
    content: '__content',
    initialized: '--initialized'
  };

  function IPTOffCanvas(element, options) {
    this.settings = $.extend({}, defaults, options);
    this.$element = $(element);

    var error = validateInstance(this);
    if (error !== '') {
      throw new Error(pluginName + ': ' + error);
    }

    this.id = this.$element.attr('id');

    this.$open = $('[data-' + dataAttr.open + '="' + this.id + '"]');
    this.$close = $('[data-' + dataAttr.close + '="' + this.id + '"]');

    setTypeCssClasses(this);
    addEventListeners(this);

    this.$element.trigger(getNamespacedEvent('initialized'));
  }

  IPTOffCanvas.prototype.isActive = function() {
    return this.$element.hasClass(this.settings.baseClass + types[this.settings.type].activeClass);
  };

  IPTOffCanvas.prototype.toggle = function(originalEvent, open) {
    var activeTypeClass = this.settings.baseClass + types[this.settings.type].activeClass;
    var offcanvasInstance;

    if (typeof open === 'undefined') {
      open = !this.isActive();
    }

    if (this.settings.single && open) {
      $(selectorFromClass(classes.initialized)).each(function() {
        offcanvasInstance = $(this).data('plugin_' + pluginName);
        if (!(offcanvasInstance.settings.static && offcanvasInstance.settings.staticCondition())) {
          $(this).trigger(getNamespacedEvent('close'));
        }
      });
    }

    // trigger opened closed events for instance
    var eventName = '';
    if (open && !this.isActive()) {
      eventName = 'opened';
    } else if (!open && this.isActive()) {
      eventName = 'closed';
    }
    if (eventName !== '') {
      this.$element.trigger(getNamespacedEvent(eventName), originalEvent);
    }

    this.$element.toggleClass(activeTypeClass, open);
  };

  IPTOffCanvas.prototype.destroy = function() {
    this.$open.off('.' + pluginName);
    this.$close.off('.' + pluginName);
    this.$element
      .off('.' + pluginName)
      .removeData('plugin_' + pluginName);
  };

  function initialize(event) {
    var self = event.data;

    if (self.settings.static) {
      self.toggle(true);
    }

    self.$element.addClass(baseClass + classes.initialized);
  }

  function toggle(event) {
    event.data.toggle(event);

    event.stopPropagation();
  }

  function open(event) {
    event.data.toggle(event, true);

    event.stopPropagation();
  }

  function close(event) {
    event.data.toggle(event, false);

    event.stopPropagation();
  }

  function setTypeCssClasses(instance) {
    instance.$element.addClass(instance.settings.baseClass + types[instance.settings.type].baseClass);
  }

  function selectorFromClass(className) {
    return '.' + baseClass + className;
  }

  function getNamespacedEvent(event) {
    return event + '.' + pluginName;
  }

  function validateInstance(instance) {
    // check for required id attr
    if ($.trim(instance.$element.attr('id')) === '') {
      return 'Required attr `id` missing on element!';
    }
    // check for valid type
    if (typeof types[instance.settings.type] === 'undefined') {
      return 'Invalid type `' + instance.settings.type + '` given!';
    }
    return '';
  }

  function addEventListeners(instance) {
    instance.$element.on(getNamespacedEvent('initialized'), null, instance, initialize);
    instance.$element.on(getNamespacedEvent('toggle'), null, instance, toggle);
    instance.$element.on(getNamespacedEvent('open'), null, instance, open);
    instance.$element.on(getNamespacedEvent('close'), null, instance, close);
    instance.$open.on(getNamespacedEvent('click'), null, instance, open);
    instance.$close.on(getNamespacedEvent('click'), null, instance, close);
  }

  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new IPTOffCanvas(this, options));
      }
    });

  };

})(jQuery);
