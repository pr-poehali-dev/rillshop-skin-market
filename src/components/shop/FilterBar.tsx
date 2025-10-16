import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface FilterBarProps {
  selectedCategory: string;
  selectedRarity: string;
  onCategoryChange: (category: string) => void;
  onRarityChange: (rarity: string) => void;
  onResetFilters: () => void;
}

const FilterBar = ({
  selectedCategory,
  selectedRarity,
  onCategoryChange,
  onRarityChange,
  onResetFilters
}: FilterBarProps) => {
  return (
    <div className="mb-6 flex flex-wrap gap-4">
      <div className="flex items-center gap-2">
        <Label>Категория:</Label>
        <select
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="all">Все</option>
          <option value="Knife">Knife</option>
          <option value="Gun">Gun</option>
          <option value="Pet">Pet</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <Label>Редкость:</Label>
        <select
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
          value={selectedRarity}
          onChange={(e) => onRarityChange(e.target.value)}
        >
          <option value="all">Все</option>
          <option value="Common">Common</option>
          <option value="Rare">Rare</option>
          <option value="Epic">Epic</option>
          <option value="Legendary">Legendary</option>
          <option value="Mythic">Mythic</option>
        </select>
      </div>
      {(selectedCategory !== "all" || selectedRarity !== "all") && (
        <Button
          variant="ghost"
          onClick={onResetFilters}
        >
          <Icon name="X" size={16} className="mr-2" />
          Сбросить фильтры
        </Button>
      )}
    </div>
  );
};

export default FilterBar;
