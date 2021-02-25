//Your original component calls setEndpointParams 
//from an App.js state: [endpointParams, setEndpointParams], which sends the endpointParams object
//to a component called endpointHandler. It calls to the backend and if it's an error or loading
//it loads or errors on to the DOM. And if it's a success, it calls another App.js state
//called [response, setResponse] which passes the response object to the original component
