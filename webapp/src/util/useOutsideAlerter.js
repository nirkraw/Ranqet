import {useEffect} from "react"

export const useOutsideAlerter = (ref, setActive, event) => {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setActive(false);
      }
    }

    document.addEventListener(event, handleClickOutside);
    return () => document.removeEventListener(event, handleClickOutside);
  }, [ref]);
}
