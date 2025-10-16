import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Skin } from "./types";

interface EditSkinDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingSkin: Skin | null;
  onEditingSkinChange: (skin: Skin) => void;
  onSave: () => void;
}

const EditSkinDialog = ({
  isOpen,
  onOpenChange,
  editingSkin,
  onEditingSkinChange,
  onSave
}: EditSkinDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редактировать скин</DialogTitle>
        </DialogHeader>
        {editingSkin && (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="editName">Название скина</Label>
                <Input
                  id="editName"
                  value={editingSkin.name}
                  onChange={(e) => onEditingSkinChange({ ...editingSkin, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="editPrice">Цена (₽)</Label>
                <Input
                  id="editPrice"
                  type="number"
                  value={editingSkin.price}
                  onChange={(e) => onEditingSkinChange({ ...editingSkin, price: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="editImage">URL изображения</Label>
                <Input
                  id="editImage"
                  value={editingSkin.image}
                  onChange={(e) => onEditingSkinChange({ ...editingSkin, image: e.target.value })}
                />
                {editingSkin.image && (
                  <div className="mt-3">
                    <img
                      src={editingSkin.image}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="editRarity">Редкость</Label>
                <select
                  id="editRarity"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={editingSkin.rarity}
                  onChange={(e) => onEditingSkinChange({ ...editingSkin, rarity: e.target.value })}
                >
                  <option>Common</option>
                  <option>Rare</option>
                  <option>Epic</option>
                  <option>Legendary</option>
                  <option>Mythic</option>
                </select>
              </div>
              <div>
                <Label htmlFor="editCategory">Категория</Label>
                <select
                  id="editCategory"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={editingSkin.category}
                  onChange={(e) => onEditingSkinChange({ ...editingSkin, category: e.target.value })}
                >
                  <option>Knife</option>
                  <option>Gun</option>
                  <option>Pet</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="editDescription">Описание</Label>
                <Textarea
                  id="editDescription"
                  value={editingSkin.description}
                  onChange={(e) => onEditingSkinChange({ ...editingSkin, description: e.target.value })}
                  rows={4}
                />
              </div>
            </div>
            <div className="flex gap-3 justify-end mt-6">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Отмена
              </Button>
              <Button onClick={onSave}>
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditSkinDialog;
