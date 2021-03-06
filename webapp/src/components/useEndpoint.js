import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

export default function useEndpoint(fn, args, defaultValue = []) {
  const history = useHistory();
  const prevArgs = useRef(null);
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (JSON.stringify(args) === JSON.stringify(prevArgs.current)) return;

    const cacheID = JSON.stringify(fn.name) + JSON.stringify(...args);

    if (localStorage.getItem(cacheID)) {
      setData(JSON.parse(localStorage.getItem(cacheID)));
      setLoading(false);
    }

    async function loadEndpoint() {
      try {
        const res = await fn(...args);
        localStorage.setItem(cacheID, JSON.stringify(res));
        setData(res.data);
        setLoading(false);
      } catch (err) {
        history.push(`/error/${err}`);
      }
    }

    loadEndpoint();
  }, [args, fn]);

  useEffect(() => {
    prevArgs.current = args;
  });

  return [data, loading];
}
