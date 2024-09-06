import test from 'ava';
import { Optional, none, some } from '../src/optional.js';


test('Immutable optional can be reset to have no value', t => {
     const opt = some(42);
     t.true(opt.hasValue());

     opt.reset();
     t.false(opt.hasValue());
});

test('Mutable optional can be reset to have no value', t => {
     let opt = some(42);
     t.true(opt.hasValue());

     opt.reset();
     t.false(opt.hasValue());
});