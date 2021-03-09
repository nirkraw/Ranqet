import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

export default function useCache(cacheObj) {
  const { fn, args, enabled } = cacheObj;
  const history = useHistory();
  const prevArgs = useRef(null);
  const [cacheId, setCacheId] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (enabled === false) {
      setLoading(false);
      return;
    }
    if (JSON.stringify(args) === JSON.stringify(prevArgs.current)) return;

    const cacheID = JSON.stringify(fn.name) + JSON.stringify(...args);
    if (localStorage.getItem(cacheID)) {
      setCacheId(cacheID);
      setLoading(false);
    } else {
      loadEndpoint();
    }

    async function loadEndpoint() {
      try {
        const res = await fn(...args);
        localStorage.setItem(cacheID, JSON.stringify(res.data));
        setCacheId(cacheID);

        setLoading(false);
      } catch (err) {
        history.push(`/error/${err}`);
      }
    }
  }, [args, fn]);

  useEffect(() => {
    prevArgs.current = args;
  });

  return [cacheId, loading];
}
