import { userIsAdmin } from "../prisma_queries/update.js";

export async function userBecomeAdmin(req, res) {
  await userIsAdmin(req.user.id);
  res.redirect("/");
}
