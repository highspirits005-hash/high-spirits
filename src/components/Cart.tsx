import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Minus, MessageCircle, ShoppingCart, Loader2, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { createOrder, OrderPayload } from '@/lib/api';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, isOpen, setIsOpen, clearCart } = useCart();

  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerDetails.name || !customerDetails.phone) {
      setErrorMsg('Name and Phone are required.');
      return;
    }
    
    setIsLoading(true);
    setErrorMsg('');

    try {
      const phoneNumber = '61420408809'; // Correct restaurant WhatsApp number
      
      const baseMessage = `🍽️ New Order\n\nOrder ID: {ORDER_ID}\n\nCustomer:\n${customerDetails.name}\n${customerDetails.phone}\n\nItems:\n` + 
        cart.map(item => `• ${item.title} x${item.quantity}`).join('\n') +
        `\n\nTotal: $${totalPrice.toFixed(2)}` + 
        (customerDetails.notes ? `\n\nNotes:\n${customerDetails.notes}` : '');
      
      const payload: OrderPayload = {
        customerName: customerDetails.name,
        phone: customerDetails.phone,
        email: customerDetails.email,
        address: customerDetails.address,
        notes: customerDetails.notes,
        items: cart.map(item => ({
          itemId: item.id,
          itemName: item.title,
          quantity: item.quantity,
          unitPrice: item.price
        })),
        whatsappMessage: baseMessage.replace('{ORDER_ID}', 'Pending')
      };
      
      const response = await createOrder(payload);
      
      if (response.success && response.orderId) {
        const finalMessage = baseMessage.replace('{ORDER_ID}', response.orderId);
        
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Clear Cart
        clearCart();
        
        // Reset state and close
        setIsOpen(false);
        setIsCheckoutMode(false);
        setCustomerDetails({ name: '', phone: '', email: '', address: '', notes: '' });
      } else {
        throw new Error('Invalid response from server.');
      }
      
    } catch (error: any) {
      setErrorMsg(error.message || 'Unable to place your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderCartItems = () => (
    <>
      <ScrollArea className="flex-1 -mx-2 px-2 sm:-mx-4 sm:px-4">
        <div className="space-y-5 md:space-y-6 py-4">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-3 md:gap-4 group">
              <div className="flex-1 space-y-1">
                <h4 className="text-sm md:text-base font-semibold text-foreground group-hover:text-accent transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="text-[10px] md:text-sm text-muted-foreground">
                  ${item.price.toFixed(2)} each
                </p>
                
                <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-3">
                  <div className="flex items-center border border-white/10 rounded-lg overflow-hidden bg-secondary/30">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 md:p-2 hover:bg-white/10 transition-colors active:bg-white/20"
                    >
                      <Minus className="w-3 md:w-3.5 h-3 md:h-3.5" />
                    </button>
                    <span className="w-6 md:w-8 text-center text-xs md:text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 md:p-2 hover:bg-white/10 transition-colors active:bg-white/20"
                    >
                      <Plus className="w-3 md:w-3.5 h-3 md:h-3.5" />
                    </button>
                  </div>
                  
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-1"
                  >
                    <Trash2 className="w-3.5 md:w-4 h-3.5 md:h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm md:text-base font-bold text-accent">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="pt-4 md:pt-6 space-y-3 md:space-y-4">
        <Separator className="bg-white/10" />
        <div className="space-y-1 md:space-y-2">
          <div className="flex justify-between text-[11px] md:text-sm">
            <span className="text-muted-foreground uppercase tracking-tight">Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-base md:text-lg font-bold">
            <span>Total</span>
            <span className="text-accent">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
        
        <Button 
          onClick={() => setIsCheckoutMode(true)}
          className="w-full bg-accent hover:bg-accent/90 text-white py-5 md:py-6 rounded-xl font-bold text-base md:text-lg transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-lg shadow-accent/20"
        >
          Checkout
        </Button>
      </div>
    </>
  );

  const renderCheckoutForm = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="sm" onClick={() => setIsCheckoutMode(false)} className="p-0 hover:bg-transparent">
          <ArrowLeft className="w-5 h-5 mr-1" /> Back to Cart
        </Button>
      </div>
      
      <ScrollArea className="flex-1 -mx-2 px-2 sm:-mx-4 sm:px-4">
        <form id="checkout-form" onSubmit={handleWhatsAppOrder} className="space-y-4 py-2">
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
              {errorMsg}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Name *</label>
            <input 
              required
              type="text" 
              name="name" 
              value={customerDetails.name} 
              onChange={handleInputChange}
              className="w-full p-2.5 bg-background border border-white/10 rounded-md focus:outline-none focus:border-accent"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number *</label>
            <input 
              required
              type="tel" 
              name="phone" 
              value={customerDetails.phone} 
              onChange={handleInputChange}
              className="w-full p-2.5 bg-background border border-white/10 rounded-md focus:outline-none focus:border-accent"
              placeholder="+61 400 000 000"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email (Optional)</label>
            <input 
              type="email" 
              name="email" 
              value={customerDetails.email} 
              onChange={handleInputChange}
              className="w-full p-2.5 bg-background border border-white/10 rounded-md focus:outline-none focus:border-accent"
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Delivery Address (Optional)</label>
            <textarea 
              name="address" 
              value={customerDetails.address} 
              onChange={handleInputChange}
              rows={2}
              className="w-full p-2.5 bg-background border border-white/10 rounded-md focus:outline-none focus:border-accent resize-none"
              placeholder="123 Main St..."
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Order Notes (Optional)</label>
            <textarea 
              name="notes" 
              value={customerDetails.notes} 
              onChange={handleInputChange}
              rows={2}
              className="w-full p-2.5 bg-background border border-white/10 rounded-md focus:outline-none focus:border-accent resize-none"
              placeholder="Extra cheese, no onions..."
            />
          </div>
        </form>
      </ScrollArea>

      <div className="pt-4 md:pt-6 space-y-4">
        <Separator className="bg-white/10" />
        <div className="flex justify-between text-base md:text-lg font-bold">
          <span>Total to Pay</span>
          <span className="text-accent">${totalPrice.toFixed(2)}</span>
        </div>
        
        <Button 
          type="submit"
          form="checkout-form"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-5 md:py-6 rounded-xl font-bold text-base md:text-lg gap-2 md:gap-3 transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-lg shadow-green-600/20 disabled:opacity-70 disabled:pointer-events-none"
        >
          {isLoading ? (
            <><Loader2 className="w-5 h-5 md:w-6 h-6 animate-spin" /> Creating Order...</>
          ) : (
            <><MessageCircle className="w-5 h-5 md:w-6 h-6" /> Place Order via WhatsApp</>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) {
        setTimeout(() => setIsCheckoutMode(false), 300); // Reset mode after close animation
      }
    }}>
      <SheetContent className="w-[90%] sm:max-w-md flex flex-col glass-effect border-l border-white/10 p-4 sm:p-6">
        <SheetHeader className="pb-4 md:pb-6">
          <SheetTitle className="text-xl md:text-2xl font-playfair font-bold flex items-center gap-2">
            <ShoppingCart className="text-accent w-5 h-5 md:w-6 h-6" />
            {isCheckoutMode ? 'Checkout' : `Your Cart (${totalItems})`}
          </SheetTitle>
        </SheetHeader>

        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 px-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary/50 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground" />
            </div>
            <div>
              <p className="text-base md:text-lg font-semibold">Your cart is empty</p>
              <p className="text-xs md:text-sm text-muted-foreground">Add some delicious items from our menu!</p>
            </div>
            <Button 
              onClick={() => setIsOpen(false)}
              variant="outline"
              className="mt-4"
            >
              Continue Browsing
            </Button>
          </div>
        ) : (
          isCheckoutMode ? renderCheckoutForm() : renderCartItems()
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
