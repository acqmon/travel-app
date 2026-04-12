import { routeAccess } from "@/config/routeAccess";

export function checkRole(user, pathname) {
  const matchedRoute = Object.keys(routeAccess).find((route) =>
    pathname.startsWith(route),
  );

  if (!matchedRoute) {
    return true; // allow public routes
  }

  const allowedRoles = routeAccess[matchedRoute];

  return allowedRoles.includes(user.role);
}
