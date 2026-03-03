// Временно: замени на селектор из auth slice (RTK) когда появится авторизация
export function useIsAuthed(): boolean {
  return Boolean(localStorage.getItem('token'));
}
