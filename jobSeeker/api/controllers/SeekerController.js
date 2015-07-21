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
					return res.serverError();
			}
			else{
				sails.log("success");
				res.redirect('/');	
			}
		});
	},
	listAll: function(req, res){
		Seeker.find().exec(function(err, seekers){
			if(err){
				sails.log("Error2");
				return res.serverError(err);
			}
			else{
				sails.log("Success2");
				return res.view('jobSeeker/listSeeker', {allSeeker: seekers});
			}
		});
	},
	delete: function(req, res){
		var sid = req.params.id; 
		//ails.log("DELETE   ****"+sid);
		Seeker.destroy({id:sid}).exec(function(err){
			if(err){
				return res.serverError();
			}
			else{
				return res.ok("Success");
			}
		});
	},
	updateRedirect: function(req, res){
		var sid = req.params.id;
		sails.log("redirect");
		res.view('jobSeeker/updateForm', {seekerId: sid});
	},
	update: function(req, res){
		sails.log("Inside update");
		var sid = req.params.id;
		var name = req.body.name;
		var addr = req.body.address;
		var email = req.body.email;
		var qualif = req.body.qualification;
		var salary = req.body.expSalary; 
		var exp = req.body.experience;
		//sails.log("*****"+name + addr + email + qualif + salary + exp+"*********");
		Seeker.update({id: sid}, {name: name, address: addr, email: email, qualification: qualif, expSalary: salary, experience: exp}).exec(function (err, updated){
			if(err){
				return res.serverError();
			}
			else{
				return res.ok("Success");
			}
		})
	}
};

