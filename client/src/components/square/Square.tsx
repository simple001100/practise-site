import { FC } from "react";
import styles from "./styles.module.scss";

const Square: FC<{
    text: string;
    width: string;
    textAlign?: "center" | "start" | "end";
}> = ({ text, width, textAlign = "center" }) => {
    return (
        <div className={styles.wrapper} style={{ maxWidth: width, textAlign }}>
            <span className={styles.text}>{text}</span>
        </div>
    );
};

export default Square;
