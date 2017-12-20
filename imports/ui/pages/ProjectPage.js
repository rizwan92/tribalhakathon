import React, { Component } from 'react';
import {Tracker} from 'meteor/tracker';
import { ProjectApi } from '../../api/project';
import {TSPAreaApi} from '../../api/tsparea';
class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project:[],
      tsparea:[],
      tspareaid:'',
    };
  }
  setValue(field, event) {
   let object = {};
   object[field] = event.target.value;
   this.setState(object);
  }


  componentWillMount() {
  this.linktracker = Tracker.autorun(() => {
    Meteor.subscribe("allproject");
    Meteor.subscribe("alltsparea");
    let project = ProjectApi.find({}).fetch();
    let tsparea = TSPAreaApi.find({}).fetch();
    this.setState({project,tsparea});
  });
}
  componentWillUnmount() {
  this.linktracker.stop();
  }

  render() {
    let searchproject = this.state.project.filter((project)=>{
      return(project.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !==-1)
    })
    searchproject = this.state.project.filter((project)=>{
      return(project.tspareaid.toLowerCase().indexOf(this.state.tspareaid.toLowerCase()) !==-1)
    })

    return (
      <div style={{display:'flex',flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>
      <div className="demo-cards mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid mdl-grid--no-spacing" style={{display:'flex',flex:1,width:'100%',justifyContent:'center',alignItems:'center'}}>

      <div className="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" >

      <select className="mdl-textfield__input"  id="tspareaname" value={this.state.tspareaid} onChange={this.setValue.bind(this,'tspareaid')} style={{margin:20}}>
        <option value="">Select TSP Area</option>
        {
          this.state.tsparea.map((tsp,i)=>{
              return(
                <option value={tsp._id} key={i}>{tsp.name}</option>
              )
        })
        }
      </select>

      </div>



        {
          searchproject.lenth == 0 ? null :
          <div>
          {
            searchproject.map((prj,i)=>{
              return(
                <div className="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop" key={i}>
                  <div className="mdl-card__title mdl-card--expand mdl-color--teal-300">
                    <div style={{position:'absolute',top:5,left:5,fontSize:'1.1rem'}}>{prj.yoa}</div>
                    <div style={{position:'absolute',top:25,left:5,fontSize:'1.1rem'}}>{prj.tspareaname}</div>
                    <div style={{position:'absolute',top:5,right:5,fontSize:'1.1rem'}}>Total Project Estimated : {prj.tpe}</div>
                    <div style={{position:'absolute',top:25,right:5,fontSize:'1.1rem'}}>Amount Already Released : {prj.aar}</div>
                    <div style={{position:'absolute',top:45,right:5,fontSize:'1.1rem'}}>Amount to be Released : {prj.atbr}</div>
                    <div style={{position:'absolute',top:65,right:5,fontSize:'1.1rem'}}>District : {prj.districtname}</div>
                    <div style={{position:'absolute',top:85,right:5,fontSize:'1.1rem'}}>Department : {prj.departmentname}</div>
                    <div style={{position:'absolute',top:105,right:5,fontSize:'1.1rem'}}>Scheme : {prj.schemename}</div>
                    <h4 className="mdl-card__title-text">{prj.name}</h4>
                  </div>
                  <div className="mdl-card__supporting-text mdl-color-text--grey-600">
                    {prj.name +" under "+ prj.schemename+ " of "+ prj.departmentname+ " Department in "+ prj.districtname+" District at "+ prj.tspareaname}
                  </div>
                  <div className="mdl-card__actions mdl-card--border">
                    <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect">Read More</a>
                  </div>
                </div>
              )
            })
          }
          </div>
        }




      </div>
      </div>
    );
  }

}

export default ProjectPage;
