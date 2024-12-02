import { FC } from "react";
import styles from "./styles.module.scss";
import Button from "@/components/button/Button";

const Card: FC<{
    name: string;
    photo: string;
    description: string;
    link: string;
}> = ({ name, photo, description, link }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <img className={styles.photo} src={photo} alt={name} />
                <div className={styles.text}>
                    <h3 className={styles.name}>{name}</h3>
                    <span className={styles.description}>{description}</span>
                </div>
                <a
                    target="_blank"
                    href={link}
                    rel="noopener noreferrer"
                    className={styles.button}
                >
                    Подробнее
                </a>
            </div>
        </div>
    );
};

export default Card;
