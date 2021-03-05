import { useState, useEffect, useRef } from "react";

export default function useEndpoint(fn, args, defaultValue = []) {
  const prevArgs = useRef(null);
  const [data, setData] = useState(defaultValue);
  const [isLoading, setLoading] = useState("loading");

  useEffect(() => {
    // args is an object so deep compare to rule out false changes
    if (isEqual(args, prevArgs.current)) {
      return;
    }
    // cacheID is how a cache is identified against a unique request
    const cacheID = hashArgs(fn.name, ...args);
    // look in cache and set response if present
    if (localStorage.getItem(cacheID)) {
      setData(JSON.parse(localStorage.getItem(cacheID)));
      setLoading("Not loading");
    } else {
      // else make sure loading set to true
      setLoading("loading");
    }
    // fetch new data
    fn(...args).then((newData) => {
      localStorage.setItem(cacheID, JSON.stringify(newData));
      setData(newData.data);
      setLoading("Not loading");
    }).catch(error => {
        setLoading(error)
    });
  }, [args, fn]);

  useEffect(() => {
    prevArgs.current = args;
  });

  return [data, isLoading];
}

function hashArgs(...args) {
  return args.reduce((acc, arg) => stringify(arg) + ":" + acc, "");
}

function stringify(val) {
  return typeof val === "object" ? JSON.stringify(val) : String(val);
}

const isEqual = (obj1, obj2) =>{
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}
