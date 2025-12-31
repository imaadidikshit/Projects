import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product, selectedSize, selectedColor, quantity = 1) => {
        const items = get().items;
        const existingIndex = items.findIndex(
          item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
        );

        if (existingIndex >= 0) {
          const newItems = [...items];
          newItems[existingIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          set({
            items: [
              ...items,
              {
                ...product,
                selectedSize,
                selectedColor,
                quantity,
                cartId: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`
              }
            ]
          });
        }
        set({ isOpen: true });
      },

      removeItem: (cartId) => {
        set((state) => ({
          items: state.items.filter((item) => item.cartId !== cartId)
        }));
      },

      updateQuantity: (cartId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(cartId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.cartId === cartId ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => set({ items: [] }),

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'luxe-cart',
    }
  )
);

export const useUIStore = create((set) => ({
  isSearchOpen: false,
  cursorText: '',
  cursorVariant: 'default',

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  setCursorText: (text) => set({ cursorText: text }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
}));
