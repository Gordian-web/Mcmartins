import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import img from '../assets/phone.png';
import images from '../assets/map-pin-house.png';
import image from '../assets/mail.png';
import message from '../assets/message-circle-question-mark.png';

const Contact = () => {
    const [contact, setContact] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState('');
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        setTimeout(() => setContact(true), 100);
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.email.includes('@')) {
            setStatus('Please enter a valid email address');
            return;
        }

        setIsSending(true);
        setStatus('Sending...');

        try {
            const response = await emailjs.send(
                import.meta.env.VITE_SERVICE_ID,
                import.meta.env.VITE_TEMPLATE_ID,
                {
                    from_name: form.name,
                    from_email: form.email,
                    to_email: "mcmartinsltd@gmail.com",
                    message: form.message,
                    reply_to: form.email
                },
                import.meta.env.VITE_PUBLIC_ID
            );

            if (response.status === 200) {
                setStatus('Message sent successfully!');
                setForm({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 5000); // Clear success message after 5 seconds
            }
        } catch (error) {
            console.error("EmailJS Error:", error);
            setStatus(`Error: ${error.text || 'Failed to send message'}`);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className={`flex flex-col items-center transition-transform duration-1000 ease-out bg-gray-50 ${contact ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
            <div className="w-full max-w-7xl  text-center mb-8 sm:mb-10 md:mb-12 mt-30">
                <h2 className="text-3xl sm:text-4xl md:text-3xl font-bold text-black font-sans mb-3 sm:mb-4">
                    Contact Us Here
                </h2>
                <p className="text-gray-600 text-sm sm:text-lg md:text-lg max-w-3xl mx-auto">
                    You can reach us by phone, email, at our location, or visit us on our social media handles.
                </p>
            </div>

            <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-8 md:gap-10 px-4">
                {/* Contact Form */}
                <div className="w-full lg:w-1/2 bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg border-t-4 border-b-4 border-black">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 font-sans">
                            Nice to Meet You!
                        </h2>
                        <p className="mb-6 text-gray-600">Have a question or just want to get in touch? Let's chat.</p>
                        
                        <div className="space-y-5">
                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-base md:text-lg"
                                required
                            />
                            
                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-base md:text-lg"
                                required
                            />
                            
                            <textarea
                                name="message"
                                placeholder="Please write your message here"
                                rows={5}
                                value={form.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none text-base md:text-lg"
                                required
                            />
                            
                            <button
                                type="submit"
                                disabled={isSending}
                                className="w-full text-center rounded-full bg-black text-white font-medium py-3 px-6 transition duration-300 hover:bg-gray-800 flex items-center justify-center gap-2"
                            >
                                {isSending ? 'Sending...' : 'Send Message'}
                                <img src={message} alt="" className="invert w-5 h-5" />
                            </button>
                            
                            {status && (
                                <p className={`text-center mt-3 text-sm md:text-base ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                                    {status}
                                </p>
                            )}
                        </div>
                    </form>
                </div>

                {/* Contact Information */}
                <div className="w-full lg:w-1/2 bg-blue-50 p-6 sm:p-8 md:p-10 rounded-xl shadow-lg border-t-4 border-b-4 border-black">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 font-sans">
                        Visit Us
                    </h3>
                    
                    <div className="h-64 sm:h-72 md:h-80 lg:h-96 w-full rounded-lg overflow-hidden shadow-md mb-6">
                        <iframe
                            title="Business Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353159046!3d-37.8162797420217!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f8e7b1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="border-0"
                        />
                    </div>
                    
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <img src={images} alt="Location" className="w-7 h-7 mr-3" />
                            <p className="text-gray-700 text-base md:text-lg font-bold">123 Main St, City, State, ZIP</p>
                        </div>
                        
                        <div className="flex items-center">
                            <img src={img} alt="Phone" className="w-7 h-7 mr-3" />
                            <p className="text-gray-700 text-base md:text-lg font-bold">(+63) 962-529-5867</p>
                        </div>
                        
                        <div className="flex items-center">
                            <img src={image} alt="Email" className="w-7 h-7 mr-3" />
                            <p className="text-gray-700 text-base md:text-lg break-all font-bold">Mcmartinsltd@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="flex-grow w-full h-20"></div>
        </div>
    );
};

export default Contact;