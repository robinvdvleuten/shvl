import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as shvl from '../src/index.js';

const obj = {
	undef: undefined,
	zero: 0,
	one: 1,
	n: null,
	a: { two: 2, b: { three: 3, c: { four: 4 } } },
};

test('get(obj, key)', () => {
	assert.equal(shvl.get(obj, ''), undefined);
	assert.equal(shvl.get(obj, 'one'), 1);
	assert.equal(shvl.get(obj, 'one.two'), undefined);
	assert.equal(shvl.get(obj, 'a'), obj.a);
	assert.equal(shvl.get(obj, 'a.two'), 2);
	assert.equal(shvl.get(obj, 'a.b'), obj.a.b);
	assert.equal(shvl.get(obj, 'a.b.three'), 3);
	assert.equal(shvl.get(obj, 'a.b.c'), obj.a.b.c);
	assert.equal(shvl.get(obj, 'a.b.c.four'), 4);
});

test('get(obj, key, def)', () => {
	assert.equal(shvl.get(obj, '', 'foo'), 'foo');
	assert.equal(shvl.get(obj, 'undef', 'foo'), 'foo');
	assert.equal(shvl.get(obj, 'n', 'foo'), null, 'null is not replaced by the default');
	assert.equal(shvl.get(obj, 'zero', 'foo'), 0, 'zero is not replaced by the default');
	assert.equal(shvl.get(obj, 'a.badKey', 'foo'), 'foo');
	assert.equal(shvl.get(obj, 'a.badKey.anotherbadkey', 'foo'), 'foo');
});

test('get with a missing base or path', () => {
	assert.throws(() => shvl.get(obj, undefined), 'undefined path throws');
	assert.equal(shvl.get(undefined, 'one'), undefined);
	assert.equal(shvl.get(undefined, 'one', 'foo'), 'foo');
});

test('set(obj, key, value)', () => {
	assert.deepEqual(shvl.set({ foo: {} }, 'foo', 'bar'), { foo: 'bar' });
	assert.deepEqual(shvl.set({ foo: { bar: {} } }, 'foo.bar', 'baz'), { foo: { bar: 'baz' } });
	assert.deepEqual(shvl.set({ a: { b: { two: 'bar' } } }, 'a.b.three', 'foo'), { a: { b: { two: 'bar', three: 'foo' } } });
	assert.deepEqual(shvl.set({}, 'one', 'foo'), { one: 'foo' });
	assert.deepEqual(shvl.set({}, 'one.two', 'bar'), { one: { two: 'bar' } });
	assert.deepEqual(shvl.set({}, 'a.b.three', 'baz'), { a: { b: { three: 'baz' } } });
	assert.deepEqual(shvl.set({ a: { b: { c: 'foo' } } }, 'a.b.c', 'bar'), { a: { b: { c: 'bar' } } });
	assert.deepEqual(shvl.set({ a: { b: undefined } }, 'a.b', 'foo'), { a: { b: 'foo' } });
	assert.deepEqual(shvl.set({ a: { b: 'foo' } }, 'a.b', undefined), { a: { b: undefined } });
	assert.throws(() => shvl.set(undefined, 'foo', 'bar'), 'undefined target throws');
});

test('set does not pollute prototypes', () => {
	shvl.set({}, '__proto__.b', 'foo');
	shvl.set({}, 'a.__proto__.b', 'foo');
	shvl.set({}, 'constructor.prototype.b', 'foo');
	shvl.set({}, 'a.constructor.prototype.b', 'foo');
	shvl.set({}, ['__proto__', 'b'], 'foo');
	shvl.set({}, ['constructor', 'prototype', 'b'], 'foo');
	assert.equal({}.b, undefined, 'Object.prototype is untouched');

	// Keys that merely look forbidden must still be settable.
	assert.deepEqual(shvl.set({}, '___proto___.a', 'foo'), { ___proto___: { a: 'foo' } });
	assert.deepEqual(shvl.set({}, 'a.constructorx.b', 'foo'), { a: { constructorx: { b: 'foo' } } });
});

// GHSA-cgxg-7v45-5vp2: the guard must not rely on an overridable prototype
// method. The reported bypass monkey-patches RegExp.prototype.test, so the
// check uses === on plain strings, not a regex.
test('set resists RegExp.prototype.test tampering', () => {
	const orig = RegExp.prototype.test;
	RegExp.prototype.test = () => false;
	try {
		shvl.set({}, 'constructor.prototype.polluted', 'yes');
		assert.equal({}.polluted, undefined, 'Object.prototype is untouched');
	} finally {
		RegExp.prototype.test = orig;
	}
});

// An array path element is coerced to a string exactly once. A stateful
// toString() that passes the check and then returns '__proto__' when used as
// a property key must not slip through.
test('set resists stateful toString on array path elements', () => {
	let calls = 0;
	const sneaky = { toString: () => (calls++ < 2 ? 'harmless' : '__proto__') };
	shvl.set({}, [sneaky, 'polluted'], 'yes');
	assert.equal({}.polluted, undefined, 'Object.prototype is untouched');
	assert.equal(calls, 1, 'key is coerced once');
});

// A function reachable from the target exposes its shared prototype through
// the `prototype` key; instances of that function must not be affected.
test('set does not pollute function prototypes', () => {
	function Ctor() {}
	shvl.set({ Ctor }, 'Ctor.prototype.polluted', 'yes');
	assert.equal(new Ctor().polluted, undefined, 'Ctor.prototype is untouched');
});

// A trailing forbidden key must not rewire the prototype chain of the object
// it lands on either.
test('set ignores a trailing forbidden key', () => {
	const target = shvl.set({ a: {} }, 'a.__proto__', { leaked: true });
	assert.equal(target.a.leaked, undefined, 'prototype of a is unchanged');
	assert.equal(Object.getPrototypeOf(target.a), Object.prototype);
});
