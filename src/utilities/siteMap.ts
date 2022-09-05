export const siteMapRoutes = [
  { route: "", name: "Home", path: "/" },
  { route: "store", name: "Store", path: "/store" },
  { route: "about", name: "About", path: "/about" },
  { route: "coupons", name: "Coupons", path: "/coupons" },
  { route: "history", name: "History", path: "/history" },
];

export const siteMapAbout = [
  { route: "help", name: "Help", path: "/about" },
  { route: "company", name: "Company", path: "/about/company" },
  { route: "examples", name: "Examples", path: "/about/examples" },
  { route: "team", name: "Team", path: "/about/team" },
]

const siteMap = (link: string): {} => {
  const findRoute = siteMapRoutes.find((el) => el.route === link);

  return findRoute || {};
};

export default siteMap;
