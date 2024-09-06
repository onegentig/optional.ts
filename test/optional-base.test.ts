import test from 'ava';
import { Optional, none, some } from '../src/optional.js';

test('Empty optional has no value', t => {
     const optNew = new Optional<unknown>();
     t.false(optNew.hasValue());

     const optDirect = Optional.none<unknown>();
     t.false(optDirect.hasValue());
});

test('Optional with a value has a value and exactly that value', t => {
     const optNew = new Optional<number>(42);
     t.true(optNew.hasValue());
     t.is(optNew.value(), 42);

     const optDirect = Optional.some(42);
     t.true(optDirect.hasValue());
     t.is(optDirect.value(), 42);
});

test('Empty optional throws an error when accessing its value', t => {
     const optNew = new Optional<number>();
     t.throws(() => optNew.value());

     const optDirect = Optional.none<number>();
     t.throws(() => optDirect.value());
});

test('Mutable optional can be given a value by reassigning', t => {
     let opt = Optional.none<number>();
     t.false(opt.hasValue());

     opt = some(42);
     t.true(opt.hasValue());
     t.is(opt.value(), 42);
});

test('Mutable optional can be reset or reassigned to have no value', t => {
     let opt = some(42);
     t.true(opt.hasValue());

     opt.reset();
     t.false(opt.hasValue());

     opt = none;
     t.false(opt.hasValue());
});

test('Immutable optional can be reset to have no value', t => {
     const opt = some(42);
     t.true(opt.hasValue());

     opt.reset();
     t.false(opt.hasValue());
});
