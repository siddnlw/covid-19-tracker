import { Table } from "react-bootstrap";
import React from "react";

class Data extends React.Component {
  state = {
    covidData: [],
    sortBy: "",
    type: "asc",
    totalConfirmedCases: "",
    totalNewConfirmed: "",
    totalRecovered: "",
    totalNewRecovered: "",
    totalNewDeceased: "",
    totalDeceased: "",
  };

  constructor(props) {
    super(props);
    fetch("https://api.covid19india.org/state_district_wise.json")
      .then((response) => response.json())
      .then((json) => {
        let totalConfirmedCases = 0;
        let totalNewConfirmed = 0;
        let totalRecovered = 0;
        let totalNewRecovered = 0;
        let totalDeceased = 0;
        let totalNewDeceased = 0;
        let covidArray = [];
        for (const state in json) {
          if (state == "State Unassigned") continue;
          let confirmedCases = 0;
          let newConfirmed = 0;
          let newRecovered = 0;
          let newDeceased = 0;
          let activeCases = 0;
          let deceased = 0;
          let recovered = 0;
          for (const district in json[state]["districtData"]) {
            confirmedCases +=
              json[state]["districtData"][district]["confirmed"];
            totalConfirmedCases += confirmedCases;

            newConfirmed +=
              json[state]["districtData"][district]["delta"]["confirmed"];
            totalNewConfirmed += newConfirmed;

            newRecovered +=
              json[state]["districtData"][district]["delta"]["recovered"];
            totalNewRecovered += newRecovered;

            newDeceased +=
              json[state]["districtData"][district]["delta"]["deceased"];
            totalNewDeceased += newDeceased;

            activeCases += json[state]["districtData"][district]["active"];

            deceased += json[state]["districtData"][district]["deceased"];
            totalDeceased += deceased;

            recovered += json[state]["districtData"][district]["recovered"];
            totalRecovered += recovered;
          }
          covidArray.push({
            state,
            confirmedCases,
            activeCases,
            recovered,
            deceased,
            newConfirmed,
            newRecovered,
            newDeceased,
          });
        }
        this.setState({
          covidData: covidArray,
          totalConfirmedCases: totalConfirmedCases,
          totalNewConfirmed: totalNewConfirmed,
          totalRecovered: totalRecovered,
          totalNewRecovered: totalNewRecovered,
          totalNewDeceased: totalNewDeceased,
          totalDeceased: totalDeceased,
        });
        this.orderData("state");
      })
      .catch((err) => console.log(err));
  }

  orderData = (key) => {
    let type = this.state.type;
    if (key == this.state.sortBy) type = type == "desc" ? "asc" : "desc";
    let covidArray = this.state.covidData;
    covidArray.sort((a, b) => {
      if (a[key] > b[key]) return type == "asc" ? 1 : -1;
      if (a[key] < b[key]) return type == "asc" ? -1 : 1;
      return 0;
    });
    this.setState({ covidData: covidArray, sortBy: key, type });
  };

  render() {
    return (
      <div style={{ marginLeft: "20px", marginRight: "20px" }}>
        <div
          style={{
            fontSize: "1.3em",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div>
            <span style={{ fontWeight: 900 }}>Confirmed Cases - </span>
            <span style={{ textAlign: "right" }}>
              {this.state.totalConfirmedCases}
              <div style={{ color: "red" }}>
                + {this.state.totalNewConfirmed}
              </div>
            </span>
          </div>
          <div>
            <span style={{ fontWeight: 900 }}>Recovered Cases - </span>
            <span style={{ textAlign: "right" }}>
              {this.state.totalRecovered}
              <div style={{ color: "green" }}>
                + {this.state.totalNewRecovered}
              </div>
            </span>
          </div>
          <div>
            <span style={{ fontWeight: 900 }}>Deaths - </span>
            <span style={{ textAlign: "right" }}>
              {this.state.totalDeceased}
              <div style={{ color: "#898988" }}>
                + {this.state.totalNewDeceased}
              </div>
            </span>
          </div>
        </div>

        <Table
          responsive
          striped
          bordered
          hover
          variant={
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light"
          }
          style={{
            border: "2px solid white",
          }}
        >
          <thead>
            <tr>
              <th>List Number</th>
              <th
                style={{ cursor: "pointer" }}
                onClick={() => this.orderData("state")}
              >
                State{" "}
                {this.state.sortBy == "state" ? (
                  this.state.type == "asc" ? (
                    <span style={{ fontSize: "1.3em" }}>&darr;</span>
                  ) : (
                    <span style={{ fontSize: "1.3em" }}>&uarr;</span>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className="confirmed"
                onClick={() => this.orderData("confirmedCases")}
              >
                Confirmed Cases{" "}
                {this.state.sortBy == "confirmedCases" ? (
                  this.state.type == "asc" ? (
                    <span style={{ fontSize: "1.3em" }}>&darr;</span>
                  ) : (
                    <span style={{ fontSize: "1.3em" }}>&uarr;</span>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className="active"
                onClick={() => this.orderData("activeCases")}
              >
                Active Cases{" "}
                {this.state.sortBy == "activeCases" ? (
                  this.state.type == "asc" ? (
                    <span style={{ fontSize: "1.3em" }}>&darr;</span>
                  ) : (
                    <span style={{ fontSize: "1.3em" }}>&uarr;</span>
                  )
                ) : (
                  ""
                )}
              </th>
              <th
                className="recovered"
                onClick={() => this.orderData("recovered")}
              >
                Recovered Cases{" "}
                {this.state.sortBy == "recovered" ? (
                  this.state.type == "asc" ? (
                    <span style={{ fontSize: "1.3em" }}>&darr;</span>
                  ) : (
                    <span style={{ fontSize: "1.3em" }}>&uarr;</span>
                  )
                ) : (
                  ""
                )}
              </th>
              <th className="death" onClick={() => this.orderData("deceased")}>
                Deaths{" "}
                {this.state.sortBy == "deceased" ? (
                  this.state.type == "asc" ? (
                    <span style={{ fontSize: "1.3em" }}>&darr;</span>
                  ) : (
                    <span style={{ fontSize: "1.3em" }}>&uarr;</span>
                  )
                ) : (
                  ""
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.covidData.map((x, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{x["state"]}</td>
                  <td
                    style={{
                      backgroundColor:
                        this.state.sortBy == "confirmedCases"
                          ? index % 2 == 0
                            ? "#e2837a"
                            : "#E36A57 "
                          : "transparent",
                    }}
                  >
                    <div style={{ color: "#BD3427", fontSize: "0.8em" }}>
                      +{x["newConfirmed"]}
                    </div>
                    {x["confirmedCases"]}{" "}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        this.state.sortBy == "activeCases"
                          ? index % 2 == 0
                            ? "#49CEFC"
                            : "#3FBAE7 "
                          : "transparent",
                    }}
                  >
                    {x["activeCases"]}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        this.state.sortBy == "recovered"
                          ? index % 2 == 0
                            ? "#a6c47d"
                            : "#65c24d "
                          : "transparent",
                    }}
                  >
                    <div style={{ color: "green", fontSize: "0.8em" }}>
                      +{x["newRecovered"]}
                    </div>
                    {x["recovered"]}
                  </td>
                  <td
                    style={{
                      backgroundColor:
                        this.state.sortBy == "deceased"
                          ? index % 2 == 0
                            ? "#C9CACC"
                            : "#A3A5A8 "
                          : "transparent",
                    }}
                  >
                    <div style={{ color: "black", fontSize: "0.8em" }}>
                      +{x["newDeceased"]}
                    </div>
                    {x["deceased"]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default Data;
