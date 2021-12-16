import { Request, Response } from 'express';

class UserController {
  async create(req: Request, res: Response) {
    console.log(req.auth);
    res.json({ success: true });
  }
}

export default new UserController();
