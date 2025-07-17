export type Role = 'superadmin' | 'admin' | 'team' | 'serviceexecutive';

export const getCurrentUserRole = (): Role => {
  const storedRole = localStorage.getItem('role');

  const validRoles: Role[] = ['superadmin', 'admin', 'team', 'serviceexecutive'];

  if (storedRole && validRoles.includes(storedRole as Role)) {
    return storedRole as Role;
  }

  return 'team'; 
};