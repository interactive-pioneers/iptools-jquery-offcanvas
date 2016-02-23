/*jshint -W003 */

(function($) {

  'use strict';

  var pluginName = 'iptOffCanvas';

  var dataAttr = {
    rel: 'rel'
  };

  var noop = function() {
    return true;
  };

  var defaults = {
    baseClass: 'offcanvas',
    type: 'right',
    single: true,
    static: false,
    staticCondition: noop
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
    open: '__trigger--open',
    close: '__trigger--close',
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

    this.$open = $(selectorFromClass(classes.open) + '[data-' + dataAttr.rel + '="' + this.id + '"]');
    this.$close = $(selectorFromClass(classes.close) + '[data-' + dataAttr.rel + '="' + this.id + '"]');

    setTypeCssClasses(this);
    addEventListeners(this);

    this.$element.trigger(getNamespacedEvent('initialized'));
  }

  IPTOffCanvas.prototype.toggle = function(add, event) {
    var activeTypeClass = this.settings.baseClass + types[this.settings.type].activeClass;
    var offcanvasInstance;

    if (typeof add === 'undefined') {
      add = !this.$element.hasClass(activeTypeClass);
    }

    if (this.settings.single && add) {
      $(selectorFromClass(classes.initialized)).each(function() {
        offcanvasInstance = $(this).data('plugin_' + pluginName);
        if (!(offcanvasInstance.settings.static && offcanvasInstance.settings.staticCondition())) {
          $(this).trigger(getNamespacedEvent('close'));
        }
      });
    }

    this.$element.trigger(getNamespacedEvent(add ? 'opened' : 'closed'), event);

    this.$element.toggleClass(activeTypeClass, add);
  };

  IPTOffCanvas.prototype.destroy = function() {
    this.$open.off(getNamespacedEvent('click'));
    this.$close.off(getNamespacedEvent('click'));
    this.$element
      .off(getNamespacedEvent('initialized'))
      .off(getNamespacedEvent('open'))
      .off(getNamespacedEvent('close'))
      .removeData('plugin_' + pluginName);
  };

  function initialize(event) {
    var self = event.data;

    if (self.settings.static) {
      self.toggle(true);
    }

    self.$element.addClass(baseClass + classes.initialized);
  }

  function open(event) {
    event.data.toggle(true, event);

    event.stopPropagation();
  }

  function close(event) {
    event.data.toggle(false, event);

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
