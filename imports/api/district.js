import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const DistrictApi = new Mongo.Collection('district');

Meteor.methods({
  'district.insert'(district) {
  return  DistrictApi.insert({
      name:district,
      status:1,
      createdAt: new Date(), // current time
    });
  },
  'district.updatedynamic'(userid,field,value) {
      return DistrictApi.update(userid,{ $set: { [field]: value } });
     },
  'district.update'(userid,image) {
    DistrictApi.update(userid, {
        $set: { image },
      });  },
  'district.remove'(taskId) {
    check(taskId, String);
    DistrictApi.remove(taskId);
  },
  'district.check'(email,password) {
    let user = DistrictApi.findOne({email,password});
    return user;
  },
  'district.singleitem'(user) {
    let User = DistrictApi.findOne({_id:user});
    return User;
  }
});
if (Meteor.isServer) {
  Meteor.publish('district', function userPublication(userid) {
    return DistrictApi.find({_id:userid});
  });
  Meteor.publish('alldistrict', function userPublication(userid) {
    return DistrictApi.find({});
  });
}
