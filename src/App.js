import styles from "./App.module.css";
import {useContext} from "react";
import {BrowserRouter} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AppRoute from "./routes/AppRoute";
import {LoadingContext} from "./context/LoadingProvider";
import Loading from "./components/Loading";
import "bootstrap/dist/css/bootstrap.min.css";


function App ()
{
  const {isLoading} = useContext(LoadingContext);
  return (
    <>
      {
      // todo wrap with BrowserRouter and render the necessary components
      <BrowserRouter>
      <div className={styles["app"]}>
        <header className={styles["app__header"]}>
          <NavigationBar/>
        </header>

        <main className={styles["app__main"]}>
          
          <AppRoute/>
        </main>
      </div>
      </BrowserRouter>

      }
      

      {
        // todo render Loading based on its condition
         isLoading
         &&
         <Loading/>
      }
   </>
  );
}

export default App;
