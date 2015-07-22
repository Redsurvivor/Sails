/**
 * JobsController
 *
 * @description :: Server-side logic for managing jobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: function(req, res){
		res.view();
	},
	create: function(req, res){
		//sails.log("inside create job");
		Jobs.create({
			profile: req.body.jProfile,
			description: req.body.desc,
			salary: req.body.sal,
			location: req.body.loc
		}).exec(function (err, created){
			if(err){
				return res.serverError();
			}
			else{
				return res.redirect("/");
			}
		});
	},
	index: function(req, res){
		//sails.log("inside list jobs");
		Jobs.find().exec(function (err, listed){
			if(err){
				return res.serverError();
			}
			else{
				return res.view({allJobs: listed});
			}
		});
	},
	delete: function(req, res){
		//sails.log("inside delete jobs");
		Jobs.destroy({id: req.params.id}).exec(function (err){
			if(err){
				return res.serverError();
			}
			else{
				return res.ok("Success");
			}
		});
	},
	edit: function(req, res){
		//sails.log("inside update redirect");
		var jID = req.params.id;
		Jobs.find({id: jID}).exec(function (err, found){
			if(err){
				return res.serverError();
			}
			else{
				//sails.log("profile of found id "+ found[0].profile);
				return res.view({updateJob: found[0]});
			}
		});
	},
	update: function(req, res){
		//sails.log("inside job update");
		var jid = req.params.id;
		var profile = req.body.profile;
		var desc = req.body.description;
		var sal = req.body.salary;
		var loc = req.body.location;
		Jobs.update({id: jid}, {profile: profile, description: desc, salary: sal, location: loc}).exec(function(err, updated){
			if(err){
				return res.serverError();
			}
			else{
				return res.ok("Success");
			}
		})
	}

};

