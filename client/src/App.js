import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { getHistory, configStore } from "./configs/configureStore";
import { GlobalStyles } from "./components/styles/GlobalStyles";
import RoutesComponent from "./routes/RoutesComponent";
import Spinner from "./routes/CustomLoader/Spinner";

const store = configStore();

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        <ConnectedRouter history={getHistory()}>
          <RoutesComponent />
        </ConnectedRouter>
      </Provider>
      <GlobalStyles />
    </Suspense>
  );
}

export default App;
