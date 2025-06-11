import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-lg my-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Terms of Service
      </h1>

      {/** Sections */}
      <section className="terms-section border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">1. Introduction</h2>
        <p className="text-gray-600 mt-2">
          Welcome to our website. By accessing and using our services, you agree
          to comply with the following Terms of Service. Please read them
          carefully.
        </p>
      </section>

      <section className="terms-section border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          2. User Responsibilities
        </h2>
        <p className="text-gray-600 mt-2">
          As a user of this website, you agree to provide accurate information
          and to use our services in a lawful and respectful manner. You are
          responsible for your own actions while using our website.
        </p>
      </section>

      <section className="terms-section border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          3. Product Information
        </h2>
        <p className="text-gray-600 mt-2">
          We strive to provide accurate product descriptions and images, but the
          availability, pricing, and descriptions may change without notice. We
          are not liable for any inaccuracies.
        </p>
      </section>

      <section className="terms-section border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          4. Order Process
        </h2>
        <p className="text-gray-600 mt-2">
          Orders can be placed through our website. Once an order is confirmed,
          we will process the payment and ship the items. We reserve the right
          to cancel or modify any orders under certain circumstances, including
          pricing or availability issues.
        </p>
      </section>

      <section className="terms-section border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          5. Shipping and Delivery
        </h2>
        <p className="text-gray-600 mt-2">
          We offer shipping to various locations. Delivery times vary by
          location and shipping method. We are not responsible for delays caused
          by the carrier or customs.
        </p>
      </section>

      <section className="terms-section border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          6. Intellectual Property
        </h2>
        <p className="text-gray-600 mt-2">
          All content, including but not limited to images, text, logos, and
          trademarks, is the property of{" "}
          <span className="font-medium">Lens Star</span>. You may not use or
          reproduce any content without prior written consent.
        </p>
      </section>

      <section className="terms-section border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          7. Privacy Policy
        </h2>
        <p className="text-gray-600 mt-2">
          Please refer to our{" "}
          <a href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </a>{" "}
          to learn how we collect, use, and protect your personal information.
        </p>
      </section>

      <section className="terms-section border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          8. Limitation of Liability
        </h2>
        <p className="text-gray-600 mt-2">
          Our liability is limited to the maximum extent permitted by law. We
          are not responsible for any damages arising from the use or inability
          to use our products or services.
        </p>
      </section>

      <section className="terms-section border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          9. Indemnification
        </h2>
        <p className="text-gray-600 mt-2">
          You agree to indemnify and hold us harmless from any claims, damages,
          or expenses arising from your use of the website or violation of these
          terms.
        </p>
      </section>

      <section className="terms-section border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          10. Governing Law and Dispute Resolution
        </h2>
        <p className="text-gray-600 mt-2">
          These terms are governed by the laws of{" "}
          <span className="font-medium">Jharkhand(India)</span>. Any disputes
          will be resolved in the competent courts of{" "}
          <span className="font-medium">Ranchi</span>.
        </p>
      </section>

      <section className="terms-section border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          11. Modifications
        </h2>
        <p className="text-gray-600 mt-2">
          We reserve the right to update or modify these Terms of Service at any
          time. It is your responsibility to review the terms periodically.
        </p>
      </section>

      <section className="terms-section">
        <h2 className="text-xl font-semibold text-gray-700">
          12. Contact Information
        </h2>
        <p className="text-gray-600 mt-2">
          If you have any questions regarding these Terms of Service, you can
          contact us at{" "}
          <a
            href="mailto:rahulkumar251326@gmail.com"
            className="text-blue-600 hover:underline"
          >
            rahulkumar251326@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default TermsOfService;
