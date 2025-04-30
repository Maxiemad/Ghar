
import { Phone, Mail, Linkedin, Instagram, MapPin } from 'lucide-react';

const ContactInfo = () => {
  const contactDetails = {
    name: "Akanksha",
    email: "akanksha.k@adypu.edu.in",
    phone: "8271342331",
    linkedin: "www.linkedin.com/in/akanksha-sharma-741283317",
    instagram: "https://www.instagram.com/akankshahaha08/"
  };

  return (
    <section id="contact" className="py-20 relative bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Have questions about GHAR? We're here to help you design your dream home.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="glass-card dark:glass-card-dark p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-ghar-primary/10 text-ghar-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${contactDetails.email}`} className="font-medium hover:text-ghar-primary">
                    {contactDetails.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-ghar-primary/10 text-ghar-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={`tel:${contactDetails.phone}`} className="font-medium hover:text-ghar-primary">
                    {contactDetails.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-ghar-primary/10 text-ghar-primary">
                  <Linkedin size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">LinkedIn</p>
                  <a href={`https://${contactDetails.linkedin}`} target="_blank" rel="noreferrer" className="font-medium hover:text-ghar-primary">
                    {contactDetails.linkedin}
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-ghar-primary/10 text-ghar-primary">
                  <Instagram size={20} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Instagram</p>
                  <a href={contactDetails.instagram} target="_blank" rel="noreferrer" className="font-medium hover:text-ghar-primary">
                    @akankshahaha08
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <a 
                href={`https://${contactDetails.linkedin}`}
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-full bg-ghar-primary/10 text-ghar-primary hover:bg-ghar-primary hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href={contactDetails.instagram}
                target="_blank" 
                rel="noreferrer"
                className="p-3 rounded-full bg-ghar-primary/10 text-ghar-primary hover:bg-ghar-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden h-[400px] relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2612745272946!2d73.9092535!3d18.5194537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b8b3a3bf%3A0x6f7fdcc8e4d6c77e!2sAjeenkya%20DY%20Patil%20University!5e0!3m2!1sen!2sin!4v1619197995062!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Google Maps"
            ></iframe>
            
            <div className="absolute bottom-4 left-4 glass-card dark:glass-card-dark p-4 rounded-lg flex items-center gap-3 max-w-xs">
              <MapPin className="text-ghar-primary shrink-0" />
              <p className="text-sm">Ajeenkya DY Patil University, Pune, India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;
