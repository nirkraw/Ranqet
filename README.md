# [Ranqet](http://www.ranqet.com)

# Site Description
A crowdsourced, social, ranking site where users can vote on the order of a list through indvidual matchups and view personal and global rankings based on aggregate vote results. Users can also create lists, comment on rankings, and see other users lists. 

# Tech Stack:
- Java (Spring)   
- Javascript/React (with hooks) 
- AWS S3
- Heroku  
- Postgres  
- Axios

# MVP's

- Users can create, read, and delete lists
- Users can vote on lists
- Votes are aggregated using the ELO rating system to form Rankings
- Lists of lists are organized into categories and shown on home page
- Users can comment
- User's have profile pages
- Search bar

# Code Highlights

## Frontend

### Custom hook for cacheing

This method is used to store cache results across site. It accepts function name and arguments
to check for existing cache or create new key in localStorage. The method can make backend calls asynchronously and handle errors. The functions takes advantage of high level React concepts such as custom hooks, useEffect for async calls, useRef to compare previous arguments, and dynamic React router error handling.  

```export default function useCache(cacheObj) {
  const { fn, args, enabled } = cacheObj;
  const history = useHistory();
  const prevArgs = useRef(null);
  const [cacheId, setCacheId] = useState("");
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
    } else {
      loadEndpoint();
    }

    async function loadEndpoint() {
      try {
        const res = await fn(...args);
        localStorage.setItem(cacheID, JSON.stringify(res.data));
        setCacheId(cacheID);
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

```

### Modularized Components

The site requried to have both horizontal and vertical tabs and so styles were applied dynamically to a "tabDirection" prop.


```{tabs.map((tab, i) => (
          <li
            className={
              activeIdx === i ? "tab-names-li activeTab" : "tab-names-li"
            }
            id={tabDirection === "horizontal" ? "tab-names-li-horizontal" : ""}
            onClick={() => setTab(i, tab)}
            key={i}
          >
            <h1 className={activeIdx === i ? "activeTabText" : ""}>
              {tab.name}
            </h1>
          </li>
        ))}
```

Multiple features needed a confirmation modal before deltion such as deleting options when creating a list, and deleting published lists. The deleteConfrimation modal allows parent to pass all neccesary information including reference to itself, in order to use the useOursideAlerter method to allow for outside clicks to close the modal (see Pub/Sub feature).

```
export default function DeleteConfirmation({ parent, submitFunc, confirmMessage, funcArgs }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const closeModal = () => setIsOpen(false);
  useOutsideAlerter(wrapperRef, setIsOpen, "mousedown");
  return (
    <div className="confirmation-modal-main" ref={wrapperRef}>
      <div onClick={() => setIsOpen(true)}>{parent}</div>
      {isOpen ? (
        <div className="confirmation-modal-box column-center-center">
          <p>{confirmMessage}</p>
          <div className="confirmation-modal-button-container">
            <div className="site-button" onClick={closeModal}>
              Cancel
            </div>
            <div
              className="site-button"
              onClick={(e) => {
                submitFunc(...funcArgs);
                setIsOpen(false);
              }}
            >
              Yes
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
```

### JavaScript Pub/Sub for component sibling communication 

By setting up Pub/Sub using Custome Events and eventListeners, sibling components across the site were able to trigger the approriate Session Modal and pass in a target route: 
```
const openModal = new CustomEvent("openModal", {
detail: {
    newFormType: "signup",
    newRoute: `/${match.params.listId}/quiz`,,
},
});
window.dispatchEvent(openModal);
```

Event listener in the Session Modal responeded to render the approriate session form (Sign Up vs Login).

```
export default function Modal() {
  const [formType, setFormType] = useState("");
  const [route, setRoute] = useState("");

  useEffect(() => {//eventListener across app
    const updateModalState = (event) => {
      setFormType(event.detail.newFormType);
      setRoute(event.detail.newRoute);
    };
    window.addEventListener("openModal", updateModalState);
    return () => {
      window.removeEventListener("openModal", updateModalState);
    };
  }, []);

  if (!formType) return null;

  return (
    <div
      className="modal-background"
      onClick={() => {
        setFormType("");
        setRoute("");
      }}
    >
      <div className="modal-child" onClick={(e) => e.stopPropagation()}>
        <SessionForm
          formType={formType}
          route={route}
        />
      </div>
    </div>
  );
}
```

Components across application could add a useOutsideAlerter custom hook to create a Pub/Sub across eleemnts across site to trigger functions on user events. For example to close modals or dropdowns. 

```
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
```

And can be triggered with 
```
useOutsideAlerter(wrapperRef, setActive, "mousedown");
```
# Terms:

**Options** - The elements that make up a list 
**Quiz** - The process to vote on a list to form a ranking  
**Vote** - A single choice between two options  
**Ranking** - The finalized, ordered list  
**Personal Ranking** - the ranking based on one users votes only  
**Global Ranking** - An average of all the users’ personal rankings  



### Running Backend
Initialize AWS Secrets:
```
. ./scripts/initialize_secrets.sh
```
then run `./gradlew run -PskipFrontend=true` in that same shell

### Running Frontend

In the webapp directory run ```npm run start```
