# @onegen/optional

> [!WARNING]  
> 🚧 Very much work-in-progress! 🚧

`Optional` utility class in TypeScript, based on C++
[`std::optional`](https://en.cppreference.com/w/cpp/utility/optional).

Made as minimal as I could without any dependencies.

<!--
## Compatibility

| **Runtime** | **Package** |
| ----------- | ----------- |
| Node.JS     | [NPM](#)    |
| Web         | not yet     |
| Deno        | [JSR](#)    |
| Bun         | not yet     | 
-->

## TODO

- [X] ᮄᮔᮤᮞᮤᮃᮜᮤᮐᮧᮝᮒ᮪
- [X] ᮠᮧᮓ᮪ᮔᮧᮒ, `value()`, `hasValue()`, `some` ᮃ `none`
- [ ] ᮖᮥᮔ᮪ᮊ᮪ᮎᮦ `valueOr()` ᮃ ᮒᮦᮞ᮪ᮒᮤ `optional-base.test.ts`
- [ ] ᮖᮥᮔ᮪ᮊ᮪ᮎᮦ `reset()`
- [ ] ᮖᮥᮔ᮪ᮊ᮪ᮎᮦ `wrap()`
- [ ] ᮖᮥᮔ᮪ᮊ᮪ᮎᮦ `emplace()` (ᮙᮧᮯ᮪ᮔ?)
- [ ] ᮒᮦᮞ᮪ᮒᮤ `optional-modif.test.ts` (reset, wrap, emplace)
- [ ] ᮖᮥᮔ᮪ᮊ᮪ᮎᮦ `transform()`
- [ ] ᮖᮥᮔ᮪ᮊ᮪ᮎᮦ `andThen()`
- [ ] ᮖᮥᮔ᮪ᮊ᮪ᮎᮦ `orElse()`
- [ ] ᮒᮦᮞ᮪ᮒᮤ `optional-monadic.test.ts` (transform, andThen, orElse)
- [ ] NPM ᮘᮜᮤᮊ᮪ 0.?
- [ ] ᮒᮦᮞ᮪ᮒᮤ ᮐ᮪ ᮅᮊᮞᮨᮊ᮪
- [ ] NPM ᮘᮜᮤᮊ᮪ 1.0
- [ ] Deno ᮞ᮪ᮊᮢᮤᮕ᮪ᮒ᮪ ᮔ ᮕᮢᮤᮕᮧᮔᮤ + JSR ᮘᮜᮤᮊ᮪

## Licence

<img
     alt="MIT-emblemo"
     src=".github/mit.jpg"
     width="15%" />

**@onegen/optional** is available as an open-source utility library licenced
under the [MIT Licence](https://en.wikipedia.org/wiki/MIT_License).

- <span title="Too long; didn't read; not a lawyer">TL;DR;NAL</span>:
   Do absolutely whatever you want with the code, just include
   the LICENCE file if you re-distribute it.
- See [`LICENCE`](LICENCE) file or
   [tl;drLegal](https://www.tldrlegal.com/license/mit-license)
   for more details.

This licence only applies to the tool and its code, definitely not the
resource pack itself. This tool was made with no affiliation with
any of the pack creators, WeNAN Studios or Mojang AB.
