import { emptyList, cons } from 'list';
import { Sum, Product } from 'integral-monoids';
import { show } from 'stdlib';

/* Lets try it all out! */ 


const xs = cons(1, cons(2));
const ys = cons(3, cons(4));

show('xs =', xs);
show('ys =', ys);
show();

show('xs <> ys =', xs.mappend(ys));
show('ys <> xs =', ys.mappend(xs));
show();

show('xs <> xs <> xs =', xs.mappend(xs).mappend(xs))
show();

show('len xs =', xs.length());
show('len (xs <> xs) =', xs.mappend(xs).length());
show('len [] =', emptyList.length());
show()

show('head xs =', xs.head());
show('tail xs =', xs.tail());
show('head . tail $ xs =', xs.tail().head());
show('tail . tail $ xs =', xs.tail().tail());
show();

show('mempty::Sum =', Sum().mempty());
show('Sum 1 <> Sum 2 =', Sum(1) .mappend (Sum(2)));
show('Sum 1 <> mempty::Sum =', Sum(1).mappend(Sum().mempty()));
show();
show('mempty::Product =', Product().mempty());
show('Product 1 <> Product 2 =', Product(1).mappend(Product(2)));
show('Product 1 <> mempty::Product =', Product(1).mappend(Product().mempty()));
show();

/* 
 * Well this is really awkward... 
 * functions required by a type class definition are written as methods, 
 * but other functions are regular, unattached functions.
 *
 * That said, this works.
 */
const mplus = (x, y) => x.mappend(y);
const mconcat = xss => xss.foldr(mplus, xss.head().mempty());

const xss = cons(xs, cons(xs, emptyList));
show('xss =', xss);
show('mconcat xss =', mconcat(xss));
show()

show('And on a second monoid!')
show()

const zs = cons(Sum(1), cons(Sum(2), cons(Sum(3))));
show('zs =', zs);
show('mconcat zs =', mconcat(zs));
show();


const ts = cons(cons(Sum(1)))
show('ts =', ts);
show('type ts =', ts.type());
