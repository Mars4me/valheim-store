export const siteMapRoutes = [
  { route: "", name: "Home", path: "/" },
  { route: "store", name: "Store", path: "/store" },
  { route: "about", name: "About", path: "/about" },
  { route: "coupons", name: "Coupons", path: "/coupons" },
  { route: "history", name: "History", path: "/history" },
];

const siteMap = (link: string): {} => {
  const findRoute = siteMapRoutes.find((el) => el.route === link);

  return findRoute || {};
};

export default siteMap;
