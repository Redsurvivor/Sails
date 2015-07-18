/**
 * SeekerController
 *
 * @description :: Server-side logic for managing seekers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	signup: function(req, res){
		res.view('jobSeeker/signup');
	},
	create: function(req, res){
		//sails.log("Error1");
		Seeker.create({
			name: req.body.sname,
			address: req.body.address,
			email: req.body.email,
			qualification: req.body.qualif,
			expSalary: req.body.sal,
			experience: req.body.exp
		}).exec(function(err, created){
			if(err){
					sails.log("Error");
			}
			else{
				sails.log("success");
				res.redirect('/');	
			}
		});

	}
};

