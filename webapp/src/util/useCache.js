import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

// this method is used to store cache results across site. It accepts function name and arguments
// to check for existing cache or create new key in localStorage.
export default function useCache(cacheObj) {
  const { fn, args, enabled } = cacheObj;
  const history = useHistory();
  const prevArgs = useRef(null);
  const [cacheId, setCacheId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //if cache is not enabeled then it does not store and sets loading to false, 
    if (enabled === false) {
      setLoading(false);
      return;
    }
    //if the state hasn't changed no new cache storage
    if (JSON.stringify(args) === JSON.stringify(prevArgs.current)) return;
    //creates newCacheId using passed params
    const cacheID = JSON.stringify(fn.name) + JSON.stringify(...args);

    //if cacheId already exists return it otherwise create a new key in localStorage
    if (localStorage.getItem(cacheID)) {
      setCacheId(cacheID);
      // setLoading(false);
    } else {
      loadEndpoint();
    }

    async function loadEndpoint() {
      try {
        const res = await fn(...args);
        localStorage.setItem(cacheID, JSON.stringify(res.data));

        setCacheId(cacheID);
        // setLoading(false);
      } catch (err) {
        history.push(`/error/${err}`);
      }
    }
  }, [args, fn]);

  //sets a ref to the curren args to compare to next args to stop infinite cacheStorage
  useEffect(() => {
    prevArgs.current = args;
  });
  //need loading for components that have disabled cache functions so they can load even without an ID
  return [cacheId, loading];
}
