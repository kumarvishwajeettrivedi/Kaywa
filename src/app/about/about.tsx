"use client";
import React, { useState } from 'react';
import styles from './about.module.css';

const About = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Is kaywa free to use?",
      answer: "Yes, kaywa is free to use with basic features. Premium features are available with our subscription plans."
    },
    {
      question: "How does kaywa work?",
      answer: "kaywa connects you with like-minded people through AI-powered matching and facilitates genuine conversations."
    },
    {
      question: "Is kaywa safe to use?",
      answer: "Yes, we have AI monitoring and community guidelines to ensure a safe environment for all users."
    }
  ];

  const brandVariants = [
    { text: "kaywa", style: { fontFamily: "'Sankofa Display', serif" } },
    { text: "connect", style: { fontFamily: "'Noto Sans', sans-serif", fontStyle: 'italic' } },
    { text: "chat", style: { fontFamily: "'Roboto Mono', monospace", fontWeight: 'bold' } },
    { text: "friends", style: { fontFamily: "'Sen', sans-serif", fontStyle: 'italic' } },
    { text: "community", style: { fontFamily: "'Noto Sans JP', sans-serif" } },
    { text: "ai", style: { fontFamily: "'Bitcount Grid Single', monospace", letterSpacing: '2px' } },
    { text: "talk", style: { fontFamily: "'Sankofa Display', serif" } },
    { text: "share", style: { fontFamily: "'Roboto Mono', monospace" } },
    { text: "discover", style: { fontFamily: "'Noto Sans', sans-serif", fontStyle: 'italic' } },
    { text: "kaywa", style: { fontFamily: "'Sen', sans-serif", fontWeight: 'bold' } },
    { text: "connect", style: { fontFamily: "'Noto Sans JP', sans-serif" } },
    { text: "chat", style: { fontFamily: "'Bitcount Grid Single', monospace" } }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.heroText}>
            kaywa is not just another random<br />
            find people thing but more over<br />
            it is focused on making<br />
            friends and genuine<br />
            discussions.
          </p>
        </div>
        <div className={styles.heroCircle}>
          {/* Globe Image */}
          <img 
            src="/globe.png" 
            alt="Globe"
            className={styles.globeImage}
          />
          {/* Rotating Text */}
          <svg viewBox="0 0 200 200" className={styles.circleText}>
            <path
              id="circlePath"
              d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
              fill="none"
            />
            <text className={styles.curvedText}>
              <textPath href="#circlePath" startOffset="0%">
                i love kaywa its amazing platform wow
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      <div className={styles.brandSection}>
        <div className={styles.brandNames}>
          {brandVariants.map((brand, index) => (
            <React.Fragment key={index}>
              <span className={styles.brandName} style={brand.style}>
                {brand.text}
              </span>
              <span className={styles.brandDot}>.</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}></div>
            <p className={styles.featureText}>AI Powered<br />Monitoring</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}></div>
            <p className={styles.featureText}>Smart Matching<br />Algorithm</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}></div>
            <p className={styles.featureText}>Safe & Secure<br />Environment</p>
          </div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>FAQs</h2>
        <div className={styles.faqContainer}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div
                className={styles.faqQuestion}
                onClick={() => toggleFaq(index)}
              >
                <span>{faq.question}</span>
                <span className={`${styles.faqIcon} ${openFaq === index ? styles.faqIconOpen : ''}`}>
                  +
                </span>
              </div>
              {openFaq === index && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;