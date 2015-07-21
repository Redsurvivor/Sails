/**
* Seeker.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    connection: 'myMysqlServer',
  	attributes: {
  		name: {
  			type: "string",
  			required: true
  		},
      address: {
        type: "string",
        required: true
      },
      email: {
        type: "email",
        required: true
      },
      qualification: {
        type: "string",
        required: true
      },
      expSalary: {
        type: "INTEGER"
      },
  		experience: {
  			type: "INTEGER",
  			required: true
  		}


  	}
};

