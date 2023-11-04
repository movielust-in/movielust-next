import dbConnect from '../../lib/databse';

import { errorHandler } from './errorsHandler';
// import { INTERNAL_SERVER_ERROR } from './errors';

interface API_HANDLER_OPTIONS {
  db?: boolean;
}

export const catchAsync =
  (handler: (req?: Request) => Promise<Response>, opts?: API_HANDLER_OPTIONS) =>
  async (req: Request) => {
    try {
      if (opts?.db) {
        await dbConnect();
      }

      return await handler(req);
    } catch (error) {
      return errorHandler(error);
    }
  };
