const express = require("express");
const validate = require("express-validation");
const controller = require("../controllers/branch.controller");
const {
  authorize,
  ADMIN,
  SUPERADMIN,
  LOGGED_USER,
} = require("../middlewares/auth");
const {
  listBranchs,
  createBranch,
  replaceBranch,
  updateBranch,
} = require("../validations/branch.validation");

const router = express.Router();

/**
 * Load branch when API with branchId route parameter is hit
 */
router.param("branchId", controller.load);

router
  .route("/")
  /**
   * @api {get} branchs List Branchs
   * @apiDescription Get a list of branchs
   * @apiVersion 1.0.0
   * @apiName ListBranchs
   * @apiGroup Branch
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Branch's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Branchs per page
   * @apiParam  {String}             [name]       Branch's name
   * @apiParam  {String}             [email]      Branch's email
   * @apiParam  {String=user,admin}  [role]       Branch's role
   *
   * @apiSuccess {Object[]} branchs List of branchs.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated branchs can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(/*authorize(LOGGED_USER),*/ validate(listBranchs), controller.list)
  /**
   * @api {post} branchs Create Branch
   * @apiDescription Create a new branch
   * @apiVersion 1.0.0
   * @apiName CreateBranch
   * @apiGroup Branch
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Branch's access token
   *
   * @apiParam  {String}             email     Branch's email
   * @apiParam  {String{6..128}}     password  Branch's password
   * @apiParam  {String{..128}}      [name]    Branch's name
   * @apiParam  {String=branch,admin}  [role]    Branch's role
   *
   * @apiSuccess (Created 201) {String}  id         Branch's id
   * @apiSuccess (Created 201) {String}  name       Branch's name
   * @apiSuccess (Created 201) {String}  email      Branch's email
   * @apiSuccess (Created 201) {String}  role       Branch's role
   * @apiSuccess (Created 201) {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated branchs can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createBranch), controller.create);

router
  .route("/:branchId")
  /**
   * @api {get} branchs/:id Get Branch
   * @apiDescription Get branch information
   * @apiVersion 1.0.0
   * @apiName GetBranch
   * @apiGroup Branch
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Branch's access token
   *
   * @apiSuccess {String}  id         Branch's id
   * @apiSuccess {String}  name       Branch's name
   * @apiSuccess {String}  email      Branch's email
   * @apiSuccess {String}  role       Branch's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated branchs can access the data
   * @apiError (Forbidden 403)    Forbidden    Only branch with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     Branch does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {put} branchs/:id Replace Branch
   * @apiDescription Replace the whole branch document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceBranch
   * @apiGroup Branch
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   Branch's access token
   *
   * @apiParam  {String=branch,admin}  [role]    Branch's role
   * (You must be an admin to change the branch's role)
   *
   * @apiSuccess {String}  id         Branch's id
   * @apiSuccess {String}  name       Branch's name
   * @apiSuccess {String}  email      Branch's email
   * @apiSuccess {String}  role       Branch's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated branchs can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only branch with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Branch does not exist
   */
  //   .put(authorize(LOGGED_USER), validate(replaceBranch), controller.replace)
  /**
   * @api {patch} branchs/:id Update Branch
   * @apiDescription Update some fields of a branch document
   * @apiVersion 1.0.0
   * @apiName UpdateBranch
   * @apiGroup Branch
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Branch's access token
   *
   * @apiParam  {String}             email     Branch's email
   * @apiParam  {String{6..128}}     password  Branch's password
   * @apiParam  {String{..128}}      [name]    Branch's name
   * @apiParam  {String=branch,admin}  [role]    Branch's role
   * (You must be an admin to change the branch's role)
   *
   * @apiSuccess {String}  id         Branch's id
   * @apiSuccess {String}  name       Branch's name
   * @apiSuccess {String}  email      Branch's email
   * @apiSuccess {String}  role       Branch's role
   * @apiSuccess {Date}    createdAt  Timestamp
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated branchs can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only branch with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Branch does not exist
   */
  .patch(authorize(ADMIN), validate(updateBranch), controller.update)
  /**
   * @api {patch} branchs/:id Delete Branch
   * @apiDescription Delete a branch
   * @apiVersion 1.0.0
   * @apiName DeleteBranch
   * @apiGroup Branch
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   Branch's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated branchs can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only branch with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Branch does not exist
   */
  .delete(authorize(ADMIN), controller.remove);

module.exports = router;
