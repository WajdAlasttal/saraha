import { Router } from "express";
import * as messageController from './controller/Message.controller.js';
import { auth } from "../../../Middleware/auth.middleware.js";

const router = Router();
router.post('/:receiver_id',messageController.sendMessage);
router.get('/',auth,messageController.getMessage);
router.delete('/:messageId',auth,messageController.deleteMessage);
export default router;