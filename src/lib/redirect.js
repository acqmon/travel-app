import { ROLE } from "@/constants/role.constant";

export function getDashboardByRole(role) {
  const map = {
    [ROLE.ADMIN]: "/admin/dashboard",
    [ROLE.PARTNER]: "/partner/dashboard",
    [ROLE.CUSTOMER]: "/dashboard",
  };

  return map[role] || "/unauthorized";
}
