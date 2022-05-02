import cases from 'jest-in-case';
import * as shvl from './index';

const obj = {
	undef: undefined,
	zero: 0,
	one: 1,
	n: null,
	a: {
		two: 2,
		b: {
			three: 3,
			c: {
				four: 4
			}
		}
	}
};

cases('get(obj, key)', ({ key, value }) => {
  expect(shvl.get(obj, key)).toBe(value);
}, {
  "get(obj, '')": { key: '', value: undefined },
  "get(obj, 'one')": { key: 'one', value: obj.one },
  "get(obj, 'one.two')": { key: 'one.two', value: undefined },
  "get(obj, 'a')": { key: 'a', value: obj.a },
  "get(obj, 'a.two')": { key: 'a.two', value: obj.a.two },
  "get(obj, 'a.b')": { key: 'a.b', value: obj.a.b },
  "get(obj, 'a.b.three')": { key: 'a.b.three', value: obj.a.b.three },
  "get(obj, 'a.b.c')": { key: 'a.b.c', value: obj.a.b.c },
  "get(obj, 'a.b.c.four')": { key: 'a.b.c.four', value: obj.a.b.c.four },
});

cases('get(obj, key, def)', ({ key, value, def }) => {
  expect(shvl.get(obj, key, def)).toBe(value);
}, {
  "get(obj, '', 'foo')": { key: '', value: 'foo', def: 'foo' },
  "get(obj, 'undef', 'foo')": { key: 'undef', value: 'foo', def: 'foo' },
  "get(obj, 'n', 'foo')": { key: 'n', value: null, def: 'foo' },
  "get(obj, 'zero', 'foo')": { key: 'zero', value: 0, def: 'foo' },
  "get(obj, 'a.badKey', 'foo')": { key: 'a.badKey', value: 'foo', def: 'foo' },
  "get(obj, 'a.badKey.anotherbadkey', 'foo')": { key: 'a.badKey.anotherbadkey', value: 'foo', def: 'foo' },
});

cases('get(obj, undefined)', ({ def }) => {
  expect(() => shvl.get(obj, undefined, def)).toThrow();
}, {
  "get(obj, undefined)": {},
  "get(obj, undefined, 'foo')": { def: 'foo' },
});

cases('get(undefined, key, def)', ({ key, value, def }) => {
  expect(shvl.get(undefined, key, def)).toBe(value);
}, {
  "get(undefined, 'one')": { key: 'one', value: undefined },
  "get(undefined, 'one', 'foo')": { key: 'one', value: 'foo', def: 'foo' },
});

cases('set(obj, key, value)', ({ obj, key, value, expected }) => {
  expect(shvl.set(obj || {}, key, value)).toEqual(expected);
}, {
  "set(obj, 'foo', 'bar')": { key: 'foo', value: 'bar', expected: { foo: 'bar' }, obj: { foo: {} } },
  "set(obj, 'foo.bar', 'baz')": { key: 'foo.bar', value: 'baz', expected: { foo: { bar: 'baz' } }, obj: { foo: { bar: {} } } },
  "set(obj, 'a.b.three', 'baz')": { key: 'a.b.three', value: 'foo', expected: { a: { b: { two: 'bar', three: 'foo' } } }, obj: { a: { b: { two: 'bar' } } } },
});

cases('set({}, key, value)', ({ obj, key, value, expected }) => {
  expect(shvl.set(obj || {}, key, value)).toEqual(expected);
}, {
  "set(obj, 'one', 'foo')": { key: 'one', value: 'foo', expected: { one: 'foo' } },
  "set(obj, 'one.two', 'bar')": { key: 'one.two', value: 'bar', expected: { one: { two: 'bar' } } },
  "set(obj, 'a.b.three', 'baz')": { key: 'a.b.three', value: 'baz', expected: { a: { b: { three: 'baz' } } } },
  "set(obj, 'a.b.c', 'bar')": { key: 'a.b.c', value: 'bar', expected: { a: { b: { c: 'bar' } } }, obj: { a: { b: { c: 'foo' } } } },
  "set(obj, 'a.b', 'foo')": { key: 'a.b', value: 'foo', expected: { a: { b: 'foo' } }, obj: { a: { b: undefined } } },
  "set(obj, 'a.b', undefined)": { key: 'a.b', value: undefined, expected: { a: { b: undefined } }, obj: { a: { b: 'foo' } } },
  "set(obj, '___proto___.a', 'foo')": { key: '___proto___.a', value: 'foo', expected: { ___proto___: { a: 'foo' } } },
  "set(obj, 'a.constructorx.b', 'foo')": { key: 'a.constructorx.b', value: 'foo', expected: { a: { constructorx: { b: 'foo' } } } },
});

// prevent prototype pollution
cases('get(Object, key)', ({ key, value, test }) => {
  shvl.set({}, key, value);
  expect(shvl.get(Object, test || key)).toEqual(undefined);
}, {
  "set({}, '__proto__.b', 'foo')": { key: '__proto__.b', value: 'foo' },
  "set({}, 'a.__proto__.b', 'foo')": { key: 'a.__proto__.b', value: 'foo' },
  "set({}, 'constructor.prototype.b', 'foo')": { key: 'constructor.prototype.b', value: 'foo'},
  "set({}, 'a.constructor.prototype.b', 'foo')": { key: 'a.constructor.prototype.b', value: 'foo'}
});

cases('set(undefined, key, value)', ({ obj, key, value }) => {
  expect(() => shvl.set(undefined, key, val)).toThrow();
}, {
  "set(obj, 'foo', 'bar')": { key: 'foo', value: 'bar' },
});
