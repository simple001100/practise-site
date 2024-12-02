import { FC } from "react";

import styles from "./styles.module.scss";
import classNames from "classnames";

const Field = ({ label, error, ...props }: any) => {
    return (
        <div className={styles.field}>
            {label && <label>{label}</label>}
            <input className={styles.button} {...props} />
        </div>
    );
};

export default Field;
