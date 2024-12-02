import Layout from "@/components/layout/Layout";
import Image from "next/image";
import Hero from "./Hero/Hero";
import ProjectsBlock from "./ProjectsBlock/ProjectsBlock";
import PracticesBlock from "./PracticesBlock/PracticesBlock";

import styles from "./styles.module.scss";
import Head from "next/head";

const Home = () => {
    const images = require.context("../../../../public/partners", false);
    const imageKeys = images.keys();

    return (
        <>
            <Head>
                <title>Кафедра АСУ БРУ</title>
                <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0"
                />
                <meta
                    name="keywords"
                    content="практика, стажировка, студенты, проекты, заказать"
                />
                <meta name="description" content="" key="desc" />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="content-language" content="ru" />
            </Head>
            <Layout>
                <Hero />
                <ProjectsBlock />
                <PracticesBlock />
                <div className={styles.partners}>
                    <span className={styles.partnersTitle}>Наши партнёры</span>
                    <div>
                        {imageKeys.map((key) => (
                            <Image
                                className={styles.partnerIcon}
                                key={key}
                                src={images(key).default}
                                alt={key}
                                width={90}
                                height={40}
                            />
                        ))}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Home;
