import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { signUp, verify, signIn, signOut } from "../controllers/Student.js";

const router = express.Router();

router.route("/signUp").post(signUp);
router.route("/verify").post(isAuthenticated,verify);
router.route("/signIn").post(signIn);
router.route("/signOut").get(signOut);
// router.route("/newTask").post(isAuthenticated,a,ddtask);
// router.route("/task/:taskId")
// .delete(isAuthenticated,removeTask)
// .put(isAuthenticated,updateTask);

// router.route("/me").get(isAuthenticated,getMyProfile);
// router.route("/updateProfile").put(isAuthenticated,updateProfile);
// router.route("/updatePassword").put(isAuthenticated,updatePassword);
// router.route("/forgetPassword").post(forgetPassword);
// router.route("/resetPassword").put(resetPassword);

export default router;