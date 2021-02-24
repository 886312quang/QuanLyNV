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
  {
    path: "/service",
    exact: true,
    loader: () => import("../components/ServicePage/list/ListPage"),
    menu: true,
    label: "Dịch vụ",
    permissionRequired: null,
    icon: "appstore",
  },
  {
    path: "/service/new",
    exact: true,
    loader: () => import("../components/ServicePage/form/FormPage"),
    menu: false,
    label: "Tạo mới dịch vụ",
    permissionRequired: null,
    icon: "home",
  },
  {
    path: "/service/:id/edit",
    loader: () => import("../components/ServicePage/form/FormPage"),
    menu: false,
    label: "Tạo mới dịch vụ",
    permissionRequired: null,
    exact: true,
  },
  {
    path: "/service/:id/view",
    loader: () => import("../components/ServicePage/view/ViewPage"),
    menu: false,
    label: "Thông tin dịch vụ",
    permissionRequired: null,
    exact: true,
  },
  {
    path: "/shift",
    exact: true,
    loader: () => import("../components/ShiffPage/list/ListPage"),
    menu: true,
    label: "Ca",
    permissionRequired: null,
    icon: "deployment-unit",
  },
  {
    path: "/shift/new",
    exact: true,
    loader: () => import("../components/ShiffPage/form/FormPage"),
    menu: false,
    label: "Tạo mới Ca",
    permissionRequired: null,
    icon: "home",
  },
  {
    path: "/shift/:id/edit",
    loader: () => import("../components/ShiffPage/form/FormPage"),
    menu: false,
    label: "Tạo mới Ca",
    permissionRequired: null,
    exact: true,
  },
  {
    path: "/shift/:id/view",
    loader: () => import("../components/ShiffPage/view/ViewPage"),
    menu: false,
    label: "Thông tin Ca",
    permissionRequired: null,
    exact: true,
  },
  {
    path: "/ledger/:id",
    exact: true,
    loader: () => import("../components/LedgerPage/list/ListPage"),
    menu: false,
    label: "Tính tua",
    permissionRequired: null,
    icon: "home",
  },
  {
    path: "/ledger/:id/edit",
    loader: () => import("../components/LedgerPage/form/FormPage"),
    menu: false,
    label: "Chỉnh sửa tua",
    permissionRequired: null,
    exact: true,
  },
  {
    path: "/ledger/:id/view",
    loader: () => import("../components/LedgerPage/view/ViewPage"),
    menu: false,
    label: "Thông tin tua",
    permissionRequired: null,
    exact: true,
  },
  {
    path: "/report",
    exact: true,
    loader: () => import("../components/ReportPage/list/ListPage"),
    menu: true,
    label: "Báo cáo",
    permissionRequired: null,
    icon: "bar-chart",
  },
  {
    path: "/user",
    exact: true,
    loader: () => import("../components/UserPage/list/ListPage"),
    menu: true,
    label: "Người dùng",
    permissionRequired: null,
    icon: "user",
  },
  {
    path: "/user/new",
    exact: true,
    loader: () => import("../components/UserPage/form/FormPage"),
    menu: false,
    label: "Tạo mới người dùng",
    permissionRequired: null,
    icon: "home",
  },
  {
    path: "/user/:id/edit",
    loader: () => import("../components/UserPage/form/FormPage"),
    menu: false,
    label: "Tạo mới người dùng",
    permissionRequired: null,
    exact: true,
  },
  {
    path: "/user/:id/view",
    loader: () => import("../components/UserPage/view/ViewPage"),
    menu: false,
    label: "Thông tin người dùng",
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

const publicRoutes = [
  {
    path: "/spa",
    exact: true,
    loader: () => import("../components/LedgerPublicPage/list/ListPage"),
    menu: true,
    label: "Tua",
    permissionRequired: null,
    icon: "sliders",
  },
];

export default {
  privateRoutes,
  authRoutes,
  errorRoutes,
  publicRoutes,
};
