import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const SchemeApi = new Mongo.Collection('scheme');

Meteor.methods({
  'scheme.insert'(scheme) {
  return  SchemeApi.insert({
      name:scheme.name,
      departmentid:scheme.departmentid,
      status:1,
      createdAt: new Date(), // current time
    });
  },
  'scheme.updatedynamic'(userid,field,value) {
      return SchemeApi.update(userid,{ $set: { [field]: value } });
     },
  'scheme.update'(userid,image) {
    SchemeApi.update(userid, {
        $set: { image },
      });  },
  'scheme.remove'(taskId) {
    check(taskId, String);
    SchemeApi.remove(taskId);
  },
  'scheme.check'(email,password) {
    let user = SchemeApi.findOne({email,password});
    return user;
  },
  'scheme.singleitem'(user) {
    let User = SchemeApi.findOne({_id:user});
    return User;
  }
});
if (Meteor.isServer) {
  Meteor.publish('scheme', function userPublication(userid) {
    return SchemeApi.find({_id:userid});
  });
  Meteor.publish('allscheme', function userPublication(userid) {
    return SchemeApi.find({});
  });
}
