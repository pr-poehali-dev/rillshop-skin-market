import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { Skin, CartItem, NewSkinForm } from "@/components/shop/types";
import ShopHeader from "@/components/shop/ShopHeader";
import CartSheet from "@/components/shop/CartSheet";
import AdminPanel from "@/components/shop/AdminPanel";
import FilterBar from "@/components/shop/FilterBar";
import SkinCard from "@/components/shop/SkinCard";
import EditSkinDialog from "@/components/shop/EditSkinDialog";
import ShopFooter from "@/components/shop/ShopFooter";

const Index = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedRarity, setSelectedRarity] = useState<string>("all");
  const [editingSkin, setEditingSkin] = useState<Skin | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [skins, setSkins] = useState<Skin[]>([
    {
      id: 1,
      name: "Neon Controller",
      price: 149,
      image: "https://cdn.poehali.dev/projects/f903d699-9372-4a9c-9d21-ec87169ab4e5/files/afce6b98-cd22-4974-b215-2424cbaa6ddc.jpg",
      rarity: "Legendary",
      category: "Knife",
      description: "Футуристический нож с неоновой подсветкой"
    },
    {
      id: 2,
      name: "Crystal Blade",
      price: 299,
      image: "https://cdn.poehali.dev/projects/f903d699-9372-4a9c-9d21-ec87169ab4e5/files/61cdd24e-923d-4c1f-b52a-72e9455d1a83.jpg",
      rarity: "Mythic",
      category: "Knife",
      description: "Магическое лезвие из чистого кристалла"
    },
    {
      id: 3,
      name: "Dragon Fire",
      price: 499,
      image: "https://cdn.poehali.dev/projects/f903d699-9372-4a9c-9d21-ec87169ab4e5/files/1d5194b8-33d4-41fd-8973-84de9d1d5c81.jpg",
      rarity: "Mythic",
      category: "Gun",
      description: "Легендарное оружие драконьего пламени"
    },
    {
      id: 4,
      name: "Shadow Assassin",
      price: 199,
      image: "https://cdn.poehali.dev/projects/f903d699-9372-4a9c-9d21-ec87169ab4e5/files/afce6b98-cd22-4974-b215-2424cbaa6ddc.jpg",
      rarity: "Legendary",
      category: "Knife",
      description: "Темный клинок ночного убийцы"
    },
    {
      id: 5,
      name: "Frost King",
      price: 349,
      image: "https://cdn.poehali.dev/projects/f903d699-9372-4a9c-9d21-ec87169ab4e5/files/61cdd24e-923d-4c1f-b52a-72e9455d1a83.jpg",
      rarity: "Epic",
      category: "Gun",
      description: "Ледяное оружие повелителя зимы"
    },
    {
      id: 6,
      name: "Golden Rage",
      price: 599,
      image: "https://cdn.poehali.dev/projects/f903d699-9372-4a9c-9d21-ec87169ab4e5/files/1d5194b8-33d4-41fd-8973-84de9d1d5c81.jpg",
      rarity: "Mythic",
      category: "Knife",
      description: "Позолоченный нож королевской ярости"
    }
  ]);

  const [newSkin, setNewSkin] = useState<NewSkinForm>({
    name: "",
    price: "",
    image: "",
    rarity: "Common",
    category: "Knife",
    description: ""
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

  const filteredSkins = skins.filter((skin) => {
    const matchesSearch = skin.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || skin.category === selectedCategory;
    const matchesRarity = selectedRarity === "all" || skin.rarity === selectedRarity;
    return matchesSearch && matchesCategory && matchesRarity;
  });

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
      category: newSkin.category,
      description: newSkin.description
    };

    setSkins([...skins, skin]);
    setNewSkin({
      name: "",
      price: "",
      image: "",
      rarity: "Common",
      category: "Knife",
      description: ""
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

  const openEditDialog = (skin: Skin) => {
    setEditingSkin(skin);
    setIsEditDialogOpen(true);
  };

  const saveEditedSkin = () => {
    if (!editingSkin || !editingSkin.name || !editingSkin.price || !editingSkin.image) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    setSkins(skins.map((skin) => 
      skin.id === editingSkin.id ? editingSkin : skin
    ));
    setIsEditDialogOpen(false);
    setEditingSkin(null);
    toast({
      title: "Изменения сохранены",
      description: `${editingSkin.name} обновлен`,
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

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedRarity("all");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <ShopHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartItemCount={cart.length}
        onCartClick={() => {}}
        isAdminMode={isAdminMode}
        onAdminModeToggle={() => setIsAdminMode(!isAdminMode)}
        cartTrigger={
          <CartSheet
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
            getTotalPrice={getTotalPrice}
          />
        }
      />

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
          <AdminPanel
            newSkin={newSkin}
            onNewSkinChange={setNewSkin}
            onAddSkin={addNewSkin}
          />
        )}

        <FilterBar
          selectedCategory={selectedCategory}
          selectedRarity={selectedRarity}
          onCategoryChange={setSelectedCategory}
          onRarityChange={setSelectedRarity}
          onResetFilters={resetFilters}
        />

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Популярные скины</h2>
            <Badge variant="outline" className="text-lg px-4 py-2">
              {filteredSkins.length} скинов
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSkins.map((skin) => (
              <SkinCard
                key={skin.id}
                skin={skin}
                isAdminMode={isAdminMode}
                onEdit={openEditDialog}
                onDelete={deleteSkin}
                onAddToCart={addToCart}
                getRarityColor={getRarityColor}
              />
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

      <EditSkinDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        editingSkin={editingSkin}
        onEditingSkinChange={setEditingSkin}
        onSave={saveEditedSkin}
      />

      <ShopFooter />
    </div>
  );
};

export default Index;
