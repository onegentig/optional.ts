import test from 'ava';
import { Optional, none, some } from '../src/optional.js';

test('Optional can be reset to have no value', t => {
     const opt = some(42);
     t.true(opt.hasValue());

     opt.reset();
     t.false(opt.hasValue());
});

test('Two same-type non-empty optionals can swap values', t => {
     const opt1 = Optional.some(69);
     const opt2 = Optional.some(420);

     opt1.swap(opt2);
     t.is(opt1.value(), 420);
     t.is(opt2.value(), 69);

     opt2.swap(opt1);
     t.is(opt1.value(), 69);
     t.is(opt2.value(), 420);
});

test('Non-empty optional can swap values with an empty optional', t => {
     const opt1 = Optional.some(5);
     const opt2 = Optional.nullopt;

     opt1.swap(opt2);
     t.false(opt1.hasValue());
     t.is(opt2.value(), 5);

     opt2.swap(opt1);
     t.is(opt1.value(), 5);
     t.false(opt2.hasValue());
});

test('Optional can have a new value assigned', t => {
     const opt = Optional.some(42);
     t.is(opt.value(), 42);

     opt.assign(69);
     t.is(opt.value(), 69);
});
