import React from "react";
import ContactFormClient from "./ContactFormClient";

export const ContactForm = () => {
  return (
    <section id="contact" className="container py-16 space-y-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Get in{" "}
        <span className="bg-linear-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Touch
        </span>
      </h2>
      <p className="text-muted-foreground text-xl text-center">
        Have questions or need assistance? Send us a message, and we’ll get back to you shortly.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form (Client) */}
        <ContactFormClient />

        {/* Google Maps Embed (SSR) */}
        <div className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15553.570774466965!2d77.69089151697227!3d12.946705197190557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13b7dd47fe43%3A0x3ec366ea1d0b70c5!2sCGI!5e0!3m2!1sen!2sin!4v1723213950349!5m2!1sen!2sin"
            style={{ border: "none", width: "100%", height: "100%" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Embed: Pivotr Technologies #220 CGI, Marathalli - Visit Us in Bengaluru"
            className="h-64 lg:h-full"
          ></iframe>
        </div>
      </div>
    </section>
  );
};
