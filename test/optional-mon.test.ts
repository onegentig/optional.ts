import test from 'ava';
import { Optional, none, some } from '../src/optional.js';

function double (x: number): number {
     return x * 2;
}

function half (x: number): Optional<number> {
     if (x === 0) return Optional.none();
     return Optional.some(x / 2);
}

test('andThen() is called on non-empty optional', t => {
     const opt = new Optional<number>(4);
     const res = opt.andThen(half);
     t.true(res.hasValue());
     t.is(res.value(), 2);
});

test('andThen() is not called on empty optional', t => {
     const opt = Optional.nullopt;
     const res = opt.andThen(half);
     t.false(res.hasValue());
});

test('andThen() can be chained', t => {
     const opt = new Optional<number>(20);
     const res = opt.andThen(half).andThen(half).andThen(half);
     t.true(res.hasValue());
     t.is(res.value(), 2.5);
});

test('transform() is called on non-empty optional', t => {
     const opt = new Optional<number>(4);
     const res = opt.transform(double);
     t.true(res.hasValue());
     t.is(res.value(), 8);
});

test('transform() is not called on empty optional', t => {
     const opt = Optional.nullopt;
     const res = opt.transform(double);
     t.false(res.hasValue());
});

test('transform() can be chained', t => {
     const opt = new Optional<number>(10);
     const res = opt.transform(double).transform(double).transform(double);
     t.true(res.hasValue());
     t.is(res.value(), 80);
});

test('andThen() is just wrapped transform()', t => {
     const doubleAsOpt = (x: number): Optional<number> =>
          Optional.some(double(x));

     const opt = new Optional<number>(4);
     const res1 = opt.andThen(doubleAsOpt);
     const res2 = opt.transform(double);
     t.deepEqual(res1, res2);
});

test('andThen() and transform() can be chained together', t => {
     const opt = new Optional<number>(10);
     const res = opt.andThen(half).transform(double);
     t.true(res.hasValue());
     t.is(res.value(), 10);
});

test('orElse() is called on empty optional', t => {
     const opt = Optional.nullopt;
     const res = opt.orElse(() => Optional.some(22));
     t.true(res.hasValue());
     t.is(res.value(), 22);
});

test('orElse() is not called on non-empty optional', t => {
     const opt = new Optional<number>(22);
     const res = opt.orElse(() => Optional.some(180));
     t.true(res.hasValue());
     t.is(res.value(), 22);
});

test('orElse() can be chained', t => {
     const nothingDoer = () => Optional.none<number>();
     const somethingDoer = () => Optional.some(100);

     const opt = Optional.nullopt;
     const res = opt
          .orElse(nothingDoer)
          .orElse(nothingDoer)
          .orElse(somethingDoer)
          .orElse(() => Optional.some(200));
     t.true(res.hasValue());
     t.is(res.value(), 100);
});
