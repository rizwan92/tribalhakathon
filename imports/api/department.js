import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const DepartmentApi = new Mongo.Collection('department');

Meteor.methods({
  'department.insert'(department) {
  return  DepartmentApi.insert({
      name:department,
      status:1,
      createdAt: new Date(), // current time
    });
  },
  'department.updatedynamic'(userid,field,value) {
      return DepartmentApi.update(userid,{ $set: { [field]: value } });
     },
  'department.update'(userid,image) {
    DepartmentApi.update(userid, {
        $set: { image },
      });  },
  'department.remove'(taskId) {
    check(taskId, String);
    DepartmentApi.remove(taskId);
  },
  'department.check'(email,password) {
    let user = DepartmentApi.findOne({email,password});
    return user;
  },
  'department.singleitem'(user) {
    let User = DepartmentApi.findOne({_id:user});
    return User;
  }
});
if (Meteor.isServer) {
  Meteor.publish('department', function userPublication(userid) {
    return DepartmentApi.find({_id:userid});
  });
  Meteor.publish('alldepartment', function userPublication(userid) {
    return DepartmentApi.find({});
  });
}
