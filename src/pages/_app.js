import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Thème PrimeReact
import "primereact/resources/primereact.min.css"; // Styles généraux PrimeReact
import "primeicons/primeicons.css"; // Icônes PrimeIcons
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <PrimeReactProvider>
      <Component {...pageProps} />
    </PrimeReactProvider>
  );
}
