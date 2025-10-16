import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

interface ShopHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItemCount: number;
  onCartClick: () => void;
  isAdminMode: boolean;
  onAdminModeToggle: () => void;
  cartTrigger: React.ReactNode;
}

const ShopHeader = ({
  searchQuery,
  onSearchChange,
  cartItemCount,
  isAdminMode,
  onAdminModeToggle,
  cartTrigger
}: ShopHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-sidebar border-b border-sidebar-border backdrop-blur-lg bg-opacity-95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Icon name="Gamepad2" className="text-primary" size={32} />
          <h1 className="text-2xl font-bold text-blue-500">rillshop_mm2</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск скинов..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-64 bg-sidebar-accent border-sidebar-border"
            />
          </div>

          {cartTrigger}

          <Button
            variant={isAdminMode ? "default" : "outline"}
            size="icon"
            onClick={onAdminModeToggle}
          >
            <Icon name="Settings" size={20} />
          </Button>

          <Button variant="outline" size="icon">
            <Icon name="User" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;