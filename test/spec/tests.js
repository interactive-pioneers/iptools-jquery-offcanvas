'use strict';

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
    var selector2 = '#custom2';
    var object2;

    function getNamespacedEvent(eventType, id) {
      if (typeof id === 'undefined') {
        return eventType + '.iptOffCanvas';
      } else {
        return eventType + '.' +  id + '@iptOffCanvas';
      }
    }

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

      it('expected object to be active', function() {
        object.data(pluginName).toggle(true);

        return expect(object.data(pluginName).isActive()).to.be.true;
      });

      it('expected object to be not active', function() {
        object.data(pluginName).toggle(false);

        return expect(object.data(pluginName).isActive()).to.be.false;
      });

      it('expected object to toggle', function() {
        var before = object.data(pluginName).isActive();
        object.data(pluginName).toggle();
        var after = object.data(pluginName).isActive();

        return expect(before === after).to.be.false;
      });

      it('expected object settings', function() {
        var settings = object.data(pluginName).getSettings();

        return expect(JSON.stringify(settings) === JSON.stringify(config)).to.be.true;
      });

    });

    describe('settings', function() {

      describe('option closeOnClickOutside', function() {

        beforeEach(function() {
          object = $(selector).iptOffCanvas($.extend({}, config, {closeOnClickOutside: true}));
        });

        afterEach(function() {
          object.data(pluginName).destroy();
        });

        it('expected object to close on click outside', function() {
          object.data(pluginName).toggle(true);
          $(document).trigger('click');

          return expect(object.data(pluginName).isActive()).to.be.false;
        });

      });

      describe('option static', function() {

        beforeEach(function() {
          object = $(selector).iptOffCanvas($.extend({}, config, {static: true}));
        });

        afterEach(function() {
          object.data(pluginName).destroy();
        });

        it('expected object to be static', function() {
          return expect(object.data(pluginName).isActive()).to.be.true;
        });

      });

      describe('func static to close when single opens', function() {

        beforeEach(function() {
          object = $(selector).iptOffCanvas($.extend({}, config, {static: true}));
          object2 = $(selector2).iptOffCanvas($.extend({}, config, {static: true, type: 'bottom'}));
        });

        afterEach(function() {
          object.data(pluginName).destroy();
          object2.data(pluginName).destroy();
        });

        it('expected object2 static to close when object single opens', function() {
          var object = $(selector).iptOffCanvas(config);
          var objectHandler = object.data(pluginName);
          var object2 = $(selector2).iptOffCanvas($.extend({}, config, {static: true, type: 'bottom'}));
          var objectHandler2 = object2.data(pluginName);

          objectHandler.toggle(true);

          return expect(objectHandler2.isActive()).to.be.false;
        });

      });

      describe('func static to not close when single opens', function() {

        beforeEach(function() {
          object = $(selector).iptOffCanvas(config);
          object2 = $(selector2).iptOffCanvas($.extend({}, config, {
            static: true,
            staticCloseCondition: function() { return false; },
            type: 'bottom'
          }));
        });

        afterEach(function() {
          object.data(pluginName).destroy();
          object2.data(pluginName).destroy();
        });

        it('expected object2 static to not close when object single opens', function() {
          object.data(pluginName).toggle(true);

          return expect(object2.data(pluginName).isActive()).to.be.true;
        });

      });

      describe('option single', function() {

        beforeEach(function() {
          object = $(selector).iptOffCanvas(config);
          object2 = $(selector2).iptOffCanvas($.extend({}, config, {type: 'bottom', single: false}));
        });

        afterEach(function() {
          object.data(pluginName).destroy();
          object2.data(pluginName).destroy();
        });

        it('expected object to be single', function() {

          object2.data(pluginName).toggle(true);
          object.data(pluginName).toggle(true);

          return expect(object.data(pluginName).isActive() && object2.data(pluginName).isActive()).to.be.false;
        });

      });

      describe('option no single', function() {

        beforeEach(function() {
          object = $(selector).iptOffCanvas($.extend({}, config, {single: false}));
          object2 = $(selector2).iptOffCanvas($.extend({}, config, {type: 'bottom', single: false}));
        });

        afterEach(function() {
          object.data(pluginName).destroy();
          object2.data(pluginName).destroy();
        });

        it('expected object not to be single', function() {

          object.data(pluginName).toggle(true);
          object2.data(pluginName).toggle(true);

          return expect(object.data(pluginName).isActive() && object2.data(pluginName).isActive()).to.be.true;
        });

      });

      describe('option single multiple', function() {

        beforeEach(function() {
          object = $(selector).iptOffCanvas(config);
          object2 = $(selector2).iptOffCanvas($.extend({}, config, {type: 'bottom'}));
        });

        afterEach(function() {
          object.data(pluginName).destroy();
          object2.data(pluginName).destroy();
        });

        it('expected two object single at once', function() {

          object.data(pluginName).toggle(true);
          object2.data(pluginName).toggle(true);
          var first = !object.data(pluginName).isActive() && object2.data(pluginName).isActive();

          object.data(pluginName).toggle(true);
          var second = object.data(pluginName).isActive() && !object2.data(pluginName).isActive();

          return expect(first && second).to.be.true;
        });

      });

    });

    describe('events', function() {

      beforeEach(function() {
        object = $(selector).iptOffCanvas(config);
      });

      afterEach(function() {
        object.off();
        object.data(pluginName).destroy();
      });

      // @TODO test initialized event
      // it('expected object to emit the "initialized" event', function(done) {
      //   object.on(getNamespacedEvent('initialized', 'custom'), function() {
      //     done();
      //   });
      // });

      it('expected object to emit the "opened" event', function(done) {
        object.on(getNamespacedEvent('opened', 'custom'), function() {
          done();
        });
        object.data(pluginName).toggle(true);
      });

      it('expected object to emit the "closed" event', function(done) {
        object.on(getNamespacedEvent('closed', 'custom'), function() {
          done();
        });
        object.data(pluginName).toggle(true);
        object.data(pluginName).toggle();
      });

    });

    describe('destroy', function() {

      beforeEach(function() {
        object = $(selector).iptOffCanvas(config);
      });

      // afterEach(function() {});

      it('expected object to remove data', function() {
        object.data(pluginName).destroy();
        return expect(object.data(pluginName)).to.not.be.ok;
      });

    });

  });

})();
