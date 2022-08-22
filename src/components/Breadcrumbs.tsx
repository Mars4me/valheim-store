import { FC, ReactNode, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import getBreadcrumbs from "../utilities/getBreadCrumbs";

interface BreadcrumbsProps {
  name: string,
  children?: ReactNode
}

const Breadcrumbs:FC<BreadcrumbsProps> = ({name}) => {
  const { pathname } = useLocation();
  const breadcrumbs = getBreadcrumbs(pathname);

  breadcrumbs.push({ route: "pathname", name, path: pathname });

  return (
    <Breadcrumb>
      {breadcrumbs.map((breadcrumb, index, arr) => (
        <Link
          className={arr.at(-1) === breadcrumb ? "text-decoration-none text-truncate w-25 breadcrumb-item active mx-2 pe-none" : "breadcrumb-item mx-2"}
          key={index}
          to={breadcrumb.path}
        >
          {breadcrumb.name}
        </Link>
      ))}
    </Breadcrumb>
  );
};

export default Breadcrumbs;
