# Contributing

## Important notes
Please don't edit files in the `dist` subdirectory as they are generated via Grunt. You'll find source code in the `src` subdirectory!

### Code style
See [JavaScript coding conventions](http://conventions.interactive-pioneers.com/JavaScript) of Interactive Pioneers.

## Bug reports, suggestions

- File all your issues, feature requests [here](https://github.com/interactive-pioneers/iptools-jquery-offcanvas/issues)
- If filing a bug report, follow the convention of _Steps to reproduce_ / _What happens?_ / _What should happen?_
- __If you're a developer, write a failing test instead of a bug report__ and send a Pull Request

## Code

1. Fork it ( https://github.com/[my-github-username]/iptools-jquery-offcanvas/fork )
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Install dependencies (`npm i`)
4. Develop your feature by concepts of [TDD](http://en.wikipedia.org/wiki/Test-driven_development), see [Tips](#tips)
5. Commit your changes (`git commit -am 'Add some feature'`)
6. Push to the branch (`git push origin my-new-feature`)
7. Create a new Pull Request

## Tips

Following tasks are there to help with development:

- `npm run grunt watch` listens to source, runs full QA and live-reloads browser
- `npm start` listens source, runs tests
- `nmp test` runs full QA
- `npm run grunt build` minify source to dist/
