const CART_KEY = "garagesale_cart";

export function getCart(): string[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) ?? "[]") as string[];
  } catch {
    return [];
  }
}

function setCart(ids: string[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("cart:updated", { detail: { cart: ids } }));
}

export function addToCart(id: string): void {
  const cart = getCart();
  if (!cart.includes(id)) setCart([...cart, id]);
}

export function removeFromCart(id: string): void {
  setCart(getCart().filter((x) => x !== id));
}

