import { createBrowserRouter } from "react-router";
import { Home } from "./screens/Home";
import { ServiceDetails } from "./screens/ServiceDetails";
import { ChooseDate } from "./screens/ChooseDate";
import { ChooseTime } from "./screens/ChooseTime";
import { UserDetails } from "./screens/UserDetails";
import { ReviewConfirm } from "./screens/ReviewConfirm";
import { BookingConfirmed } from "./screens/BookingConfirmed";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/service/:serviceId",
    Component: ServiceDetails,
  },
  {
    path: "/choose-date",
    Component: ChooseDate,
  },
  {
    path: "/choose-time",
    Component: ChooseTime,
  },
  {
    path: "/user-details",
    Component: UserDetails,
  },
  {
    path: "/review",
    Component: ReviewConfirm,
  },
  {
    path: "/confirmed",
    Component: BookingConfirmed,
  },
]);
