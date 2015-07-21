/**
* Jobs.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  connection: 'myMysqlServer',
  attributes: {
  	profile: {
  		type: "string",
  		required: true
  	},
  	description: {
  		type: 'string',
  		required: true
  	},
  	salary: {
  		type: 'integer'
  	},
  	location: {
  		type: 'string'
  	}
  }
};

