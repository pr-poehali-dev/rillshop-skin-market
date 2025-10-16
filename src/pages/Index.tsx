import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface Skin {
  id: number;
  name: string;
  price: number;
  image: string;
  rarity: string;
  category: string;
}

interface CartItem extends Skin {
  quantity: number;
}

const Index = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);

  const [skins, setSkins] = useState<Skin[]>([
    {
      id: 1,
      name: "Neon Controller",
      price: 149,
      image: "https://cdn.poehali.dev/projects/f903d699-9372-4a9c-9d21-ec87169ab4e5/files/afce6b98-cd22-4974-b215-2424cbaa6ddc.jpg",
      rarity: "Legendary",
      category: "Knife"
    },
    {
      id: 2,
      name: "Crystal Blade",
      price: 299,
      image: "https://cdn.poehali.dev/projects/f903d699-9372-4a9c-9d21-ec87169ab4e5/files/61cdd24e-923d-4c1f-b52a-72e9455d1a83.jpg",
      rarity: "Mythic",
      category: "Knife"
    },
    {
      id: 3,
      name: "Dragon Fire",
      price: 499,
      image: "https://cdn.poehali.dev/projects/f903d699-9372-4a9c-9d21-ec87169ab4e5/files/1d5194b8-33d4-41fd-8973-84de9d1d5c81.jpg",
      rarity: "Mythic",
      category: "Gun"
    },
    {
      id: 4,
      name: "Shadow Assassin",
      price: 199,
      image: "https://cdn.poehali.dev/projects/f903d699-9372-4a9c-9d21-ec87169ab4e5/files/afce6b98-cd22-4974-b215-2424cbaa6ddc.jpg",
      rarity: "Legendary",
      category: "Knife"
    },
    {
      id: 5,
      name: "Frost King",
      price: 349,
      image: "https://cdn.poehali.dev/projects/f903d699-9372-4a9c-9d21-ec87169ab4e5/files/61cdd24e-923d-4c1f-b52a-72e9455d1a83.jpg",
      rarity: "Epic",
      category: "Gun"
    },
    {
      id: 6,
      name: "Golden Rage",
      price: 599,
      image: "https://cdn.poehali.dev/projects/f903d699-9372-4a9c-9d21-ec87169ab4e5/files/1d5194b8-33d4-41fd-8973-84de9d1d5c81.jpg",
      rarity: "Mythic",
      category: "Knife"
    }
  ]);

  const [newSkin, setNewSkin] = useState({
    name: "",
    price: "",
    image: "",
    rarity: "Common",
    category: "Knife"
  });

  const addToCart = (skin: Skin) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === skin.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === skin.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...skin, quantity: 1 }];
    });
    toast({
      title: "Добавлено в корзину",
      description: `${skin.name} добавлен в корзину`,
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter((item): item is CartItem => item !== null)
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const filteredSkins = skins.filter((skin) =>
    skin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addNewSkin = () => {
    if (!newSkin.name || !newSkin.price || !newSkin.image) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    const skin: Skin = {
      id: skins.length + 1,
      name: newSkin.name,
      price: parseFloat(newSkin.price),
      image: newSkin.image,
      rarity: newSkin.rarity,
      category: newSkin.category
    };

    setSkins([...skins, skin]);
    setNewSkin({
      name: "",
      price: "",
      image: "",
      rarity: "Common",
      category: "Knife"
    });
    toast({
      title: "Скин добавлен",
      description: `${skin.name} успешно добавлен в каталог`,
    });
  };

  const deleteSkin = (id: number) => {
    setSkins(skins.filter((skin) => skin.id !== id));
    toast({
      title: "Скин удален",
      description: "Скин успешно удален из каталога",
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Mythic": return "bg-purple-600";
      case "Legendary": return "bg-orange-500";
      case "Epic": return "bg-blue-500";
      case "Rare": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="sticky top-0 z-50 bg-sidebar border-b border-sidebar-border backdrop-blur-lg bg-opacity-95">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="Gamepad2" className="text-primary" size={32} />
            <h1 className="text-2xl font-bold text-sidebar-foreground">rillshop_mm2</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="Поиск скинов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-sidebar-accent border-sidebar-border"
              />
            </div>

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
                            <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                          <Button size="icon" variant="ghost" onClick={() => removeFromCart(item.id)}>
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

            <Button
              variant={isAdminMode ? "default" : "outline"}
              size="icon"
              onClick={() => setIsAdminMode(!isAdminMode)}
            >
              <Icon name="Settings" size={20} />
            </Button>

            <Button variant="outline" size="icon">
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 md:hidden">
          <div className="relative">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск скинов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {isAdminMode && (
          <Card className="mb-8 bg-card/50 backdrop-blur">
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Shield" size={24} className="text-primary" />
                Панель администратора
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="skinName">Название скина</Label>
                  <Input
                    id="skinName"
                    placeholder="Crystal Blade"
                    value={newSkin.name}
                    onChange={(e) => setNewSkin({ ...newSkin, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="skinPrice">Цена (₽)</Label>
                  <Input
                    id="skinPrice"
                    type="number"
                    placeholder="299"
                    value={newSkin.price}
                    onChange={(e) => setNewSkin({ ...newSkin, price: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="skinImage">URL изображения</Label>
                  <Input
                    id="skinImage"
                    placeholder="https://..."
                    value={newSkin.image}
                    onChange={(e) => setNewSkin({ ...newSkin, image: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="skinRarity">Редкость</Label>
                  <select
                    id="skinRarity"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newSkin.rarity}
                    onChange={(e) => setNewSkin({ ...newSkin, rarity: e.target.value })}
                  >
                    <option>Common</option>
                    <option>Rare</option>
                    <option>Epic</option>
                    <option>Legendary</option>
                    <option>Mythic</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="skinCategory">Категория</Label>
                  <select
                    id="skinCategory"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newSkin.category}
                    onChange={(e) => setNewSkin({ ...newSkin, category: e.target.value })}
                  >
                    <option>Knife</option>
                    <option>Gun</option>
                    <option>Pet</option>
                  </select>
                </div>
              </div>
              <Button onClick={addNewSkin} className="mt-4">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить скин
              </Button>
            </CardContent>
          </Card>
        )}

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Популярные скины</h2>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {filteredSkins.length} скинов
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkins.map((skin) => (
              <Card key={skin.id} className="overflow-hidden hover-scale card-glow group">
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-card">
                  <img
                    src={skin.image}
                    alt={skin.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <Badge className={`absolute top-3 right-3 ${getRarityColor(skin.rarity)}`}>
                    {skin.rarity}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{skin.name}</h3>
                      <p className="text-sm text-muted-foreground">{skin.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-primary">{skin.price} ₽</span>
                    <div className="flex gap-2">
                      {isAdminMode && (
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => deleteSkin(skin.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      )}
                      <Button onClick={() => addToCart(skin)}>
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        Купить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredSkins.length === 0 && (
            <div className="text-center py-16">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Скины не найдены</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-sidebar border-t border-sidebar-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Gamepad2" className="text-primary" size={24} />
              <span className="text-sidebar-foreground font-semibold">rillshop_mm2</span>
            </div>
            <p className="text-sidebar-foreground/70 text-sm">
              © 2024 rillshop_mm2. Лучший магазин скинов MM2
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
              <Button variant="ghost" size="icon">
                <Icon name="MessageCircle" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
