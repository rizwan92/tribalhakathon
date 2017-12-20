import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import {DepartmentApi} from '../../api/department';
import {SchemeApi} from '../../api/scheme';
import {DistrictApi} from '../../api/district';
import {TSPAreaApi} from '../../api/tsparea';
import {ProjectApi} from '../../api/project';

class ProjectAllotment extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name:'',
      yoa:'',
      tpe:'',
      aar:'',
      atbr:'',
      remarks:'',
      departmentid:'',
      schemeid:'',
      districtid:'',
      tspareaid:'',
      department:[],
      scheme:[],
      district:[],
      tsparea:[],
      project:[],
    } ;
  }

  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
  }

  showSnackBar(msg){
    var snackbarContainer = document.querySelector('#demo-toast-example');
    var data = {message: msg};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
  }


  handleDistrict(event){
    event.preventDefault();
    let name = this.state.name.trim();
    let district1 = this.state.districtid.trim().split("$");
    let tsparea1 = this.state.tspareaid.trim().split("$");
    let department1 = this.state.departmentid.trim().split("$");
    let scheme1 = this.state.schemeid.trim().split("$");
    let yoa = this.state.yoa.trim();
    let tpe = this.state.tpe.trim();
    let aar = this.state.aar.trim();
    let atbr = this.state.atbr.trim();
    let remarks = this.state.remarks.trim();


    let districtid = district1[0];
    let tspareaid = tsparea1[0];
    let departmentid = department1[0];
    let schemeid = scheme1[0];
    let districtname = district1[1];
    let tspareaname = tsparea1[1];
    let departmentname = department1[1];
    let schemename = scheme1[1];

    if (name === '') {
      this.showSnackBar("Enter Name of Project")
      return false;
    }
    if (districtid === '') {
      this.showSnackBar("Enter Name of District")
      return false;
    }
    if (tspareaid === '') {
      this.showSnackBar("Enter Name of TSPArea")
      return false;
    }
    if (departmentid === '') {
      this.showSnackBar("Enter Name of Department")
      return false;
    }
    if (schemeid === '') {
      this.showSnackBar("Enter Name of Scheme")
      return false;
    }
    if (yoa === '') {
      this.showSnackBar("Enter Years of Approval")
      return false;
    }
    if (tpe === '') {
      this.showSnackBar("Enter Total Project Estimate")
      return false;
    }
    if (aar === '') {
      this.showSnackBar("Enter Amount already released")
      return false;
    }

    let project = {
      name,districtid,districtname,tspareaid,tspareaname,departmentid,departmentname,schemeid,schemename,yoa,tpe,aar,atbr,remarks
    }
    Meteor.call('project.insert',project,(err,res)=>{
      if (res) {
        this.showSnackBar(project.name+" Entered Successfully")
        this.setState({name:'',districtid:'',tspareaid:'',departmentid:'',schemeid:'',yoa:'',tpe:'',aar:'',atbr:'',remarks:''} )
      }
    })
  }

  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("alldepartment");
    Meteor.subscribe("allscheme");
    Meteor.subscribe("alldistrict");
    Meteor.subscribe("alltsparea");
    Meteor.subscribe("allproject");
    let department = DepartmentApi.find({}).fetch();
    let scheme = SchemeApi.find({}).fetch();
    let district = DistrictApi.find({}).fetch();
    let tsparea = TSPAreaApi.find({}).fetch();
    let project = ProjectApi.find({}).fetch();
    this.setState({department,scheme,district,tsparea,project});
  });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }
  deleteProject(id){
    let result = confirm("Want to delete?");
  if (result) {
      Meteor.call('department.remove',id)
    }
  }
  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>
      <h4>Projects Entry/Edit/Delete</h4>

      <form onSubmit={this.handleDistrict.bind(this)}>
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>

      <select className="mdl-textfield__input"  id="districtname" value={this.state.districtid} onChange={this.setValue.bind(this,'districtid')} style={{margin:20}}>
        <option value="">Select District</option>
        {
          this.state.district.map((dist,i)=>{
          return(
            <option value={dist._id+"$"+dist.name} key={i}>{dist.name}</option>
          )
        })
        }
      </select>


      <select className="mdl-textfield__input"  id="tspareaname" value={this.state.tspareaid} onChange={this.setValue.bind(this,'tspareaid')} style={{margin:20}}>
        <option value="">Select TSP Area</option>
        {
          this.state.tsparea.map((tsp,i)=>{
            let districtidselect = this.state.districtid.split("$")
            if ( districtidselect[0]=== tsp.districtid) {
              return(
                <option value={tsp._id+"$"+tsp.name} key={i}>{tsp.name}</option>
              )
            }
        })
        }
      </select>

      <select className="mdl-textfield__input"  id="departmentname" value={this.state.departmentid} onChange={this.setValue.bind(this,'departmentid')} style={{margin:20}}>
        <option value="">Select Department</option>
        {
          this.state.department.map((dep,i)=>{
          return(
            <option value={dep._id+"$"+dep.name} key={i}>{dep.name}</option>
          )
        })
        }
      </select>


      <select className="mdl-textfield__input"  id="schemename" value={this.state.schemeid} onChange={this.setValue.bind(this,'schemeid')} style={{margin:20}}>
        <option value="">Select Scheme</option>
        {
          this.state.scheme.map((schm,i)=>{
            let departmentidselect = this.state.departmentid.split("$")
            if (departmentidselect[0] === schm.departmentid) {
              return(
                <option value={schm._id+"$"+schm.name} key={i}>{schm.name}</option>
              )
            }
        })
        }
      </select>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'name')} value={this.state.name}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Project Name</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'yoa')} value={this.state.yoa}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Years of Approval</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'tpe')} value={this.state.tpe}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Total Project Estimate</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'aar')} value={this.state.aar}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Amount already Released</label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'atbr')} value={this.state.atbr}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Amount to be released further from SCA to TSS </label>
        </div>


        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'remarks')} value={this.state.remarks}/>
          <label className="mdl-textfield__label" htmlFor="sample1" >Remarks</label>
        </div>

        <button id="demo-show-toast" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" >Submit</button>
        </div>
      </form>


      {
        this.state.project.length == 0 ? null :
          <ul className="demo-list-control mdl-list">
          {
          this.state.project.map((proj,i)=>{
            return(
              <li className="mdl-list__item" key={i}>
              <span className="mdl-list__item-primary-content" >
                <i className="material-icons  mdl-list__item-avatar" style={{textAlign:'center', lineHeight: '40px',fontSize:18,cursor:'pointer'}}>{proj.name[0]}</i>
                <div style={{cursor:'pointer'}}>{proj.name}</div>
              </span>
              <span className="mdl-list__item-secondary-action" >
              <i className="material-icons" onClick={this.deleteProject.bind(this,proj._id)} style={{cursor:'pointer'}}>delete</i>
              </span>
            </li>
            )
          })
        }
        </ul>
      }

      </div>
    );
  }

}

export default ProjectAllotment;
