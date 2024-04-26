export type SignupResponseType = {
    accessToken: string;
    refreshToken: string;
    customer: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        phone: string;
        birthday: string;
        accountSetUp: boolean;
        alcohol: boolean | null;
        chronic: boolean | null;
        diabetes: boolean | null;
        highBloodPressure: boolean | null;
        highCholesterol: boolean | null;
        overweight: boolean | null;
        smoker: boolean | null;
    };
};
