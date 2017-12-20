import React, { Component } from 'react';

class HomePage extends Component {

  componentWillMount() {
  }

  render() {

    return (
      <div>
      <div className="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div id="visualization" style={{width:450,height:450,border:'1px solid red'}}></div>
      </div>
      <div className="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
      <div id="visualization1" style={{width:450,height:450,border:'1px solid red'}}></div>
      </div>
      <div className="demo-charts mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-grid" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <div id="chart_div" style={{width:'100%',height:500,border:'1px solid red'}}></div>
        </div>
          <div id="columnchart_values" style={{width:300,height:300,border:'1px solid red'}}></div>
      <div className="demo-graphs mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--8-col">
        <svg fill="currentColor" viewBox="0 0 500 250" className="demo-graph">
        </svg>
        <svg fill="currentColor" viewBox="0 0 500 250" className="demo-graph">
        </svg>
      </div>
      <div className="demo-cards mdl-cell mdl-cell--4-col mdl-cell--8-col-tablet mdl-grid mdl-grid--no-spacing">
        <div className="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
          <div className="mdl-card__title mdl-card--expand mdl-color--teal-300">
            <h2 className="mdl-card__title-text">Updates</h2>
          </div>
          <div className="mdl-card__supporting-text mdl-color-text--grey-600">
            Non dolore elit adipisicing ea reprehenderit consectetur culpa.
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect">Read More</a>
          </div>
        </div>
        <div className="demo-separator mdl-cell--1-col"></div>
        <div className="demo-options mdl-card mdl-color--deep-purple-500 mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--12-col-desktop">
          <div className="mdl-card__supporting-text mdl-color-text--blue-grey-50">
            <h3>View options</h3>
            <ul>
              <li>
                <label htmlFor="chkbox1" className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                  <input type="checkbox" id="chkbox1" className="mdl-checkbox__input" />
                  <span className="mdl-checkbox__label">Click per object</span>
                </label>
              </li>
              <li>
                <label htmlFor="chkbox2" className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                  <input type="checkbox" id="chkbox2" className="mdl-checkbox__input" />
                  <span className="mdl-checkbox__label">Views per object</span>
                </label>
              </li>
              <li>
                <label htmlFor="chkbox3" className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                  <input type="checkbox" id="chkbox3" className="mdl-checkbox__input" />
                  <span className="mdl-checkbox__label">Objects selected</span>
                </label>
              </li>
              <li>
                <label htmlFor="chkbox4" className="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
                  <input type="checkbox" id="chkbox4" className="mdl-checkbox__input" />
                  <span className="mdl-checkbox__label">Objects viewed</span>
                </label>
              </li>
            </ul>
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <a href="#" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--blue-grey-50">Change location</a>
            <div className="mdl-layout-spacer"></div>
            <i className="material-icons">location_on</i>
          </div>
        </div>
      </div>
      </div>
    );
  }

}

export default HomePage;
