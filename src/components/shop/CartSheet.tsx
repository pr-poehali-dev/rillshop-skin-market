import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { CartItem } from "./types";

interface CartSheetProps {
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveFromCart: (id: number) => void;
  getTotalPrice: () => number;
}

const CartSheet = ({ cart, onUpdateQuantity, onRemoveFromCart, getTotalPrice }: CartSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Icon name="ShoppingCart" size={20} />
          {cart.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary">
              {cart.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Корзина</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {cart.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="icon" variant="outline" onClick={() => onUpdateQuantity(item.id, -1)}>
                      <Icon name="Minus" size={16} />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button size="icon" variant="outline" onClick={() => onUpdateQuantity(item.id, 1)}>
                      <Icon name="Plus" size={16} />
                    </Button>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => onRemoveFromCart(item.id)}>
                    <Icon name="Trash2" size={16} />
                  </Button>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Итого:</span>
                  <span className="font-bold text-xl text-primary">{getTotalPrice()} ₽</span>
                </div>
                <Button className="w-full" size="lg">
                  Оформить заказ
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
