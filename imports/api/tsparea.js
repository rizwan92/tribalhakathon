import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const TSPAreaApi = new Mongo.Collection('tsparea');

Meteor.methods({
  'tsparea.insert'(tsparea) {
  return  TSPAreaApi.insert({
      name:tsparea.name,
      districtid:tsparea.districtid,
      areatype:tsparea.areatype,
      status:1,
      createdAt: new Date(), // current time
    });
  },
  'tsparea.updatedynamic'(userid,field,value) {
      return TSPAreaApi.update(userid,{ $set: { [field]: value } });
     },
  'tsparea.update'(userid,image) {
    TSPAreaApi.update(userid, {
        $set: { image },
      });  },
  'tsparea.remove'(taskId) {
    check(taskId, String);
    TSPAreaApi.remove(taskId);
  },
  'tsparea.check'(email,password) {
    let user = TSPAreaApi.findOne({email,password});
    return user;
  },
  'tsparea.singleitem'(user) {
    let User = TSPAreaApi.findOne({_id:user});
    return User;
  }
});
if (Meteor.isServer) {
  Meteor.publish('tsparea', function userPublication(userid) {
    return TSPAreaApi.find({_id:userid});
  });
  Meteor.publish('alltsparea', function userPublication(userid) {
    return TSPAreaApi.find({});
  });
}
