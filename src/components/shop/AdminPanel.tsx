import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { NewSkinForm } from "./types";

interface AdminPanelProps {
  newSkin: NewSkinForm;
  onNewSkinChange: (skin: NewSkinForm) => void;
  onAddSkin: () => void;
}

const AdminPanel = ({ newSkin, onNewSkinChange, onAddSkin }: AdminPanelProps) => {
  return (
    <Card className="mb-8 bg-card/50 backdrop-blur animate-slide-up">
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
              onChange={(e) => onNewSkinChange({ ...newSkin, name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="skinPrice">Цена (₽)</Label>
            <Input
              id="skinPrice"
              type="number"
              placeholder="299"
              value={newSkin.price}
              onChange={(e) => onNewSkinChange({ ...newSkin, price: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="skinImage">URL изображения</Label>
            <Input
              id="skinImage"
              placeholder="https://..."
              value={newSkin.image}
              onChange={(e) => onNewSkinChange({ ...newSkin, image: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="skinRarity">Редкость</Label>
            <select
              id="skinRarity"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={newSkin.rarity}
              onChange={(e) => onNewSkinChange({ ...newSkin, rarity: e.target.value })}
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
              onChange={(e) => onNewSkinChange({ ...newSkin, category: e.target.value })}
            >
              <option>Knife</option>
              <option>Gun</option>
              <option>Pet</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="skinDescription">Описание</Label>
            <Textarea
              id="skinDescription"
              placeholder="Описание скина..."
              value={newSkin.description}
              onChange={(e) => onNewSkinChange({ ...newSkin, description: e.target.value })}
              rows={3}
            />
          </div>
        </div>
        <Button onClick={onAddSkin} className="mt-4">
          <Icon name="Plus" size={16} className="mr-2" />
          Добавить скин
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminPanel;