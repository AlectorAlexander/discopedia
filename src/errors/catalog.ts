export enum ErrorTypes {
    EntityNotFound = 'EntityNotFound',
    InvalidMongoId = 'InvalidMongoId',
    uAlreadyHaveIt = 'uAlreadyHaveIt',
  }
  
  type ErrorResponseObject = { 
    message: string;
    httpStatus: number
  };
    
export type ErrorCatalog = {
    [key in ErrorTypes]: ErrorResponseObject
    
  };
    
export const errorCatalog: ErrorCatalog = {
    EntityNotFound: {
        message: 'Object not found',
        httpStatus: 404,
    },
    InvalidMongoId: {
        message: 'Id must have 24 hexadecimal characters',
        httpStatus: 400,
    },
    uAlreadyHaveIt: {
        message: 'You already have this disc',
        httpStatus: 409,
    },
};