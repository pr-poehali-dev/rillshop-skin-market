export interface Skin {
  id: number;
  name: string;
  price: number;
  image: string;
  rarity: string;
  category: string;
  description: string;
}

export interface CartItem extends Skin {
  quantity: number;
}

export interface NewSkinForm {
  name: string;
  price: string;
  image: string;
  rarity: string;
  category: string;
  description: string;
}
