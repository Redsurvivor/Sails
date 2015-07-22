/**
 * SeekerController
 *
 * @description :: Server-side logic for managing seekers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new: function(req, res){
		res.view();
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
				//sails.log("success");
				res.redirect('/');	
			}
		});
	},
	index: function(req, res){
		Seeker.find().exec(function(err, seekers){
			if(err){
				sails.log("Error2");
				return res.serverError(err);
			}
			else{
				//sails.log("Success2");
				return res.view({allSeeker: seekers});
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
	edit: function(req, res){
		var sid = req.params.id;
		//sails.log("redirect");
		Seeker.find({id: sid}).exec(function (err, found){
			if(err){
				return res.serverError();
			}
			else{
				return res.view({updateSeeker: found[0]});
			}
		});
	},
	update: function(req, res){
		//sails.log("Inside update");
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

	// applyJobs2: function(req, res) {
	// 	var seekerId = req.params.id;

	// 	sails.log.verbose("applyJobs2 Entry point");

	// 	async.auto({
	// 		seeker: function(callback) {
	// 			Seeker.findOne(seekerId).populate('appliedJobs').exec(function(err, seeker) {
	// 				if(err) return callback(err);
	// 				if(!seeker) return callback({code: 1, message: "Seeker not found"});
	// 				return callback(null, seeker);
	// 			});
	// 		},

	// 		jobs: function(callback, results) {
	// 			Jobs.find().exec(callback);
	// 		},

	// 	}, function(err, results) {
	// 		if(err) {
	// 			if(err.code === 1)
	// 				return res.notFound(err);
	// 			else
	// 				return res.serverError(err); 
	// 		}

	// 		sails.log.info("Results:", results);
	// 		var appliedJobs = results.seeker.appliedJobs;
	// 		//var availableJobs = _.difference(results, appliedJobs);
	// 		var availableJobs = _.reject(results.jobs, function(thisJob){
	// 			if(_.find(appliedJobs, function(appliedJob, thisJob){
	// 				if(appliedJob == thisJob)
	// 					return true;
	// 				else false;
	// 			}))
	// 				return true;
	// 			else
	// 				false;
	// 		});
	// 		sails.log.info("AppliedJobs:", appliedJobs);
	// 		sails.log.info("availableJobs:", availableJobs);

	// 		return res.view('seeker/applyjobs', {availableJobs: availableJobs, appliedJob: appliedJobs, seekerID: seekerId});
	// 	});
	// },

	// Re-write this function
	// Don't show this page if Seeker doesn't exist, return 404
	showApply: function(req, res){
		//sails.log("inside show apply");
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
				return res.view({availableJobs: available, appliedJob: applied, seekerID: seekerId});
			};
		})
	},
	// Check Seeker here; Return 404
	apply: function(req, res){
		var seekerId = req.params.seekerId;
		var jobId = req.params.jobId;
		// Use Model.findOne, whenever you expect 0 or 1 result
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

