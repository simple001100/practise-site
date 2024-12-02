import Layout from "@/components/layout/Layout";
import { FC, useEffect } from "react";

import styles from "./styles.module.scss";
import withAuth from "@/components/wrappers/wrapped-component";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Controller, useForm } from "react-hook-form";
import Field from "@/components/Field/Field";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    createPracticeApplication,
    getPracticiesTypes,
} from "@/store/slices/practiceApplicationSlice/practiceApplicationSlice";
import Button from "@/components/button/Button";
import { refresh } from "@/store/slices/authSlice/authSlice";
import Head from "next/head";

const schema = yup.object().shape({
    count: yup.number().required("Укажите количество"),
    practiceId: yup.number().required("Укажите вид практики"),
});

const Practices: FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const practicies = useAppSelector(
        (state) => state.practiceApplicationReducer.practicies
    );
    const companyId = useAppSelector((state) => state.authReducer.id);

    const onSubmit = (data: any) => {
        dispatch(createPracticeApplication({ companyId, ...data }));
    };

    useEffect(() => {
        dispatch(getPracticiesTypes());
    }, []);

    return (
        <>
            <Head>
                <title>Приглашение на практику</title>
                <meta http-equiv="X-UA-Compatible" content="IE-edge" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1.0"
                />
                <meta
                    name="keywords"
                    content="практика, пригласить"
                />
                <meta name="description" content="" key="desc" />
                <meta name="robots" content="index, follow" />
                <meta http-equiv="content-language" content="ru" />
            </Head>
            <Layout>
                <div className={styles.wrapper}>
                    <h2>Практика</h2>
                    <div className={styles.infoContainer}>
                        <span>
                            В нашем ВУЗе осуществляется подготовка студентов
                            направления «Автоматизированные системы обработки
                            информации», которое ориентировано на подготовку
                            IT-специалистов в области программирования,
                            системного администрирования, баз данных,
                            интернет-технологий и других смежных областей. Наша
                            программа обучения нацелена на практическое
                            применение знаний и навыков в реальной жизни. Мы
                            уделяем особое внимание практико-ориентированному
                            обучению, включая решение реальных задач и участие в
                            проектах.
                        </span>
                        <span>
                            Приглашение студентов на практику является выгодным
                            для организаций во многих аспектах: Студенты,
                            которые проходят практику на предприятиях, могут
                            принести значительную пользу компании. Они могут
                            помочь в решении конкретных задач и проектов,
                            которые стоят перед компанией. Это может помочь
                            компании сократить время на выполнение проектов и
                            снизить затраты на работу персонала.
                        </span>
                        <span>
                            За время обучения студенты нашей специальности
                            проходят три практики.
                        </span>
                        <span>
                            1. Ознакомительная практика проводится по окончании
                            первого курса, летом. Ее цель заключается в том,
                            чтобы дать возможность студентам получить
                            первоначальный опыт работы в области информационных
                            технологий и ознакомиться с реальной работой в этой
                            сфере. Длится она две недели и проходит, в основном,
                            на базе кафедры.{" "}
                        </span>
                        <span>
                            2. Технологическая практика проводится по окончании
                            третьего курса, так же летом. К этому времени
                            студенты уже обладают достаточным багажом знаний и
                            уже пытаются определиться с тем направление, в
                            котором, они могли и хотели бы развиваться. В этом
                            им помогает прохождение практики в организациях.
                            Когда не в теории, а на практике студенты могут
                            попробовать себя в конкретной деятельности,
                            прочувствовать ее плюсы и минусы, обсудить и
                            поделиться приобретенным опытом с друзьями. Чем
                            раньше будет сделан выбор, тем раньше студенты
                            начнут углубленное изучение необходимых им языков
                            или систем программирования. Это наилучший момент
                            пригласить студентов к себе на практику, чтобы они
                            могли успеть ознакомиться с предприятием, с
                            необходимыми технологиями для работы и начать
                            выполнение проекта, который может быть полезным для
                            организации.
                        </span>
                        <span>
                            3. Если проект достаточно большой и трудный, можно
                            пригласить несколько студентов на практику, и они
                            могут продолжить работу над проектом уже на
                            преддипломной практике и в качестве дипломного
                            проекта. Длится эта практика четыре недели и
                            проходит, в основном, на предприятиях и в компаниях.
                            Преддипломная практика проходит на четвертом курсе,
                            весной. Длится эта практика четыре недели и
                            направлена на работу над реальными проектами для
                            конкретных организаций.
                        </span>
                        <span>
                            Если вы хотите пригласить студентов к себе на
                            практику, заполните, пожалуйста, форму и мы с вами
                            созвонимся.
                        </span>
                    </div>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h2>Приглашение</h2>
                        <div className={styles.field}>
                            <Controller
                                name="practiceId"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <select
                                            id="practiceId"
                                            placeholder="Вид практики"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            <option value="" disabled>
                                                Вид практики
                                            </option>
                                            {practicies.map((el) => (
                                                <option value={el.id}>
                                                    {el.variant}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.practiceId && (
                                            <span className={styles.error}>
                                                {errors.practiceId.message?.toString()}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        <div className={styles.field}>
                            <Controller
                                name="count"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <Field
                                            type="number"
                                            id="count"
                                            placeholder="Количество студентов"
                                            onChange={onChange}
                                            value={value}
                                            min={1}
                                        />
                                        {errors.count && (
                                            <span className={styles.error}>
                                                {errors.count.message?.toString()}
                                            </span>
                                        )}
                                    </>
                                )}
                            />
                        </div>

                        <Button text="Отправить" type="submit" />
                    </form>
                </div>
            </Layout>
        </>
    );
};

export default withAuth(Practices);
