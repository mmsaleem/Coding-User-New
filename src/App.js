import styles from "./App.module.css";
import {useContext} from "react";
import {BrowserRouter} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import AppRoute from "./routes/AppRoute";
import "bootstrap/dist/css/bootstrap.min.css";


function App ()
{
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
      
   </>
  );
}

export default App;
