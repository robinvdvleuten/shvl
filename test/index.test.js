import test from 'tape';
import * as shvl from '../src/index.js';

const obj = {
	undef: undefined,
	zero: 0,
	one: 1,
	n: null,
	a: { two: 2, b: { three: 3, c: { four: 4 } } },
};

test('get(obj, key)', t => {
	t.equal(shvl.get(obj, ''), undefined);
	t.equal(shvl.get(obj, 'one'), 1);
	t.equal(shvl.get(obj, 'one.two'), undefined);
	t.equal(shvl.get(obj, 'a'), obj.a);
	t.equal(shvl.get(obj, 'a.two'), 2);
	t.equal(shvl.get(obj, 'a.b'), obj.a.b);
	t.equal(shvl.get(obj, 'a.b.three'), 3);
	t.equal(shvl.get(obj, 'a.b.c'), obj.a.b.c);
	t.equal(shvl.get(obj, 'a.b.c.four'), 4);
	t.end();
});

test('get(obj, key, def)', t => {
	t.equal(shvl.get(obj, '', 'foo'), 'foo');
	t.equal(shvl.get(obj, 'undef', 'foo'), 'foo');
	t.equal(shvl.get(obj, 'n', 'foo'), null, 'null is not replaced by the default');
	t.equal(shvl.get(obj, 'zero', 'foo'), 0, 'zero is not replaced by the default');
	t.equal(shvl.get(obj, 'a.badKey', 'foo'), 'foo');
	t.equal(shvl.get(obj, 'a.badKey.anotherbadkey', 'foo'), 'foo');
	t.end();
});

test('get with a missing base or path', t => {
	t.throws(() => shvl.get(obj, undefined), 'undefined path throws');
	t.equal(shvl.get(undefined, 'one'), undefined);
	t.equal(shvl.get(undefined, 'one', 'foo'), 'foo');
	t.end();
});

test('set(obj, key, value)', t => {
	t.deepEqual(shvl.set({ foo: {} }, 'foo', 'bar'), { foo: 'bar' });
	t.deepEqual(shvl.set({ foo: { bar: {} } }, 'foo.bar', 'baz'), { foo: { bar: 'baz' } });
	t.deepEqual(shvl.set({ a: { b: { two: 'bar' } } }, 'a.b.three', 'foo'), { a: { b: { two: 'bar', three: 'foo' } } });
	t.deepEqual(shvl.set({}, 'one', 'foo'), { one: 'foo' });
	t.deepEqual(shvl.set({}, 'one.two', 'bar'), { one: { two: 'bar' } });
	t.deepEqual(shvl.set({}, 'a.b.three', 'baz'), { a: { b: { three: 'baz' } } });
	t.deepEqual(shvl.set({ a: { b: { c: 'foo' } } }, 'a.b.c', 'bar'), { a: { b: { c: 'bar' } } });
	t.deepEqual(shvl.set({ a: { b: undefined } }, 'a.b', 'foo'), { a: { b: 'foo' } });
	t.deepEqual(shvl.set({ a: { b: 'foo' } }, 'a.b', undefined), { a: { b: undefined } });
	t.throws(() => shvl.set(undefined, 'foo', 'bar'), 'undefined target throws');
	t.end();
});

test('set does not pollute prototypes', t => {
	shvl.set({}, '__proto__.b', 'foo');
	shvl.set({}, 'a.__proto__.b', 'foo');
	shvl.set({}, 'constructor.prototype.b', 'foo');
	shvl.set({}, 'a.constructor.prototype.b', 'foo');
	t.equal({}.b, undefined, 'Object.prototype is untouched');

	// Keys that merely look forbidden must still be settable.
	t.deepEqual(shvl.set({}, '___proto___.a', 'foo'), { ___proto___: { a: 'foo' } });
	t.deepEqual(shvl.set({}, 'a.constructorx.b', 'foo'), { a: { constructorx: { b: 'foo' } } });
	t.end();
});

// The guard must not rely on an overridable prototype method: the reported
// bypass monkey-patches RegExp.prototype.test, so the check uses ===, not a regex.
test('set resists RegExp.prototype.test tampering', t => {
	const orig = RegExp.prototype.test;
	RegExp.prototype.test = () => false;
	try {
		shvl.set({}, 'constructor.prototype.polluted', 'yes');
		t.equal({}.polluted, undefined);
	} finally {
		RegExp.prototype.test = orig;
	}
	t.end();
});
