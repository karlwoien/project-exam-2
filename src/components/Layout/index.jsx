import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Header />
      <main className={`vh-100 flex-grow ${isHome ? 'pt-0' : 'px-2.5 py-5 md:py-10'}`}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

//<main className="flex-grow pt-20 md:pt-24 lg:pt-28">
