import { ZodError } from 'zod';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorHandler = (error: unknown) => {
  if (error instanceof AppError) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: error.message,
        error,
      }),
      {
        status: error.statusCode,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  if (error instanceof ZodError) {
    return new Response(
      JSON.stringify({
        status: 'error',
        message: 'Bad Request',
        error: error.flatten(),
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return new Response(
    JSON.stringify({
      status: 'error',
      message: 'Internal Server Error',
      error,
    }),
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
