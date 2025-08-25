import { useNavigate } from 'react-router-dom';
import BackToTop from './backtop';
import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/signin');
    
  };

  return (
    <>
      <BackToTop />
      <Navbar onSignOut={handleSignOut} />
      <main>{children}</main>
      <Footer />
    </>
  );
}