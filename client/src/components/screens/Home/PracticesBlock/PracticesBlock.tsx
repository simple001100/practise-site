import { FC } from "react";
import BgImage from "@/components/bg-image/BgImage";
import styles from "./styles.module.scss";
import Square from "@/components/square/Square";
import Button from "@/components/button/Button";
import { useRouter } from "next/router";

const PracticesBlock: FC = () => {
    const router = useRouter();

    const moveToPractices = (e: any) => {
        e.preventDefault();
        router.push("/practices");
    };
    return (
        <div id="practices">
            <BgImage src={"practice-bg.jpg"} alt="BRU" />
            <div className={styles.main}>
                <Square
                    width="740px"
                    text="Мы рады предложить вам возможность пригласить студентов на практику в вашу компанию. Наша практическая программа представляет собой отличную возможность для студентов развивать свои навыки, получить ценный опыт работы и применить свои знания в реальной бизнес-среде."
                />
                <Button
                    style={styles.button}
                    onClick={moveToPractices}
                    text="Подробнее"
                />
            </div>
        </div>
    );
};

export default PracticesBlock;
