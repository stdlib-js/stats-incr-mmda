<!--

@license Apache-2.0

Copyright (c) 2018 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# incrmmda

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Compute a moving [mean directional accuracy][mean-directional-accuracy] (MDA) incrementally.

<section class="intro">

For a window of size `W`, the [mean directional accuracy][mean-directional-accuracy] is defined as

<!-- <equation class="equation" label="eq:mean_directional_accuracy" align="center" raw="\operatorname{MDA} = \begin{cases} 1 & \textrm{if}\ W = 1 \\ \frac{1}{W} \sum_{i=1}^{W} \delta_{\operatorname{sgn}(\Delta f_{i,i-1}),\ \operatorname{sgn}(\Delta a_{i,i-1})} & \textrm{if}\ W > 1 \end{cases}" alt="Equation for the mean directional accuracy."> -->

```math
\mathop{\mathrm{MDA}} = \begin{cases} 1 & \textrm{if}\ W = 1 \\ \frac{1}{W} \sum_{i=1}^{W} \delta_{\mathop{\mathrm{sgn}}(\Delta f_{i,i-1}),\ \mathop{\mathrm{sgn}}(\Delta a_{i,i-1})} & \textrm{if}\ W > 1 \end{cases}
```

<!-- <div class="equation" align="center" data-raw-text="\operatorname{MDA} = \begin{cases} 1 & \textrm{if}\ W = 1 \\\frac{1}{W} \sum_{i=1}^{W} \delta_{\operatorname{sgn}(\Delta f_{i,i-1}),\ \operatorname{sgn}(\Delta a_{i,i-1})} & \textrm{if}\ W > 1 \end{cases}" data-equation="eq:mean_directional_accuracy">
    <img src="https://cdn.jsdelivr.net/gh/stdlib-js/stdlib@99730afbace8256ce53cfbc0714c7f3cac92466a/lib/node_modules/@stdlib/stats/incr/mmda/docs/img/equation_mean_directional_accuracy.svg" alt="Equation for the mean directional accuracy.">
    <br>
</div> -->

<!-- </equation> -->

where `f_i` is the forecast value, `a_i` is the actual value, `sgn(x)` is the [signum][@stdlib/math/base/special/signum] function, and `δ` is the [Kronecker delta][@stdlib/math/base/special/kronecker-delta]. 

</section>

<!-- /.intro -->

<section class="installation">

## Installation

```bash
npm install @stdlib/stats-incr-mmda
```

Alternatively,

-   To load the package in a website via a `script` tag without installation and bundlers, use the [ES Module][es-module] available on the [`esm`][esm-url] branch (see [README][esm-readme]).
-   If you are using Deno, visit the [`deno`][deno-url] branch (see [README][deno-readme] for usage intructions).
-   For use in Observable, or in browser/node environments, use the [Universal Module Definition (UMD)][umd] build available on the [`umd`][umd-url] branch (see [README][umd-readme]).

The [branches.md][branches-url] file summarizes the available branches and displays a diagram illustrating their relationships.

To view installation and usage instructions specific to each branch build, be sure to explicitly navigate to the respective README files on each branch, as linked to above.

</section>

<section class="usage">

## Usage

```javascript
var incrmmda = require( '@stdlib/stats-incr-mmda' );
```

#### incrmmda( window )

Returns an accumulator `function` which incrementally computes a moving [mean directional accuracy][mean-directional-accuracy]. The `window` parameter defines the number of values over which to compute the moving [mean directional accuracy][mean-directional-accuracy].

```javascript
var accumulator = incrmmda( 3 );
```

#### accumulator( \[f, a] )

If provided input values `f` and `a`, the accumulator function returns an updated [mean directional accuracy][mean-directional-accuracy]. If not provided input values `f` and `a`, the accumulator function returns the current [mean directional accuracy][mean-directional-accuracy].

```javascript
var accumulator = incrmmda( 3 );

var m = accumulator();
// returns null

// Fill the window...
m = accumulator( 2.0, 3.0 ); // [(+,+)]
// returns 1.0

m = accumulator( 1.0, 4.0 ); // [(+,+), (-,+)]
// returns 0.5

m = accumulator( 3.0, 9.0 ); // [(+,+), (-,+), (+,+)]
// returns ~0.67

// Window begins sliding...
m = accumulator( 7.0, 3.0 ); // [(-,+), (+,+), (+,-)]
// returns ~0.33

m = accumulator( 5.0, 3.0 ); // [(+,+), (+,-), (-,0)]
// returns ~0.33

m = accumulator();
// returns ~0.33
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   Input values are **not** type checked. If provided `NaN` or a value which, when used in computations, results in `NaN`, the accumulated value is `NaN` for **at least** `W-1` future invocations. If non-numeric inputs are possible, you are advised to type check and handle accordingly **before** passing the value to the accumulator function.
-   As `W` (f,a) pairs are needed to fill the window buffer, the first `W-1` returned values are calculated from smaller sample sizes. Until the window is full, each returned value is calculated from all provided values. 

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```javascript
var randu = require( '@stdlib/random-base-randu' );
var incrmmda = require( '@stdlib/stats-incr-mmda' );

var accumulator;
var v1;
var v2;
var i;

// Initialize an accumulator:
accumulator = incrmmda( 5 );

// For each simulated datum, update the moving mean directional accuracy...
for ( i = 0; i < 100; i++ ) {
    v1 = ( randu()*100.0 ) - 50.0;
    v2 = ( randu()*100.0 ) - 50.0;
    accumulator( v1, v2 );
}
console.log( accumulator() );
```

</section>

<!-- /.examples -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

* * *

## See Also

-   <span class="package-name">[`@stdlib/stats-incr/mda`][@stdlib/stats/incr/mda]</span><span class="delimiter">: </span><span class="description">compute the mean directional accuracy (MDA) incrementally.</span>
-   <span class="package-name">[`@stdlib/stats-incr/mmape`][@stdlib/stats/incr/mmape]</span><span class="delimiter">: </span><span class="description">compute a moving mean absolute percentage error (MAPE) incrementally.</span>

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2024. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/stats-incr-mmda.svg
[npm-url]: https://npmjs.org/package/@stdlib/stats-incr-mmda

[test-image]: https://github.com/stdlib-js/stats-incr-mmda/actions/workflows/test.yml/badge.svg?branch=v0.2.2
[test-url]: https://github.com/stdlib-js/stats-incr-mmda/actions/workflows/test.yml?query=branch:v0.2.2

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/stats-incr-mmda/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/stats-incr-mmda?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/stats-incr-mmda.svg
[dependencies-url]: https://david-dm.org/stdlib-js/stats-incr-mmda/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/stats-incr-mmda/tree/deno
[deno-readme]: https://github.com/stdlib-js/stats-incr-mmda/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/stats-incr-mmda/tree/umd
[umd-readme]: https://github.com/stdlib-js/stats-incr-mmda/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/stats-incr-mmda/tree/esm
[esm-readme]: https://github.com/stdlib-js/stats-incr-mmda/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/stats-incr-mmda/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/stats-incr-mmda/main/LICENSE

[mean-directional-accuracy]: https://en.wikipedia.org/wiki/Mean_Directional_Accuracy_%28MDA%29

[@stdlib/math/base/special/signum]: https://github.com/stdlib-js/math-base-special-signum

[@stdlib/math/base/special/kronecker-delta]: https://github.com/stdlib-js/math-base-special-kronecker-delta

<!-- <related-links> -->

[@stdlib/stats/incr/mda]: https://github.com/stdlib-js/stats-incr-mda

[@stdlib/stats/incr/mmape]: https://github.com/stdlib-js/stats-incr-mmape

<!-- </related-links> -->

</section>

<!-- /.links -->
