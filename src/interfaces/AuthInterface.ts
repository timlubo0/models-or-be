export interface LoginScreenState{
    phone: string;
    password?: string;
    isLoading: boolean;
    errorMessage: string;
    isConfirmDialogVisible: boolean;
    isShow?: boolean;
}

export interface OTPScreenState{
    otpCode: string;
    isLoading: boolean;
    isResendLoading: boolean;
    isShow: boolean;
    errorMessage: string;
    isResendDisabled: boolean;
}

export interface RegisterScreenState{
    phone: string;
    username: string;
    email: string;
    isLoading: boolean;
    isShow?: boolean;
    errorMessage?: string;
}

export interface OTPVerificationScreenProps{
    route: { params: { 
        phone: string;
        newPhone?: string; 
    } };
}

export interface ErrorState{
    errors?: Array<{
        args?: any; 
        filed?: string; 
        message?: string; 
        rule?: string;
        code?: string;
        errno?: string;
        sql?: string;
        sqlMessage?: string;
        sqlState?: string;
        guard?: string;
        responseText?: string;
    }>;
}