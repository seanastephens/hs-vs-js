import { NewType } from 'stdlib';

export const Sum = NewType()
	.Monoid({
		mempty: () => Sum(0),
		mappend: function(other) { return Sum(this.value + other.value); }
	})
	.Show({
		show: function() { return `Sum ${this.value}`; }
	})
	.Rest({
		type: function() { return 'Sum Int'; }
	})
	.done();

export const Product = NewType() 
	.Monoid({
		mempty: () => Product(1),
		mappend: function(other) { return Product(this.value * other.value); }
	})
	.Show({
		show: function() { return `Product ${this.value}`; }
	})
	.Rest({
		type: function() { return 'Sum Int'; }
	})
	.done();
