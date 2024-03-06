// Create a class, that manages different error responses from our express server in backend folder.

// export default class ErrorService {
//     static handle(error, Fetch, setEvents, getEventsByMonth, navigate) {
//       if (error.message === "Access denied" || error.message === "Unauthorized") {
//         navigate("/login");
//       } else if (error.message === "Expired Token") {
//         Fetch.refreshToken()
//           .then((data) => {
//             if (data.status === "succeeded") {
//               Fetch.get().then((data) => {
//                 setEvents(getEventsByMonth(data.data));
//               });
//             } else {
//               navigate("/login");
//             }
//           })
//           .catch((error) => {
//             // TODO: check error message and handle it
//             navigate("/login");
//           });
//       }
//     }
//   }