import Navbar from './component/navbar';
import Herosecction from './component/herosecction';
import About from './component/About';
import BackToTop from './component/backtop';
import Footer from './component/footer';
import Men from './component/men';
import Women from './component/women';
import Contact from './component/contact';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Notfound } from "./component/notfound";
import Store from './component/store';
import Delivery from './component/delivery';
import Underhero from './component/underhero';
import Gallery from './component/Gallery';
import Read from './component/read';
import { CartProvider } from "./cart/cartcontext";
import Testimonials from './component/testimonials';


export default function MainSite()  {
      return (
    <CartProvider>
      <BackToTop />
      <Navbar />
      <BrowserRouter>
        <BackToTop />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Herosecction />
                <Underhero />
                <Men />
                <Women />
                <Store />
                <Contact />
                <Delivery />
                <Testimonials/>
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/read" element={<Read />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  );

}