import React from "react";

const RefundPolicy = () => {
  return (
    <>
      <div
        className="bg-[#21567e] w-full mb-2 flex justify-center place-items-center h-[200px] sm:h-[250px]"
      >
        <h1 className="text-center md:text-[65px] text-[45px] text-[white] font-bold">
          Refund Policy
        </h1>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-2">Introduction</h2>

          <p className="mb-4">
            Welcome to our website. If you continue to browse and use this
            website, you are agreeing to comply with and be bound by the
            following refund policy. If you disagree with any part of this policy,
            please do not use our website.
          </p>

          <h2 className="text-2xl font-bold mb-2">Refund Policy Details</h2>

          <p className="mb-4">
            Our refund policy is designed to give you confidence in making a
            purchase on our website. Please read the following policy carefully:
          </p>

          <p className="mb-4">
            - We offer a full refund within 30 days of your purchase if you are
            not satisfied with your order.
          </p>

          <p className="mb-4">
            - To request a refund, please contact our customer support team at
            [email protected] and provide your order details.
          </p>

          <p className="mb-4">
            - Refunds will be processed within 5 business days after approval.
          </p>

          <h2 className="text-2xl font-bold mb-2">Contact Information</h2>

          <p className="mb-4">
            If you have any questions or concerns about our refund policy,
            please contact us at [email protected]
          </p>

          <p className="mb-4">
            This refund policy is subject to change without notice.
          </p>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;
