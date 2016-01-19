/*
 * Int and String are the 'primitive' values, and they need show and type so 
 * our recursive methods (namely show and type) bottom out. Every other show
 * and type should be recursive.
 */
Number.prototype.show = function() { return this; };
String.prototype.show = function() { return this; };
Number.prototype.type = function() { return 'Int'; };
String.prototype.type = function() { return 'String'; };

/* helpers */
export const merge = (a, b) => Object.assign({}, a, b);
export const show = (...xs) => console.log(...xs.map(x => x.show()));

/*
 * Make a new typeclass named `name` and with required 
 * definitions `requiredFuncs.` 
 *
 * NOTE: This should only be used inside this file, for now. You could
 * make a mixin interface, probably.
 */
const typeclass = (name, requiredFuncs) => {
	return function(funcs) {
		const missingFuncs = requiredFuncs.filter(name => !funcs[name]);
		if(missingFuncs.length)
			throw `${name} definition not satisfied: missing ${missingFuncs}`;
		this.funcs = merge(this.funcs, funcs);
		return this;
	};
}

/* All our typeclasses */
const Monoid = typeclass('Monoid', ['mempty', 'mappend']);
const Show = typeclass('Show', ['show']);
const Rest = typeclass('rest', []);

/* 
 * Define a new type. If you simply use NewType().done()(x), you will get back 
 *	{ value: x } 
 * This is simply a wrapped type, a bit like `type ID = Int` in haskell. More 
 * usefully, by chaining method calls you can make the type an instance of the 
 * available typeclasses. The `rest` typeclass is a catchall for other methods 
 * (think length on [])
 */
export const NewType = function(name) {
	return {
		funcs: {},
		Monoid, 
		Show, 
		Rest,
		done: function() { return o => merge({ value: o }, this.funcs)}
	};
}
