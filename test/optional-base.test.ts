import test from 'ava';
import { Optional, none, some } from '../src/optional.js';

test('Empty optional has no value', t => {
     const optNew = new Optional<unknown>();
     t.false(optNew.hasValue());

     const optDirect = Optional.none<unknown>();
     t.false(optDirect.hasValue());
});

test('Non-empty optional has a value and exactly that set value', t => {
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

test('Mutable optional can be given a new value by reassigning', t => {
     let opt = Optional.none<number>();
     t.false(opt.hasValue());

     opt = Optional.some(42);
     t.true(opt.hasValue());
     t.is(opt.value(), 42);
});

test('Mutable optional can be reassigned to have no value', t => {
     let opt = Optional.some(42);
     t.true(opt.hasValue());

     opt = Optional.none();
     t.false(opt.hasValue());
});

test('valueOr() on non-empty optional returns its value', t => {
     const optNum = some(42);
     t.is(optNum.valueOr(0), 42);

     const optStr = some('ahoj');
     t.is(optStr.valueOr('nazdar'), 'ahoj');
});

test('valueOr() on empty optional returns the parameter value', t => {
     const opt = none;
     t.is(opt.valueOr(42), 42);
     t.is(opt.valueOr('ahoj'), 'ahoj');
});
