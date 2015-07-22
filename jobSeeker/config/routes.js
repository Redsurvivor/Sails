/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  // *  GET /boat -> BoatController.find - List of all
  // *  GET /boat/:id -> BoatController.findOne - Details of one
  // *  POST /boat -> BoatController.create - Create new - Returns new boat
  // *  PUT /boat/:id -> BoatController.update - Update - return updated boat
  // *  DELETE /boat/:id -> BoatController.destroy - returns deleted boat
 // GET /boat/new -> BoatController.new - Create form
 // GET /boat/:id/edit -> BoatController.edit - Edit form

  //JOB SEEKER MODEL
  'GET /seeker': 'SeekerController.index',    //list all
  'POST /seeker': 'SeekerController.create',  //creates and returns new boat
  'PUT /seeker/:id': 'SeekerController.update', // returns updates boat
  'DELETE /seeker/:id': 'SeekerController.delete',  //returns deleted boat
  'GET /seeker/new': 'SeekerController.new', // form for create
  'GET /seeker/:id/edit': 'SeekerController.edit', //form for update boat
  'GET /seeker/:id/apply': 'SeekerController.showApply',
  'PUT /seeker/:seekerId/apply/:jobId': 'SeekerController.apply',

  //JOBS MODEL
  'GET /jobs': 'JobsController.index',  // list all
  'POST /jobs': 'JobsController.create', //create and returns new boat
  'PUT /jobs/:id': 'JobsController.update', //returns updated boat
  'DELETE /jobs/:id': 'JobsController.delete', //returns deleted boat
  'GET /jobs/new': 'JobsController.new', //form for create boat
  'GET /jobs/:id/edit': 'JobsController.edit' //form for update boat
  

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
