# @onegen/optional

[
     ![NPM Downloads](https://img.shields.io/npm/d18m/%40onegen%2Foptional?style=for-the-badge&logo=npm&label=Downloads)
](https://www.npmjs.com/package/@onegen/optional)

`Optional` utility class in TypeScript, based on C++
[`std::optional`](https://en.cppreference.com/w/cpp/utility/optional).

Made as minimally as I could, without any dependencies. \
I just like how `std::optional` works and wanted it in JS/TS. \
Guess it’s mostly done unless I find some mistake or something. 🤷🏼‍♂️

```ts
import { Optional } from "@onegen/optional";

function saferDiv (x: number, y: number): Optional<number> {
     if (y === 0) return Optional.nullopt;
     return Optional.some(x / y);
}

var result = saferDiv(2, 0);
if (!result.hasValue())
     console.log('Dividing by zero again, you dummy?');
else
     console.log('It’s ', result.value(), '!');
```

`Optional` is a wrapper helper class around a value that may or may not
be defined. Instead of returning some arbitrary value (like -1),
`null` or throwing an error, `Optional` can be returned, prompting you
– the dev – to first check if there is any value before actually using it
in a fun and type safe manner! \
Look, it’s not for everyone, but I like it.

## Working with `Optional`s

### Declaring

```typescript
import { Optional, some } from '@onegen/optional';

var opt1 = new Optional<number>(2024);
var opt2 = Optional.some(2024);
var opt3 = some(2024)
```

All of these lines are equivalent. They create an `Optional` holding a number
value 2024. First line specifies the type explicitly, second implies it from
its value, third line is just a shorthand for the second.

As you – a smart TypeScript developer – might’ve guessed, you can’t change the
`Optional` type. Once you make an instance of `Optional<T>`, the variable will
only ever have `Optional<T>`.

```typescript
var opt = Optional.some(2024);
opt = Optional.some('2024'); // TS won’t let you do this!
```

While you can’t change the type, you can, of course, change the value:

```typescript
opt.assign(2026); // with a method, or
opt = Optional.some(2025); // by re-assigning
```

…and even remove it:

```typescript
opt.reset(); // with a method, or
opt = Optional.none(); // by re-assigning
opt = Optional.nullopt; // equivalent to Optional.none()
```

Do mind that this doesn’t clear the variable type. The variable is still
`Optional<number>`, even if `nullopt`. It will ever contain only a number
or nothing.

### Typeless declaration

Be mindful when creating empty `Optional`s:

```typescript
var opt = Optional.none()
```

The type of `opt` is `Optional<unknown>` and that is not something you really
want now. I wish I could somehow forbid this. Seriously, don’t do this.
When making an empty `Optional`, specify its type explicitly, for your
own sake:

```typescript
var opt: Optional<number> = Optional.none();
var opt = new Optional<number>();
```

### Base usage

The main advantage of `Optional` is that you don’t need an arbitrary
"did not work" value (-1) or use `null`s that you may forgot to check for.
`Optional` makes it natural (at least for me) to check if it has a value
before actually using it:

```typescript
const result: Optional<number> = saferDivide(10, 0);
if (!result.hasValue())
     return "Whoops, something went wrong!"

const value = result.value();
```

Calling `result.value()` while there is no value will lead to an error.

This little utility is not attempting to be Rust `Result`. If you want a more
robust error-handling utility, you might want to take a look at
[neverthrow](https://github.com/supermacro/neverthrow).
Fully recommend (not sponsored).

### Functions

#### Observers

| Function | Return Type | Description |
| :-----------------------------------: | :-------: | :------------------------------------------------------------------------------: |
| `Optional.hasValue()` | `boolean` | Checks whether the object contains a value |
| `Optional.value()` | `T` | Returns the included value (throws error if there is none) |
| `Optional.valueOr(defaultValue: T)` | `T` | Returns either the included value OR provided default value |

#### Modifiers

| Function | Return Type | Description |
| :-----------------------------------: | :-------: | :------------------------------------------------------------------------------: |
| `Optional.reset()` | `this` | Removes the contained value |
| `Optional.assign()` | `this` | Assigns a new contained value |
| `Optional.swap(other: Optional<T>)` | `this` | Swaps values of same-type Optionals |

C++ also has [`emplace()`](https://en.cppreference.com/w/cpp/utility/optional/emplace),
but TS types cannot be used to make new instances, as far as I know.

`assign()` is also deviance from `std::optional`, but I chose to add it, as TS/JS
does not allow operator overloading.

Also, all modifier methods return themselves (`this`) to allow chaining.

```ts
var opt = Optional.some(2024);
opt.reset().assign(2025).reset();
```

#### Monadic Operations

| Function | Return Type | Description |
| :-----------------------------------: | :-------: | :------------------------------------------------------------------------------: |
| `Optional.andThen<U> (fn: (value: T) => Optional<U>)` | `Optional<U>` | – |
| `Optional.transform<U> (fn: (value: T) => U)` | `Optional<U>` | – |
| `Optional.orElse (fn: () => Optional<T>)` | `Optional<U>` | – |

These are harder to explain in short Markdown table, there are simple usage examples
in [`optional-mon.test.ts`](test/optional-mon.test.ts). Who am I even writing this for
nobody will use this except me lmao.

## Licence

<img
     alt="MIT-emblem"
     src=".github/mit.png"
     width="15%" />

**@onegen/optional** is available as an open-source utility library licenced
under the [MIT Licence](https://en.wikipedia.org/wiki/MIT_License).

- <span title="Too long; didn't read; not a lawyer">TL;DR;NAL</span>:
   Do absolutely whatever you want with the code, just include
   the LICENCE file if you re-distribute it.
- See [`LICENCE`](LICENCE) file or
   [tl;drLegal](https://www.tldrlegal.com/license/mit-license)
   for more details.
