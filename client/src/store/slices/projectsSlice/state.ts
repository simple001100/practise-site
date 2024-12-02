type State = {
    projects: Array<{
        id: number;
        name: string;
        photo: string;
        description: string;
        link: string;
    }>;
    isLoading: boolean;
    error: string;
};

export const initialState: State = {
    projects: [],
    isLoading: false,
    error: "",
};
