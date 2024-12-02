import { FC } from "react";

import styles from "./styles.module.scss";
import classNames from "classnames";

const Button = ({ onClick, text, style, type, ...props }: any) => {
    return (
        <button
            className={classNames([styles.button, style])}
            onClick={onClick}
            type={type}
            {...props}
        >
            {text}
        </button>
    );
};

export default Button;
