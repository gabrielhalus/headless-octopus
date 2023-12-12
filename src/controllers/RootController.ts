import { Request, Response } from "express";

class RootController {
  getRootLinks(req: Request, res: Response) {
    return res.json({
      links: [
        { rel: "users", href: "/users" },
        { rel: "projects", href: "/projects" },
        { rel: "schemas", href: "/schemas" },
        { rel: "documents", href: "/documents" },
      ],
    });
  }
}

export default new RootController();
