import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Skin } from "./types";

interface SkinCardProps {
  skin: Skin;
  isAdminMode: boolean;
  onEdit: (skin: Skin) => void;
  onDelete: (id: number) => void;
  onAddToCart: (skin: Skin) => void;
  getRarityColor: (rarity: string) => string;
}

const SkinCard = ({
  skin,
  isAdminMode,
  onEdit,
  onDelete,
  onAddToCart,
  getRarityColor
}: SkinCardProps) => {
  return (
    <Card className="overflow-hidden hover-scale card-glow group">
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
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{skin.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{skin.category}</p>
            {skin.description && (
              <p className="text-xs text-muted-foreground line-clamp-2">{skin.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-primary">{skin.price} ₽</span>
          <div className="flex gap-2">
            {isAdminMode && (
              <>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => onEdit(skin)}
                >
                  <Icon name="Pencil" size={16} />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => onDelete(skin.id)}
                >
                  <Icon name="Trash2" size={16} />
                </Button>
              </>
            )}
            {!isAdminMode && (
              <Button onClick={() => onAddToCart(skin)}>
                <Icon name="ShoppingCart" size={16} className="mr-2" />
                Купить
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkinCard;
