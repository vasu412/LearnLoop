import React, { useContext, useState } from "react";
import context from "../Context/context";

const OnboardingPage = () => {
  const { darkMode } = useContext(context);

  // State to manage active accordion
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) =>
    setActiveAccordion(activeAccordion === index ? null : index);

  return (
    <div
      className={`p-6 w-[calc(100vw-275px)] h-[91.4vh] overflow-scroll ${
        darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-900"
      } `}>
      {/* Onboarding Section */}
      <section className="mb-10">
        <h1 className="text-4xl font-bold flex items-center gap-2">
          🚀 Welcome to the Community!
        </h1>
        <p className="mt-4 text-lg">
          We’re thrilled to have you here! Here’s how to get started and make
          the most of your experience:
        </p>
        <ul className="list-disc ml-6 mt-4 space-y-3 text-base">
          <li>
            <span className="font-semibold">Create your profile:</span> Add a
            bio, upload a profile picture, and showcase your interests.
          </li>
          <li>
            <span className="font-semibold">Explore posts:</span> Check out
            ongoing discussions and contribute to the community.
          </li>
          <li>
            <span className="font-semibold">Share your ideas:</span> Submit
            feature requests, teaching tips, or ask questions.
          </li>
        </ul>
      </section>

      {/* Getting Started Guide */}
      <section className="mb-10">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          📘 Getting Started Guide
        </h2>
        <p className="mt-2 text-lg">
          Follow these steps to dive in and get the most out of our platform:
        </p>
        <div className="mt-4 space-y-4">
          <Accordion
            index={1}
            activeIndex={activeAccordion}
            toggleAccordion={toggleAccordion}
            title="🔒 Set up your account"
            content="Sign up using your email or social media accounts. Don’t forget to verify your email address to unlock all features!"
          />
          <Accordion
            index={2}
            activeIndex={activeAccordion}
            toggleAccordion={toggleAccordion}
            title="📝 Customize your profile"
            content="Add your profile details, upload a picture, and let the community know your expertise or interests."
          />
          <Accordion
            index={3}
            activeIndex={activeAccordion}
            toggleAccordion={toggleAccordion}
            title="🤝 Start engaging"
            content="Post your thoughts, comment on others’ ideas, and build meaningful connections!"
          />
        </div>
      </section>

      {/* FAQs */}
      <section>
        <h2 className="text-3xl font-bold flex items-center gap-2">❓ FAQs</h2>
        <p className="mt-2 text-lg">
          Got questions? We’ve got answers! Here are some common queries:
        </p>
        <div className="mt-4 space-y-4">
          <Accordion
            index={4}
            activeIndex={activeAccordion}
            toggleAccordion={toggleAccordion}
            title="💡 How can I share my ideas?"
            content="Navigate to the Feature Wishlist or Teaching Tips sections and click 'Share your thoughts' to post your ideas."
          />
          <Accordion
            index={5}
            activeIndex={activeAccordion}
            toggleAccordion={toggleAccordion}
            title="🔄 Can I edit my posts?"
            content="Yes! Open your post, click the edit icon, make changes, and save."
          />
          <Accordion
            index={6}
            activeIndex={activeAccordion}
            toggleAccordion={toggleAccordion}
            title="🛠️ How can I report an issue?"
            content="Use the ‘Report an Issue’ button found at the bottom of the page to contact our support team."
          />
        </div>
      </section>
    </div>
  );
};

const Accordion = ({ index, activeIndex, toggleAccordion, title, content }) => {
  const isActive = index === activeIndex;
  const { darkMode } = useContext(context);
  return (
    <div
      className={`transition-all duration-300 rounded-lg overflow-hidden border ${
        darkMode
          ? isActive
            ? "border-blue-400 bg-blue-900"
            : "border-gray-700 bg-gray-800"
          : isActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-gray-200"
      }`}>
      <button
        onClick={() => toggleAccordion(index)}
        className={`w-full flex justify-between items-center p-4 text-left font-medium ${
          isActive
            ? "text-blue-300"
            : darkMode
            ? "text-gray-300"
            : "text-gray-800"
        }`}>
        {title}
        <span>{isActive ? "▲" : "▼"}</span>
      </button>
      <div
        className={`transition-all duration-300 ${
          isActive ? "max-h-screen p-4" : "max-h-0"
        } overflow-hidden`}>
        <p className={`${darkMode ? "text-gray-200" : "text-gray-700"}`}>
          {content}
        </p>
      </div>
    </div>
  );
};

export default OnboardingPage;
