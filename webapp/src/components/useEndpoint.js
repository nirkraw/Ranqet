import { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";

export default function useEndpoint(fn, args, defaultValue = []) {
  const history = useHistory();
  const prevArgs = useRef(null);
  const [data, setData] = useState(defaultValue);
  const [isLoading, setLoading] = useState(true);

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
      setLoading(false);
    } else {
      // else make sure loading set to true
      setLoading(true);
    }
    // fetch new data
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


 
    // fn(...args)
    //   .then((newData) => {
    //     localStorage.setItem(cacheID, JSON.stringify(newData));
    //     setData(newData.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     if(error) history.push(`/error/${error}`);
    //   });
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

const isEqual = (obj1, obj2) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};
