import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

/**
 * Layout component that wraps the application with a header, footer, and dynamic content.
 * @returns {JSX.Element} - Rendered Layout component.
 */
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
