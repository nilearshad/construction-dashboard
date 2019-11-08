import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import adminDashboard from "./components/admin/dashboard/dashboard";
import categoryLists from "./components/admin/category/categoryLists";
import userComponent from "./components/admin/user/user";
import userProfileInfo from "./components/admin/user/userProfileInfo";
import adminChangePassword from "./components/admin/change-password/change-password";
import templateComponent from "./components/admin/template/Template";
import commonService from './core/services/commonService';
import TopNavigation from './components/header/topNavigation';
class Routes extends React.Component{

    render() {
        
        const AdminDashboardLayout = ({ children }) => (
          <div>
            <div className="flyout">
                <TopNavigation />
              <main>
                  {children} 
              </main> 
            </div>          
          </div>
        );
        return (
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path={["/","/admin/dashboard", "/admin/category","/admin/template",
              "/admin/user","/admin/user/:profileId", "/admin/change-password"]}>
                <AdminDashboardLayout>
                  <PrivateRoute exact path="/admin/dashboard" component={adminDashboard} />                 
                  <PrivateRoute exact path="/admin/category" component={categoryLists} />
                  <PrivateRoute exact path="/admin/template" component={templateComponent} />
                  <PrivateRoute exact path="/admin/user" component={userComponent} />
                  <PrivateRoute exact path="/admin/user/:profileId" component={userProfileInfo} />
                  <PrivateRoute exact path="/admin/change-password" component={adminChangePassword} />
                  <PrivateRoute exact path="/" component={adminDashboard} />

                </AdminDashboardLayout>
              </Route>  
                
                <Route
                    render={function () {
                        return <h1>Not Found</h1>;
                    }}
                />
            </Switch>
        )
    };
}
const PrivateRoute = ({ component, ...rest }) => {
 
  return (
    <Route {...rest} exact
      render = {(props) => (

        commonService.getAuth() ? (
          
          <div>            
            {React.createElement(component, props)}
          </div>
        ) :
        (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      )}
    />
  )
}
export default Routes;