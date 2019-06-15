import React, { Component } from "react";
import "../css/App.css";

import AddAppointments from "./AddAppointments";
import ListAppointments from "./ListAppointments";
import SearchAppointments from "./SearchAppointments";
import { without } from "lodash";

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointments: [],
      formDisplay: false,
      lastIndex: 0
    };
    // this keyword is not applicable in deleteAppointment function if we don't mention this
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  deleteAppointment(apt) {
    let tempApts = this.state.myAppointments;
    //lodash library
    tempApts = without(tempApts, apt);

    this.setState({
      myAppointments: tempApts
    });
  }

  toggleForm() {
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  // React Life cycle method
  componentDidMount() {
    fetch("./data.json")
      .then(response => response.json())
      .then(result => {
        const apts = result.map(item => {
          item.aptId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myAppointments: apts
        });
      });
  }

  render() {
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointments
                  formDisplay={this.state.formDisplay}
                  toggleForm={this.toggleForm}
                />
                <ListAppointments
                  appointments={this.state.myAppointments}
                  deleteAppointment={this.deleteAppointment}
                />
                <SearchAppointments />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
