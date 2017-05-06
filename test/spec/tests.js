'use strict';

/* jshint undef: false */

(function() {

  describe('iptOffCanvas', function() {

    var config = {
      baseClass: 'offcanvas',
      closeOnClickOutside: false,
      single: true,
      static: false,
      staticCloseCondition: function() { return true; },
      type: 'right'
    };

    var pluginName = 'plugin_iptOffCanvas';
    var selector = '#custom';
    var object;
    var objectHandler;
    var object2;

    describe('init', function() {

      beforeEach(function() {
        object = $(selector).iptOffCanvas(config);
      });

      afterEach(function() {
        // object.data(pluginName).destroy();
      });

      it('expected to construct object', function() {
        return expect(object).to.be.an.object;
      });

    });

    describe('ui', function() {

      beforeEach(function() {
        object = $(selector).iptOffCanvas(config);
        objectHandler = object.data(pluginName);
      });

      afterEach(function() {
        object.data(pluginName).destroy();
        objectHandler = null;
      });

      it('expected object to be active', function() {
        objectHandler.toggle(true);

        return expect(objectHandler.isActive()).to.be.true;
      });

      it('expected object to be not active', function() {
        objectHandler.toggle(false);

        return expect(objectHandler.isActive()).to.be.false;
      });

      it('expected object to toggle', function() {
        var before = objectHandler.isActive();
        objectHandler.toggle();
        var after = objectHandler.isActive();

        return expect(before === after).to.be.false;
      });

      it('expected object settings', function() {
        var settings = objectHandler.getSettings();

        return expect(JSON.stringify(settings) === JSON.stringify(config)).to.be.true;
      });

    });

    describe('settings', function() {

      // beforeEach(function() {});

      afterEach(function() {
        object.data(pluginName).destroy();
        objectHandler = null;
        if (object2) {
          object2.data(pluginName).destroy();
        }
      });

    });

    /* describe('destroy', function() {

      beforeEach(function() {
        object = $(selector).iptOffCanvas(config);
      });

      afterEach(function() {
        $(selector).off();
      });

      it('expected to remove data', function() {
        object.data(pluginName).destroy();
        return expect(object.data(pluginName)).to.not.be.ok;
      });

    }); */

  });

})();
