import { FC } from "react";
import BgImage from "@/components/bg-image/BgImage";
import styles from "./styles.module.scss";
import Square from "@/components/square/Square";

const Hero: FC = () => {
    return (
        <div id="hero">
            <BgImage src={"hero.jpg"} alt="BRU" />
            <div className={styles.main}>
                <h2 className={styles.title}>
                    {
                        "Кафедра Автоматизированные системы управления Белорусско-Российского университета"
                    }
                </h2>
                <Square
                    width={"988px"}
                    text="Мы предоставляем уникальную возможность организациям и компаниям найти талантливых студентов, готовых решать различные задачи в области автоматизации процессов. Присоединяйтесь к нашему сообществу и найдите идеальное решение для вашей компании вместе ​с нами!"
                />
            </div>
        </div>
    );
};

export default Hero;
