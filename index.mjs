// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import{isPrimitive as s}from"https://cdn.jsdelivr.net/gh/stdlib-js/assert-is-positive-integer@v0.2.2-esm/index.mjs";import t from"https://cdn.jsdelivr.net/gh/stdlib-js/stats-incr-mmean@v0.2.2-esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-signum@v0.2.2-esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/math-base-special-kronecker-delta@v0.2.1-esm/index.mjs";import i from"https://cdn.jsdelivr.net/gh/stdlib-js/error-tools-fmtprodmsg@v0.2.2-esm/index.mjs";function n(n){var m,d,o,l;if(!s(n))throw new TypeError(i("1IN8B",n));return m=t(n),function(s,t){var i,n;if(0===arguments.length)return m();void 0===d&&(d=!0,o=s,l=t);return i=e(s-o),n=e(t-l),o=s,l=t,m(r(i,n))}}export{n as default};
//# sourceMappingURL=index.mjs.map
