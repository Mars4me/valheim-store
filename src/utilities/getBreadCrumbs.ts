import siteMap from "./siteMap";
interface BreadCrumbs {
  route: string;
  name: string;
  path: string;
}

export default function getBreadcrumbs(url: string): BreadCrumbs[] {
  const splitUrl = url.split("/");
  const makeBreadcrubs = splitUrl
    .map((element) => siteMap(element))
    .filter((route) => Object.keys(route).length !== 0) as BreadCrumbs[];
  return makeBreadcrubs;
}
