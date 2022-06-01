import "./App.css";
import AppContextProvider from "./context/AppContext";
import AppRouter from "./router/AppRouter";
import { ToastContainer} from 'react-toastify';
function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <AppRouter/>
        <ToastContainer/>
      </AppContextProvider>
    </div>
  );
}

export default App;
