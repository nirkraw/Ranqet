import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

export default function useCache(cacheObj) {
  const { fn, args, defaultValue, running, blocking } = cacheObj;
  const history = useHistory();
  const prevArgs = useRef(null);
  const [data, setData] = useState(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Reached use effect");
    if (running === false) {
      setLoading(false);
      return;
    }
    if (JSON.stringify(args) === JSON.stringify(prevArgs.current)) return;
    console.log("Can we get past this (:");

    const cacheID = JSON.stringify(fn.name) + JSON.stringify(...args);
    if (localStorage.getItem(cacheID)) {
      console.log("Fetching cache");
      setData(JSON.parse(localStorage.getItem(cacheID)).data);
      setLoading(false);
      if (blocking) return;
    }

    async function loadEndpoint() {
      console.log("Fetching backend");
      try {
        const res = await fn(...args);
        localStorage.setItem(cacheID, JSON.stringify(res));
        setData(res.data);
        console.log(res.data);
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
