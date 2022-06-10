import '../styles/globals.css';
import {CartProvider} from '../context/ContextCarrinho/index.js';

function MyApp({ Component, pageProps }) {
    return(
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
    );
}

export default MyApp; 
