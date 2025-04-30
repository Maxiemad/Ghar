
import { useState } from 'react';
import { useCart } from '../hooks/useCart';
import { Trash2, ArrowLeft, ShoppingBag, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      clearCart();
      toast.success("Checkout complete! Your order has been placed.");
      setIsCheckingOut(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <Link to="/" className="mr-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag size={24} className="text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add some designs to your cart to get started.
          </p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-background rounded-lg border mb-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Preview</TableHead>
                  <TableHead>Design</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="w-[80px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.image ? (
                        <div className="w-16 h-16 overflow-hidden rounded-md">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                          <ShoppingBag size={20} className="text-muted-foreground" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <span className="capitalize">{item.type}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.price?.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={16} className="text-muted-foreground hover:text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
            <Button variant="outline" onClick={clearCart} className="flex items-center gap-2">
              <Trash2 size={16} />
              Clear Cart
            </Button>
            
            <div className="bg-muted/20 p-6 rounded-lg border">
              <div className="flex justify-between text-lg mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold">${getCartTotal().toLocaleString()}</span>
              </div>
              
              <Button 
                className="w-full flex items-center justify-center gap-2"
                disabled={isCheckingOut}
                onClick={handleCheckout}
              >
                {isCheckingOut ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <DollarSign size={16} />
                    Checkout
                  </>
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
