import React from "react";
import styles from "../cssmodule/footer.module.css";
import { FaInstagram, FaFacebookF, FaTiktok } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      {/* Top Section */}
      <div className={styles.topSection}>
        <ul className={styles.linksList}>
          <li className={styles.linkItem}>
            <a href="/about">About</a>
          </li>         
           <li className={styles.linkItem}>Terms and Conditions</li>
          <li className={styles.linkItem}>Privacy Policy</li>
          <li className={styles.linkItem}>Contact us</li>
        </ul>

        <div className={styles.socials}>
          <a href="#" aria-label="Tiktok" className={styles.icon}>
            <FaTiktok />
          </a>
          <a href="#" aria-label="Instagram" className={styles.icon}>
            <FaInstagram />
          </a>
          <a href="#" aria-label="Facebook" className={styles.icon}>
            <FaFacebookF />
          </a>

        </div>
      </div>

      {/* Middle Section */}
      <div className={styles.middleText}>
        <span>Blogs</span> | <span>Community guidelines</span> |{" "}
        <span>Cookie Policy</span> | <span>safty tips</span>
      </div>

      {/* Bottom Section */}
      <div className={styles.bottomText}>
        <p>
          By proceeding past this page you agree to our terms an conditions
        </p>
        <p>Kaywa a product of logizee solutions LLP</p>
        <p>@ ALL RIGHTS RESERVED 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
