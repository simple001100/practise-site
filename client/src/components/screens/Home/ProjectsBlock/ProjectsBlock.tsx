import { FC, useState } from "react";
import BgImage from "@/components/bg-image/BgImage";
import Image from "next/image";
import styles from "./styles.module.scss";
import Square from "@/components/square/Square";
import Button from "@/components/button/Button";
import { useRouter } from "next/router";
import ProjectApplicationPopup from "@/components/ProjectApplicationPopup/ProjectApplicationPopup";
import { useAppSelector } from "@/hooks/redux";

const ProjectsBlock: FC = () => {
    const router = useRouter();
    const isAuth = useAppSelector((state) => state.authReducer.isAuth);

    const [isProjectPopupOpen, setisProjectPopupOpen] = useState(false);

    const moveToProjects = (e: any) => {
        e.preventDefault();
        router.push("/projects");
    };

    const openPopup = () => {
        if (!isAuth) router.push("/auth/signin");
        else setisProjectPopupOpen(true);
    };

    return (
        <div id="projects">
            <BgImage src={"projects-bg.jpeg"} alt="BRU" />
            <div className={styles.main}>
                <div className={styles.row}>
                    <Image
                        width={199}
                        height={198}
                        src={"/project-icon.png"}
                        alt={"project-icon"}
                    />
                    <div className={styles.infoContainer}>
                        <Square
                            textAlign="start"
                            text="​Вы можете ознакомиться с  инновационными проектами, выполненными нашими студентами. Эти проекты являются результатом их усердной работы, творческого подхода и стремления к достижению высоких результатов."
                            width="684px"
                        />
                        <Button
                            style={styles.button}
                            onClick={moveToProjects}
                            text="Готовые проекты"
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <div className={styles.infoContainer}>
                        <Square
                            textAlign="start"
                            text="У вас есть возможность заказать проект, который будет выполнятся нашими студентами и курироваться преподавателями нашей кафедры. Мы имеем богатый опыт в разработке IT-проектов в различных областях, и мы готовы воплотить в жизнь ваши идеи."
                            width="684px"
                        />
                        <Button
                            style={styles.button}
                            onClick={() => openPopup()}
                            text="Заказать проект"
                        />
                        <ProjectApplicationPopup
                            isOpen={isProjectPopupOpen}
                            setIsOpen={setisProjectPopupOpen}
                        />
                    </div>
                    <Image
                        width={229}
                        height={228}
                        src={"/idea-icon.png"}
                        alt={"project-icon"}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProjectsBlock;
