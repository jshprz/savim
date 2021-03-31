
/**
 * @swagger
 * definitions:
 *   ApiResponse:
 *     type: object
 *     required:
 *       - success
 
*     properties:
*       success:
*         type: 'boolean'
*       message:
*         type: 'string'  
*/

/**
 * @swagger
 * definitions:
 *   LoginResponse:
 *     type: object
 *     required:
 *       - success
 
*     properties:
*       success:
*         type: boolean
*       message:
*         type: string  
*       token:
*         type: string
*       expiresIn:
*         type: number 
*/

/**
 * @swagger
 * definitions:
 *   SignupResponse:
 *     type: object
 *     required:
 *       - success
 
*     properties:
*       success:
*         type: boolean
*       message:
*         type: string  
*       user:
*         type: object
*/



/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User Authentication Endpoints
 *   - name: API
 *     description: API Endpoints
 */
const myRoutes = router => {
    
};

export default myRoutes;
