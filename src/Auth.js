const Auth = {
    isAuthenticated: false,
    apiBaseUrl: "https://oep-api.herokuapp.com/v0.0",
    authenticate() {      
      let accessToken = localStorage.getItem("accessToken");
     this.isAuthenticated = true;
    },
    signout() {
      this.isAuthenticated = false;
    },
    getAuth() {
        let accessToken = localStorage.getItem("accessToken");        
        if(accessToken == '' || accessToken == null)
          return false;
        else
          return true;
      },
    getAPIBaseUrl() {
        return this.apiBaseUrl;
      }
  };

  export default Auth;