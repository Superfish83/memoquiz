import "@/styles/globals.css";
import { IBM_Plex_Sans_KR } from 'next/font/google';

const plex_sans = IBM_Plex_Sans_KR(
  { 
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500','600'],
  });

function MyApp({ Component, pageProps }) {
  return (
    <main className={plex_sans.className}>
      <Component {...pageProps} />
    </main>
  );
  }  
export default MyApp