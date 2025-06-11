import React from "react";

const Address = () => {
  return (
    <div className="w-full h-0 aspect-[4/3] md:h-[450px]">
      {" "}
      {/* Responsive container */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14649.28329819991!2d85.33736597191943!3d23.376608314540988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e300ac31ade3%3A0x3dbfcbeedd6f648d!2sLENS%20STAR%2C%20KOKAR%2C%20RANCHI%2C%20JHARKHAND!5e0!3m2!1sen!2sin!4v1738876285160!5m2!1sen!2sin" // Replace with your actual embed code
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="My Map"
      />
    </div>
  );
};

export default Address;


