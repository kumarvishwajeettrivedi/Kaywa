
import styles from "../cssmodule/Homepage.module.css";
import Button1 from "./allbuttons";
import CategoryGridProps from "./component-grid";
import PageNotFound from "../pagenotfound/page";
import Link from "next/link"; // kept for future use

export default function BackgroundFront() {
    return (
        <>
        

            <div className={styles.textContainer}>
                <p>
                    Meet . Chat . Connect
                </p>
                <p>
                    Talk to people worldwide based on your interests.
                </p>
                <CategoryGridProps />
            </div>

            <div className={styles.buttonWrapper}>
                <Link href="/startchatingnow" passHref>
                    <Button1 label="Start Chatting Now" />
                </Link>
            </div>


            <div className={styles.cornerStrip}>
                <div className={styles.stripImage}></div>
            </div>

            <div className={styles.cornerStrip}>
                <div className={styles.stripImage}></div>
            </div>
       
        </>
    );
}
