import React, { Component } from 'react';
import EventList from "../components/Events/EventList.jsx";
import LightSwitch from "../components/Misc/LightSwitch.jsx";

// Arrow function component
const Dashboard= () => {
  return (
      <div>
        <LightSwitch />
        <EventList />
      </div>
  )
}



// Function declaration component
// function Dashboard() {
//   return (
//       <div>
//         <h1>Dashboard</h1>
//       </div>
//   )
// }
// //
// // Class component extending React.Component
// class Dashboard extends React.Component {
//   render() {
//     return (
//       <div>
//         <h1>Dashboard</h1>
//       </div>
//     )
//   }
// }
// //
// // Class component extending Component
// class Dashboard extends Component {
//   render() {
//     return (
//         <div>
//           <h1>Dashboard</h1>
//         </div>
//     )
//   }
// }


export default Dashboard;
