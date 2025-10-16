import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const ShopFooter = () => {
  return (
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
  );
};

export default ShopFooter;
