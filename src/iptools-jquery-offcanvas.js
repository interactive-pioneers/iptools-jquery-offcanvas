(function($) {

  'use strict';

  var pluginName = 'iptOffCanvas';

  var baseClass = 'offcanvas';
  var classes = {
    open: baseClass + '__trigger--open',
    close: baseClass + '__trigger--close',
    content: baseClass + '__content',
    initialized: baseClass + '--initialized'
  };

  var dataAttr = {
    rel: 'rel'
  };

  var defaults = {
    type: 'left'
  };

  var types = {
    top: {
      baseClass: baseClass + '--top',
      activeClass: baseClass + '--top--active'
    },
    right: {
      baseClass: baseClass + '--right',
      activeClass: baseClass + '--right--active'
    },
    bottom: {
      baseClass: baseClass + '--bottom',
      activeClass: baseClass + '--bottom--active'
    },
    left: {
      baseClass: baseClass + '--left',
      activeClass: baseClass + '--left--active'
    },
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
    this.$element.toggleClass(types[this.settings.type].activeClass, add);
  };

  IPTOffCanvas.prototype.destroy = function() {
    this.$open.off(getNamespacedEvent('click'));
    this.$close.off(getNamespacedEvent('click'));
    this.$element.removeData('plugin_' + pluginName);
  };

  function initialize(event) {
    event.data.$element.addClass(classes.initialized);
  }

  function open(event) {
    event.data.toggle(true);
  }

  function close(event) {
    event.data.toggle(false);
  }

  function setTypeCssClasses(instance) {
    instance.$element.addClass(types[instance.settings.type].baseClass);
  }

  function selectorFromClass(className) {
    return '.' + className;
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
