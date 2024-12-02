import { FC } from "react";
import Image from "next/image";
import { CLIENT_URL } from "@/consts";
import styles from "./styles.module.scss";

const BgImage: FC<{ src: string; alt: string }> = ({ src, alt }) => {
    return (
        <div className={styles.wrapper}>
            <Image
                className={styles.img}
                src={`${CLIENT_URL}/${src}`}
                alt={alt}
                fill
            />
        </div>
    );
};

export default BgImage;
