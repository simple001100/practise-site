import Layout from "@/components/layout/Layout";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getProjects } from "@/store/slices/projectsSlice/projectsSlice";
import { FC, useEffect, useState } from "react";

import styles from "./styles.module.scss";
import Card from "./Card/Card";
import Button from "@/components/button/Button";
import ProjectApplicationPopup from "@/components/ProjectApplicationPopup/ProjectApplicationPopup";
import { useRouter } from "next/router";
import Head from "next/head";

const Projects: FC = () => {
    const projects = useAppSelector((state) => state.projectsReducer.projects);
    const router = useRouter();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getProjects());
    }, []);

    const isAuth = useAppSelector((state) => state.authReducer.isAuth);

    const [isProjectPopupOpen, setisProjectPopupOpen] = useState(false);

    const openPopup = () => {
        if (!isAuth) router.push("/auth/signin");
        else setisProjectPopupOpen(true);
    };

    return (
        <>
            <Head>
                <title>Инновационные проекты</title>
                <meta http-equiv="X-UA-Compatible" content="IE-edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0"
                />
                <meta
                    name="keywords"
                    content="проект, заказать, инновационный"
                />
                <meta
                    name="description"
                    content="Изучите наши инновационные проекты в сфере разработки программного обеспечения, мобильных приложений и технологических решений. Узнайте о наших уникальных подходах, передовых технологиях и успешных реализованных проектах. Мы предлагаем комплексные решения, от идеи до воплощения, чтобы помочь вашей компании достичь новых высот."
                    key="desc"
                />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="content-language" content="ru" />
            </Head>
            <Layout>
                <div className={styles.wrapper}>
                    {projects.map(({ id, name, photo, description, link }) => (
                        <Card
                            key={id}
                            name={name}
                            photo={photo}
                            description={description}
                            link={link}
                        />
                    ))}
                    <Button
                        text="Заказать проект"
                        style={styles.applicationButton}
                        onClick={() => openPopup()}
                    />
                    <ProjectApplicationPopup
                        isOpen={isProjectPopupOpen}
                        setIsOpen={setisProjectPopupOpen}
                    />
                </div>
            </Layout>
        </>
    );
};

export default Projects;
