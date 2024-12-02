type State = {
    role: string;
    isAuth: boolean;
    id: number;
    name: string;
    responsiblePerson: string;
    phone: string;
    email: string;
    address: string;
};

export const initialState: State = {
    role: "",
    isAuth: true,
    id: 0,
    name: "",
    responsiblePerson: "",
    phone: "",
    email: "",
    address: "",
};
