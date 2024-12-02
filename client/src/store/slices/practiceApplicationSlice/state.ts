type State = {
    practicies: Array<{
        id: string;
        variant: string;
        startDate: string;
        endDate: string;
    }>;
    isLoading: boolean;
    error: string;
};

export const initialState: State = {
    practicies: [],
    isLoading: false,
    error: "",
};
