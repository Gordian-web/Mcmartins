import Herosecction from './herosecction';
import Underhero from './underhero';
import Men from './men';
import Women from './women';
import Store from './store';
import Contact from './Contact';
import Delivery from './delivery';
import Testimonials from './testimonials';

export default function HomePage() {
    return (
        <>
            <Herosecction />
            <Underhero />
            <Men />
            <Women />
            <Store />
            <Contact />
            <Delivery />
            <Testimonials />
        </>
    );
}