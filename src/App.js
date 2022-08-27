import { Switch, Route, useHistory } from "react-router-dom";
// Material-UI imports
import Grid from "@material-ui/core/Grid";

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { CustomNavigationClient } from "./utils/NavigationClient";

// Sample app imports
import { PageLayout } from "./ui-components/PageLayout";
import { Home } from "./pages/Home";
import Iframed from "./pages/Iframed";
import { Profile } from "./pages/Profile";
import { Logout } from "./pages/Logout";

// Class-based equivalents of "Profile" component
import { ProfileWithMsal } from "./pages/ProfileWithMsal";
import { ProfileRawContext } from "./pages/ProfileRawContext";
import { ProfileUseMsalAuthenticationHook } from "./pages/ProfileUseMsalAuthenticationHook";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";

function App({ pca }) {
  // The next 3 lines are optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
  const history = useHistory();
  const navigationClient = new CustomNavigationClient(history);
  pca.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={pca}>
      <PageLayout>
        <Grid container justifyContent="center">
          <Pages />
        </Grid>
      </PageLayout>
    </MsalProvider>
  );
}
function Pages() {
  const msalInstance = new PublicClientApplication(msalConfig)
  const activeAccount = msalInstance.getAllAccounts()[0] || {};
  const { idTokenClaims = {} } = activeAccount;
  var { sid = '' } = idTokenClaims;
  return (
    <Switch>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/profileWithMsal">
        <ProfileWithMsal />
      </Route>
      <Route path="/profileRawContext">
        <ProfileRawContext />
      </Route>
      <Route path="/profileUseMsalAuthenticationHook">
        <ProfileUseMsalAuthenticationHook />
      </Route>
      <Route path="/logout">
          <Logout />
      </Route>
      <Route path="/iframedApp">
        <Iframed sid={sid} />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}

export default App;
