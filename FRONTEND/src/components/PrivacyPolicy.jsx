import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-lg my-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Privacy Policy
      </h1>

      <p className="text-gray-600 text-center mb-6">
        Last Updated: <span className="font-semibold">07-02-2025</span>
      </p>

      <section className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">1. Introduction</h2>
        <p className="text-gray-600 mt-2">
          Welcome to <span className="font-medium">Lens Star</span>. Your
          privacy is important to us. This Privacy Policy outlines how we
          collect, use, and protect your personal information.
        </p>
      </section>

      <section className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          2. Information We Collect
        </h2>
        <p className="text-gray-600 mt-2">
          We collect the following types of information when you use our
          services:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mt-2">
          <li>
            <strong>Personal Information:</strong> Name, email address, phone
            number, billing details.
          </li>
          <li>
            <strong>Usage Data:</strong> IP address, browser type, pages
            visited, and time spent on our website.
          </li>
          <li>
            <strong>Cookies:</strong> Small files stored on your device to
            enhance your experience.
          </li>
        </ul>
      </section>

      <section className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          3. How We Use Your Information
        </h2>
        <p className="text-gray-600 mt-2">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mt-2">
          <li>To provide and improve our services.</li>
          <li>To communicate with you regarding your orders or inquiries.</li>
          <li>To analyze website traffic and improve user experience.</li>
          <li>To comply with legal obligations.</li>
        </ul>
      </section>

      <section className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          4. Sharing Your Information
        </h2>
        <p className="text-gray-600 mt-2">
          We do not sell your personal data. However, we may share your
          information with:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mt-2">
          <li>
            <strong>Service Providers:</strong> Payment processors, shipping
            partners, and cloud hosting providers.
          </li>
          <li>
            <strong>Legal Authorities:</strong> If required by law or to protect
            our rights.
          </li>
        </ul>
      </section>

      <section className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          5. Cookies & Tracking Technologies
        </h2>
        <p className="text-gray-600 mt-2">
          We use cookies to personalize your experience and analyze website
          traffic. You can disable cookies in your browser settings, but some
          features may not function properly.
        </p>
      </section>

      <section className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          6. Data Security
        </h2>
        <p className="text-gray-600 mt-2">
          We implement security measures to protect your data from unauthorized
          access, alteration, or destruction. However, no method is 100% secure.
        </p>
      </section>

      <section className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">7. Your Rights</h2>
        <p className="text-gray-600 mt-2">
          Depending on your location, you may have the following rights
          regarding your personal data:
        </p>
        <ul className="list-disc pl-6 text-gray-600 mt-2">
          <li>The right to access, update, or delete your information.</li>
          <li>The right to opt out of marketing emails.</li>
          <li>The right to request data portability.</li>
        </ul>
      </section>

      <section className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          8. Third-Party Links
        </h2>
        <p className="text-gray-600 mt-2">
          Our website may contain links to third-party websites. We are not
          responsible for their privacy practices. Please review their policies
          before sharing personal information.
        </p>
      </section>

      <section className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          9. Changes to This Policy
        </h2>
        <p className="text-gray-600 mt-2">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page with an updated revision date.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700">10. Contact Us</h2>
        <p className="text-gray-600 mt-2">
          If you have any questions or concerns about this Privacy Policy,
          please contact us at:
        </p>
        <p className="text-gray-600 mt-2">
          📧{" "}
          <a
            href="mailto:rahulkumar251326@gmail.com"
            className="text-blue-600 hover:underline"
          >
            rahulkumar251326@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
