export type errorService = {
    message: string,
    status: number
  }
  
export type ErrorService = {
    error: errorService,
  }

export enum ErrorTypes {
    EntityNotFound = 'EntityNotFound',
    InvalidMongoId = 'InvalidMongoId',
  }