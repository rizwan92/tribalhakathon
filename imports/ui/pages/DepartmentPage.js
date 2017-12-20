import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import {DepartmentApi} from '../../api/department';

class DepartmentPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name:'',
      department:[],
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
    if (name === '') {
      this.showSnackBar("Enter Name of District")
      return false;
    }
    Meteor.call('department.insert',name,(err,res)=>{
      if (res) {
        this.setState({name:''} )
        this.showSnackBar(name+" Entered Successfully")
      }
    })
  }

  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("alldepartment");
    let department = DepartmentApi.find({}).fetch();
    this.setState({department});
  });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }
  deleteDepartment(id){
    let result = confirm("Want to delete?");
  if (result) {
      Meteor.call('department.remove',id)
    }
  }
  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>
      <h4>Department Entry/Edit/Delete</h4>

      <form onSubmit={this.handleDistrict.bind(this)}>
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'name')} value={this.state.name}/>
          <label className="mdl-textfield__label" htmlFor="sample1">Department Name</label>
        </div>
        <button id="demo-show-toast" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" >Submit</button>
        </div>
      </form>


      {
        this.state.department.length == 0 ? null :
          <ul className="demo-list-control mdl-list">
          {
          this.state.department.map((dep,i)=>{
            return(
              <li className="mdl-list__item" key={i}>
              <span className="mdl-list__item-primary-content" >
                <i className="material-icons  mdl-list__item-avatar" style={{textAlign:'center', lineHeight: '40px',fontSize:18,cursor:'pointer'}}>{dep.name[0]}</i>
                <div style={{cursor:'pointer'}}>{dep.name}</div>
              </span>
              <span className="mdl-list__item-secondary-action" >
              <i className="material-icons" onClick={this.deleteDepartment.bind(this,dep._id)} style={{cursor:'pointer'}}>delete</i>
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

export default DepartmentPage;
