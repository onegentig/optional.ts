import test from 'ava';
import { Optional, none, some } from '../src/optional.js';

test('Immutable optional can be reset to have no value', t => {
     const opt = some(42);
     t.true(opt.hasValue());

     opt.reset();
     t.false(opt.hasValue());
});

test('Mutable optional can be reset to have no value', t => {
     let opt = some(42); // eslint-disable-line prefer-const
     t.true(opt.hasValue());

     opt.reset();
     t.false(opt.hasValue());
});

test('Two same-type non-empty mutable optionals can swap values', t => {
     let opt1 = Optional.some(69); // eslint-disable-line prefer-const
     let opt2 = Optional.some(420); // eslint-disable-line prefer-const

     opt1.swap(opt2);
     t.is(opt1.value(), 420);
     t.is(opt2.value(), 69);

     opt2.swap(opt1);
     t.is(opt1.value(), 69);
     t.is(opt2.value(), 420);
});

test.failing(
     'Two same-type non-empty immutable optionals cannot swap values',
     t => {
          const opt1 = some(69);
          const opt2 = some(420);

          t.throws(() => { opt1.swap(opt2); });
          t.throws(() => { opt2.swap(opt1); });
     }
);

test('Non-empty mutable optional can swap values with an empty mutable optional', t => {
     let opt1 = Optional.some(5); // eslint-disable-line prefer-const
     let opt2 = Optional.nullopt; // eslint-disable-line prefer-const

     opt1.swap(opt2);
     t.false(opt1.hasValue());
     t.is(opt2.value(), 5);

     opt2.swap(opt1);
     t.is(opt1.value(), 5);
     t.false(opt2.hasValue());
});
