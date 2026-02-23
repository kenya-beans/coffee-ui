import { createBrowserRouter } from "react-router";
import { Layout } from "./components/layout";
import { Home } from "./pages/home";
import { Shop } from "./pages/shop";
import { ProductDetail } from "./pages/product-detail";
import { Cart } from "./pages/cart";
import { Checkout } from "./pages/checkout";
import { TrackOrder } from "./pages/track-order";
import { AdminDashboard } from "./pages/admin-dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "product/:id", Component: ProductDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "track-order", Component: TrackOrder },
      { path: "admin", Component: AdminDashboard },
    ],
  },
]);
