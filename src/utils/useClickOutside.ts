import { useEffect } from "react";

export function useClickOutside(
  ref: React.RefObject<HTMLElement>,
  onOutsideClick: () => void,
  active: boolean
) {
  useEffect(() => {
    if (!active) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOutsideClick();
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [ref, onOutsideClick, active]);
}
