type State = {
    emails: Array<{ id: number; email: string }>;
};

export const initialState: State = {
    emails: [],
};
