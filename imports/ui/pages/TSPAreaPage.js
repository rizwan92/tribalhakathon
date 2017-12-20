import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import {DistrictApi} from '../../api/district';
import {TSPAreaApi} from '../../api/tsparea';

class TSPAreaPage extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name:'',
      districtid:'',
      areatype:'',
      district:[],
      tsparea:[],
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
    let districtid = this.state.districtid.trim();
    let areatype = this.state.areatype.trim();
    if (name === '') {
      this.showSnackBar("Enter Name of Tsp Area")
      return false;
    }
    if (districtid === '') {
      this.showSnackBar("Select District")
      return false;
    }
    if (areatype === '') {
      this.showSnackBar("Select Area Type")
      return false;
    }
    let tsparea = {
        name,districtid,areatype,
    }
    Meteor.call('tsparea.insert',tsparea,(err,res)=>{
      if (res) {
        this.setState({name:'',districtid:'',areatype:''} )
        this.showSnackBar(name+" Entered Successfully")
      }
    })


  }

  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("alldistrict");
    Meteor.subscribe("alltsparea");
    let district = DistrictApi.find({}).fetch();
    let tsparea = TSPAreaApi.find({}).fetch();
    this.setState({district,tsparea});
  });
  }
  componentWillUnmount() {
  this.linktracker.stop();
  }
  deleteDistrict(id){
    let result = confirm("Want to delete?");
  if (result) {
      Meteor.call('tsparea.remove',id)
    }
  }
  render() {
    return (
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>
      <h4>TSP Area Entry/Edit/Delete</h4>

      <form onSubmit={this.handleDistrict.bind(this)}>
      <div style={{display:'flex',justifyContent:'center',flexFlow:'column',alignItems:'center',width:'100%',height:'100%'}}>
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id="sample1" onChange={this.setValue.bind(this,'name')} value={this.state.name}/>
          <label className="mdl-textfield__label" htmlFor="sample1">TSP Area Name</label>
        </div>
        <select className="mdl-textfield__input"  id="sample1" value={this.state.districtid} onChange={this.setValue.bind(this,'districtid')} style={{margin:20}}>
          <option value="">Select District</option>
          {
            this.state.district.map((dist,i)=>{
            return(
              <option value={dist._id} key={i}>{dist.name}</option>
            )
          })
          }
        </select>
        <select className="mdl-textfield__input"  id="sample1" value={this.state.areatype} onChange={this.setValue.bind(this,'areatype')}  style={{margin:20}}>
          <option value="">Select Area Type</option>
          <option value="1">Sub Scheme</option>
          <option value="2">MADA</option>
          <option value="3">Laghu Anchal</option>
        </select>

        <button id="demo-show-toast" className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="submit" >Submit</button>
        </div>
      </form>


      {
        this.state.tsparea.length == 0 ? null :
          <ul className="demo-list-control mdl-list">
          {
          this.state.tsparea.map((tsp,i)=>{
            return(
              <li className="mdl-list__item mdl-list__item--two-line" key={i}>
              <span className="mdl-list__item-primary-content" >
                <i className="material-icons  mdl-list__item-avatar" style={{textAlign:'center', lineHeight: '40px',fontSize:18,cursor:'pointer'}}>{tsp.name[0]}</i>
                <div style={{cursor:'pointer'}}>{tsp.name}</div>
                 <span className="mdl-list__item-sub-title">  {tsp.areatype == 1 ? "Sub Scheme" : tsp.areatype == 2 ?  "MADA" : tsp.areatype == 3 ?  "Laghu Anchal" : null}</span>
                 <span className="mdl-list__item-sub-title"> {tsp.districtid}</span>
              </span>
              <span className="mdl-list__item-secondary-action" >
              <i className="material-icons" onClick={this.deleteDistrict.bind(this,tsp._id)} style={{cursor:'pointer'}}>delete</i>
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

export default TSPAreaPage;
