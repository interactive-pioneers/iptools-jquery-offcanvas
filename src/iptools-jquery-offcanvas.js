(function($) {

  'use strict';

  var pluginName = 'iptOffCanvas';

  var dataAttr = {
    rel: 'rel'
  };

  var defaults = {
    baseClass: 'offcanvas',
    type: 'left'
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

  IPTOffCanvas.prototype.toggle = function(add) {
    this.$element.toggleClass(this.settings.baseClass + types[this.settings.type].activeClass, add);
  };

  IPTOffCanvas.prototype.destroy = function() {
    this.$open.off(getNamespacedEvent('click'));
    this.$close.off(getNamespacedEvent('click'));
    this.$element.removeData('plugin_' + pluginName);
  };

  function initialize(event) {
    event.data.$element.addClass(baseClass + classes.initialized);
  }

  function open(event) {
    event.data.toggle(true);
  }

  function close(event) {
    event.data.toggle(false);
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
