# iptools-jquery-offcanvas [![Build Status](https://api.travis-ci.org/interactive-pioneers/iptools-jquery-offcanvas.svg)](https://travis-ci.org/interactive-pioneers/iptools-jquery-offcanvas) [![Bower version](https://badge.fury.io/bo/iptools-jquery-offcanvas.svg)](http://badge.fury.io/bo/iptools-jquery-offcanvas)

Simple CSS3 animated offcanvas.

## Features

- Displays content inside an offcanvas from the top, right, bottom or left.
- Multiple instances at once.
- Static, instance is open on page load.
- CSS3 transitions and animations.

## Options

All options are optional.

Name                 | type     | default value               | values                                     | description                        | version
:--------------------|:---------|:----------------------------|:-------------------------------------------|:-----------------------------------|:---------
baseClass            | string   | offcanvas                   | valid css class string                     | canvas css class                   | < 1.0.0
type                 | string   | left                        | top, right, bottom, left                   | canvas position                    | < 1.0.0
single               | boolean  | true                        |                                            |                                    | < 1.0.0
closeOnClickOutside  | boolean  | false                       |                                            |                                    | < 1.0.0
static               | boolean  | false                       |                                            | open after initialization          | >= 1.0.0
staticCondition      | function | function() { return true; } | a function returning either true or false  | close condition for static canvas  | >= 1.0.0

## Events

Namespace     | Event        | Element        | Description
:-------------|:-------------|:---------------|:-----------
iptOffCanvas  | initialized  | this.$element  | Emitted after initialization took place.
iptOffCanvas  | opened       | this.$element  | Emitted when the canvas opens.
iptOffCanvas  | closed       | this.$element  | Emitted when the canvas closes.

## Requirements

- jQuery >=1.11.3 <4

## Example

```html
<button data-offcanvas-open="custom">open</button>
<button data-offcanvas-close="custom">close</button>

<section id="custom" class="offcanvas">
  <p>offcanvas content</p>
  <button data-offcanvas-close="custom">X</button>
</section>

<link rel="stylesheet" href="dist/iptools-jquery-offcanvas.css" type="text/css">
<script src="dist/iptools-jquery-offcanvas.min.js"></script>
<script type="text/javascript">
  $(document).ready(function() {

    // bind
    $('#custom').iptOffCanvas({
      baseClass: 'offcanvas',
      type: 'left'
    });

    // example event listener
    $('#custom').on('iptOffCanvas.opened', function() {
      console.log('canvas opened');
    });

  });
</script>
```

http://www.jqueryscript.net/menu/Minimal-Overlaying-Off-canvas-Plugin-With-jQuery-Iptools-Offcanvas.html

## Contributions

### Bug reports, suggestions

- File all your issues, feature requests [here](https://github.com/interactive-pioneers/iptools-jquery-offcanvas/issues)
- If filing a bug report, follow the convention of _Steps to reproduce_ / _What happens?_ / _What should happen?_
- __If you're a developer, write a failing test instead of a bug report__ and send a Pull Request

### Code

1. Fork it ( https://github.com/[my-github-username]/iptools-jquery-offcanvas/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Install dependencies (`npm i`)
4. Develop your feature by concepts of [TDD](http://en.wikipedia.org/wiki/Test-driven_development), see [Tips](#tips)
5. Commit your changes (`git commit -am 'Add some feature'`)
6. Push to the branch (`git push origin my-new-feature`)
7. Create a new Pull Request

### Tips

Following tasks are there to help with development:

- `grunt watch` listens to source, live reloads browser
- `grunt qa` run QA task that includes tests and JSHint
- `grunt build` minify source to dist/

## Licence

Copyright © 2015 Interactive Pioneers GmbH. Licenced under [GPLv3](LICENSE).
