import { NewType, log } from 'stdlib';

export const List = NewType()
	.Monoid({
		mempty: () => List(null),
		mappend: function(other) {
			if(!this.value) return other;
			return cons(this.value.head, this.value.tail.mappend(other));
		}
	})
	.Show({
		show: function() { 
			if(this.value === null) return '[]';
			return `(${this.value.head.show()}):${this.value.tail.show()}`;
		}
	})
	.Rest({
		head: function() { return this.value.head; },
		tail: function() { return this.value.tail; },
		empty: function() { return this === emptyList; },
		length: function() { 
			return (this === emptyList) ? 0 : 1 + this.value.tail.length(); 
		},
		foldr: function(f, x0) {
			return this.empty() ? x0 : f(this.head(), this.tail().foldr(f, x0));
		},
		type: function() {
			return `[${this.empty() ? '?' : this.head().type()}]`;
		}
	})
	.done();

export const emptyList = List(null);
export const cons = (head, tail) => List({ head, tail: tail || emptyList});
