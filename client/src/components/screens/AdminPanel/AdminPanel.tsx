import Layout from "@/components/layout/Layout";
import styles from "./styles.module.scss";
import withAuth from "@/components/wrappers/wrapped-component";
import Field from "@/components/Field/Field";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
    addEmail,
    getEmails,
    makeDistribution,
    removeEmail,
} from "@/store/slices/adminSlice/adminSlice";
import * as yup from "yup";
import Button from "@/components/button/Button";
import withAdmin from "@/components/wrappers/wrapped-admin-component";
import { useEffect } from "react";
import Head from "next/head";

const schema = yup.object().shape({
    email: yup
        .string()
        .email("Неверный формат")
        .required("Поле не должно быть пустым"),
});

const AdminPanel = () => {
    const emails = useAppSelector((state) => state.adminReducer.emails);

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const dispatch = useAppDispatch();

    const onSubmit = (data: any) => {
        dispatch(addEmail(data));
    };

    const onDistribution = () => {
        dispatch(makeDistribution());
    };

    const onRemove = (id: number) => {
        dispatch(removeEmail({ id }));
    };

    useEffect(() => {
        dispatch(getEmails());
    }, []);

    return (
        <>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <Layout>
                <div className={styles.wrapper}>
                    <h2>Панель администратора</h2>
                    <div className={styles.panel}>
                        <form
                            className={styles.form}
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <h2>Добавить Почту</h2>
                            <div className={styles.field}>
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <>
                                            <Field
                                                type="email"
                                                id="email"
                                                placeholder="Email"
                                                onChange={onChange}
                                                value={value}
                                            />
                                            {errors.email && (
                                                <span className={styles.error}>
                                                    {errors.email.message?.toString()}
                                                </span>
                                            )}
                                        </>
                                    )}
                                />
                            </div>

                            <Button text="Добавить" type="submit" />
                        </form>
                        <div className={styles.form}>
                            <h2>Провести рассылку</h2>

                            <Button text="Разослать" onClick={onDistribution} />
                        </div>
                    </div>
                    <div className={styles.emailsContainer}>
                        {!!emails?.length &&
                            emails.map(({ id, email }) => (
                                <div key={id} className={styles.email}>
                                    {email}{" "}
                                    <button onClick={() => onRemove(id)}>
                                        удалить
                                    </button>
                                </div>
                            ))}
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default withAdmin(AdminPanel);
