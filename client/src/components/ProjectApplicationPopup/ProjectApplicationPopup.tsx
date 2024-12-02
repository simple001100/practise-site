import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { createProjectApplication } from "@/store/slices/projectApplicationSlice/projectApplicationSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import * as yup from "yup";
import styles from "./styles.module.scss";
import Button from "../button/Button";
import Field from "../Field/Field";

const schema = yup.object().shape({
    name: yup.string().required("Поле не должно быть пустым"),
    description: yup
        .string()
        .min(20, "Введите не менее 20 символов")
        .required("Поле не должно быть пустым"),
    endDate: yup.string().required("Поле не должно быть пустым"),
});

const ProjectApplicationPopup: FC<{
    isOpen: boolean;
    setIsOpen: (state: boolean) => void;
}> = ({ isOpen, setIsOpen }) => {
    const dispatch = useAppDispatch();
    const companyId = useAppSelector((state) => state.authReducer.id);

    const {
        reset,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = (data: any) => {
        dispatch(createProjectApplication({ companyId, ...data }));
        setIsOpen(false);
    };

    return (
        <Modal
            className={styles.wrapper}
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
        >
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2>Заказать проект</h2>
                <div
                    onClick={() => {
                        setIsOpen(false);
                        reset();
                    }}
                    className={styles.closeModal}
                ></div>
                <div className={styles.field}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Field
                                    type="text"
                                    id="name"
                                    placeholder="Название проекта"
                                    onChange={onChange}
                                    value={value}
                                />
                                {errors.name && (
                                    <span className={styles.error}>
                                        {errors.name.message?.toString()}
                                    </span>
                                )}
                            </>
                        )}
                    />
                </div>

                <div className={styles.field}>
                    <Controller
                        name="endDate"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Field
                                    type="date"
                                    id="endDate"
                                    label="К какому сроку сделать проект?"
                                    placeholder="К какому сроку сделать проект"
                                    onChange={onChange}
                                    value={value}
                                />
                                {errors.endDate && (
                                    <span className={styles.error}>
                                        {errors.endDate.message?.toString()}
                                    </span>
                                )}
                            </>
                        )}
                    />
                </div>

                <div className={styles.field}>
                    <Controller
                        name="description"
                        control={control}
                        defaultValue=""
                        render={({ field: { onChange, value } }) => (
                            <>
                                <textarea
                                    id="description"
                                    placeholder="Описание"
                                    onChange={onChange}
                                    rows={8}
                                    cols={43}
                                    value={value}
                                />
                                {errors.description && (
                                    <span className={styles.error}>
                                        {errors.description.message?.toString()}
                                    </span>
                                )}
                            </>
                        )}
                    />
                </div>

                <Button text="Отправить" type="submit" />
            </form>
        </Modal>
    );
};
export default ProjectApplicationPopup;
