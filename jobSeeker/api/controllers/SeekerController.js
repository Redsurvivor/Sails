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
		Seeker.find({id: sid}).exec(function (err, found){
			if(err){
				return res.serverError();
			}
			else{
				return res.view("jobSeeker/updateForm", {updateSeeker: found[0]});
			}
		});
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
	},
	applyRedirect: function(req, res){
		//sails.log("inside applyRedirect");
		var seekerId = req.params.id;
		Jobs.find().populate('seekersApplied').exec(function (err, found){
			if(err){
				return res.serverError();
			}
			else{
				var applied = [];
				var available = [];
				for(var loopJobs = 0; loopJobs < found.length; loopJobs++){
					var applierCount = found[loopJobs].toJSON().seekersApplied.length;
					var appliedFlag = false;
					// sails.log("loopJobs: "+loopJobs);
					// sails.log("applierCount: "+applierCount);
					// sails.log("appliedFlag: "+appliedFlag);
					for(var loopAppliers = 0; loopAppliers < applierCount; loopAppliers++){
						// sails.log("loopAppliers: "+loopAppliers);
						// sails.log("Applier ID is: "+found[loopJobs].toJSON().seekersApplied[loopAppliers].id);
						// sails.log("Seeker ID is: "+seekerId);
						if(found[loopJobs].toJSON().seekersApplied[loopAppliers].id == seekerId){
							//sails.log("SeekerID found: "+seekerId);
							appliedFlag = true;
							break;
						}
					}
					if(appliedFlag === true){
						//sails.log("Pushing to applied");
						applied.push(found[loopJobs].toJSON());
					}
					else{
						//sails.log("pushing to available");
						available.push(found[loopJobs].toJSON());
					}
				}
				// sails.log("********** "+available.length);
				// sails.log("********** "+applied.length);
				return res.view("jobSeeker/listAvailableJobs", {availableJobs: available, appliedJob: applied, seekerID: seekerId});
			};
		})
	},
	apply: function(req, res){
		sails.log("inside apply");
		var seekerId = req.params.id1;
		var jobId = req.params.id2;
		// sails.log("+++++ "+seekerId);
		// sails.log("**** "+jobId);
		// return res.ok("Success");
		Seeker.find({id: seekerId}).exec(function (err, found){
			if(err){
				return res.serverError();
			}
			else{
				found[0].appliedJobs.add(jobId);
				found[0].save(function (err, r){
					if(err){
						return res.serverError();
					}
					else{
						return res.ok("Success");
					}
				});
			}
		});
	}
};

