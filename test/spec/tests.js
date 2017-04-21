'use strict';

/* jshint undef: false */

(function() {

  describe('iptOffCanvas', function() {

    var config = {
      baseClass: 'offcanvas',
      type: 'right',
      single: false
    };

    var pluginName = 'plugin_iptOffCanvas';
    var selector = '#custom';
    var object = null;

    describe('init', function() {

      beforeEach(function() {
        object = $(selector).iptOffCanvas(config);
      });

      afterEach(function() {
        object.data(pluginName).destroy();
      });

      it('expected to construct object', function() {
        return expect(object).to.be.an.object;
      });

    });

    describe('ui', function() {

      beforeEach(function() {
        object = $(selector).iptOffCanvas(config);
      });

      afterEach(function() {
        object.data(pluginName).destroy();
      });

      it('expected to add active class', function() {
        object.data(pluginName).toggle(true);

        return expect($(selector).hasClass('offcanvas--right--active')).to.be.ok;
      });

      it('expected to remove active class', function() {
        object.data(pluginName).toggle(false);

        return expect($(selector).hasClass('offcanvas--right--active')).to.be.not.ok;
      });

      it('expected to toggle active class', function() {
        var before = $(selector).hasClass('offcanvas--right--active');
        object.data(pluginName).toggle();
        var after = $(selector).hasClass('offcanvas--right--active');

        return expect(before !== after).to.be.ok;
      });

    });

    describe('destroy', function() {

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

    });

  });

})();
