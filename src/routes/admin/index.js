import AdminDashboard from "../../pages/dashboard/AdminDashboard";
import studentRoutes from "./student";
import topicRoutes from "./topic";
import questionRoutes from "./question";
import reportRoutes from "./report";
import messageRoutes from "./message";
import eventRoutes from "./event";
import paymentRoutes from "./payment";

const adminRoutes = [
  {
    exact: true,
    path: "/admin",
    component: AdminDashboard,
    scope: ["admin"],
    routes: [
      studentRoutes,
      topicRoutes,
      questionRoutes,
      reportRoutes,
      messageRoutes,
      eventRoutes,
      paymentRoutes,
    ],
  },
];

export default adminRoutes;
