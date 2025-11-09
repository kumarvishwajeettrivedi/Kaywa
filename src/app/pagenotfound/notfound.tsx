import React from "react";
import Image from "next/image";
import styles from "../cssmodule/pagenotfound.module.css";
import Link from "next/link";

const PageNotFound: React.FC = () => {
  return (
    <div className={styles.pageNotFound}>
      <div className={styles.imageContainer}>
        <Image
          src="/pagenotfound.png"
          alt="404 Page Not Found"
          className={styles.image}
          priority
          width={500}
          height={350}
        />
      </div>

      <h1 className={styles.title}>Oops! Page Not Found</h1>
      <p className={styles.message}>
        The page you’re looking for might have been removed or is temporarily unavailable.
      </p>

      <Link href="/" className={styles.homeButton}>
        Go Back
      </Link>
    </div>
  );
};

export default PageNotFound;
