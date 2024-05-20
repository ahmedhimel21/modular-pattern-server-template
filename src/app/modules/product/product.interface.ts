// variants type
export type TVariants = {
  type: string;
  value: string;
};

// inventory type
export type TInventory = {
  quantity: number;
  inStock: boolean;
};

// custom error
export type TCustomError = {
  message: string;
};

// product type
export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: [TVariants];
  inventory: TInventory;
};
