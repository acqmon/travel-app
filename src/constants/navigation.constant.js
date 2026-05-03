import { ROLE } from "./role.constant";
import { PATHS } from "./paths.constant";

export const NAVIGATION = {
  [ROLE.ADMIN]: [
    { label: "Dashboard", path: PATHS.ADMIN.DASHBOARD },
    { label: "Partners", path: PATHS.ADMIN.PARTNERS },
    { label: "Customers", path: PATHS.ADMIN.CUSTOMERS },
    { label: "Activities", path: PATHS.ADMIN.ACTIVITIES },
    { label: "Customer Plans", path: PATHS.ADMIN.CUSTOMER_PLANS },
    { label: "Partner Plans", path: PATHS.ADMIN.PARTNER_PLANS },
    { label: "Listings", path: PATHS.ADMIN.LISTINGS },
  ],
  [ROLE.PARTNER]: [
    { label: "Dashboard", path: PATHS.PARTNER.DASHBOARD },
    { label: "Activities", path: PATHS.PARTNER.ACTIVITIES },
  ],
  [ROLE.CUSTOMER]: [
    { label: "Dashboard", path: PATHS.CUSTOMER.DASHBOARD },
    { label: "Activities", path: PATHS.CUSTOMER.ACTIVITIES },
  ],
};
