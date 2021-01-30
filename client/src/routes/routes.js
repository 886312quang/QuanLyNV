const privateRoutes = [
  {
    path: "/",
    exact: true,
    loader: () => import("../components/HomePage/index"),
    menu: true,
    label: "Trang chủ",
    permissionRequired: null,
    icon: "home",
  },
  ,
  {
    path: "/branch",
    exact: true,
    loader: () => import("../components/BranchPage/list/ListPage"),
    menu: true,
    label: "Chi nhánh",
    permissionRequired: null,
    icon: "branches",
  },
  {
    path: "/branch/new",
    exact: true,
    loader: () => import("../components/BranchPage/form/FormPage"),
    menu: false,
    label: "Tạo mới chi nhánh",
    permissionRequired: null,
    icon: "home",
  },
  {
    path: "/branch/:id/edit",
    loader: () => import("../components/BranchPage/form/FormPage"),
    menu: false,
    label: "Tạo mới chi nhánh",
    permissionRequired: null,
    exact: true,
  },
  {
    path: "/branch/:id/view",
    loader: () => import("../components/BranchPage/view/ViewPage"),
    menu: false,
    label: "Thông tin chi nhánh",
    permissionRequired: null,
    exact: true,
  },
  {
    path: "/staff",
    exact: true,
    loader: () => import("../components/StaffPage/List/ListPage"),
    menu: true,
    label: "Nhân viên",
    permissionRequired: null,
    icon: "team",
  },
  {
    path: "/staff/new",
    exact: true,
    loader: () => import("../components/StaffPage/Form/FormPage"),
    menu: false,
    label: "Tạo mới nhân viên",
    permissionRequired: null,
    icon: "home",
  },
  {
    path: "/staff/:id/edit",
    menu: false,
    loader: () => import("../components/StaffPage/Form/FormPage"),
    label: "Tạo mới nhân viên",
    permissionRequired: null,
    exact: true,
  },
  {
    path: "/staff/:id/view",
    menu: false,
    loader: () => import("../components/StaffPage/View/ViewPage"),
    label: "Thông tin nhân viên",
    permissionRequired: null,
    exact: true,
  },
];

const authRoutes = [
  {
    path: "/signin",
    exact: true,
    loader: () => import("../components/SigninPage/index"),
  },
];

const errorRoutes = [
  {
    path: "/401",
    exact: true,
    loader: () => import("../routes/error/Error401Page"),
  },
  {
    path: "/403",
    exact: true,
    loader: () => import("../routes/error/Error403Page"),
  },
  {
    path: "/404",
    exact: true,
    loader: () => import("../routes/error/Error404Page"),
  },
  {
    path: "/500",
    exact: true,
    loader: () => import("../routes/error/Error500Page"),
  },
];

const publicRoutes = [];

export default {
  privateRoutes,
  authRoutes,
  errorRoutes,
  publicRoutes,
};
