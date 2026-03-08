export function useIsAuthed(): boolean {
  return Boolean(localStorage.getItem('accessToken'));
}