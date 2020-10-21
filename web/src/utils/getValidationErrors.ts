import { ValidationError } from 'yup';

interface IResponse{
    [key: string]: string;
}

export default function getValidationErrors(err: ValidationError): IResponse{
    const validationsErrors: IResponse = {};
    err.inner.forEach(error => {
        validationsErrors[error.path] = error.message;
    });

    return validationsErrors;
}