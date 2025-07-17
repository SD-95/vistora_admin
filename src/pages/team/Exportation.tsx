import React, { useState } from 'react';
import { Button, Form, Card, Container, Alert } from 'react-bootstrap';
import Papa from 'papaparse';
import type { TeamMember } from '../../utils/admintypes';

const isValidRole = (role: string): role is TeamMember['role'] => {
  return ['superadmin', 'admin', 'team', 'serviceexecutive'].includes(role);
};

const isValidStatus = (status: string): status is TeamMember['status'] => {
  return ['Active', 'Inactive', 'Suspended'].includes(status);
};

interface TeamCSVManagerProps {
  teamMembers: TeamMember[];
  onImport: (newData: TeamMember[]) => void;
}

const Exportmanager: React.FC<TeamCSVManagerProps> = ({ teamMembers, onImport }) => {
  const [importedCount, setImportedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleExport = () => {
    const headers = Object.keys(teamMembers[0]).filter(
      key => !['profile_image', 'permissions', 'security', 'activity_logs'].includes(key)
    );

    const csvRows = [
      headers.join(','),
      ...teamMembers.map(member =>
        headers.map(h => JSON.stringify((member as any)[h] ?? '')).join(',')
      ),
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `team-members-${new Date().toISOString()}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  // const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   Papa.parse(file, {
  //     header: true,
  //     skipEmptyLines: true,
  //     complete: (results) => {
  //       try {
  //         const raw = results.data as Record<string, string>[];
  //         const newData: TeamMember[] = raw.map((item, index) => {
  //           const now = new Date().toISOString();

  //           const role = isValidRole(item.role) ? item.role : 'team';
  //           const status = isValidStatus(item.status) ? item.status : 'Active';

  //           return {
  //             id: `imported-${Date.now()}-${index}`,
  //             name: item.name?.trim() || `Unnamed-${index + 1}`,
  //             email: item.email?.trim() || `unknown-${index + 1}@example.com`,
  //             mobile: item.mobile?.trim() || '',
  //             role,
  //             status,
  //             region: item.region || '',
  //             timezone: item.timezone || '',
  //             language: item.language || 'English',
  //             joined_date: item.joined_date || now.split('T')[0],
  //             last_active: item.last_active || now,
  //             profile_image: '',

  //             permissions: {
  //               full_access: item.full_access === 'true',
  //               can_manage_users: item.can_manage_users === 'true',
  //               can_manage_orders: item.can_manage_orders === 'true',
  //               can_manage_products: item.can_manage_products === 'true',
  //               can_manage_finances: item.can_manage_finances === 'true',
  //               can_manage_roles: item.can_manage_roles === 'true',
  //             },

  //             security: {
  //               two_factor_enabled: item.two_factor_enabled === 'true',
  //               last_password_change: item.last_password_change || '',
  //               login_devices: item.login_devices ? item.login_devices.split(';') : [],
  //             },

  //             activity_logs: [],
  //           };
  //         });

  //         onImport(newData);
  //         setImportedCount(newData.length);
  //         setError(null);
  //       } catch (err: any) {
  //         setError('⚠️ Failed to import CSV. Please check the format.');
  //       }
  //     },
  //     error: () => setError('⚠️ Error parsing CSV file.'),
  //   });
  // };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      try {
        const raw = results.data as Record<string, string>[];
        const now = new Date().toISOString();

        const newData: TeamMember[] = raw.map((item, index) => {
          const role = isValidRole(item.role) ? item.role : 'team';
          const status = isValidStatus(item.status) ? item.status as 'Active' | 'Inactive' | 'Suspended' : 'Active';

          // ✅ Validate dashboard_access properly
          const dashboardAccess = item.dashboard_access?.trim();
          const isValidAccess = dashboardAccess === 'admin' || dashboardAccess === 'service';
          const dashboard_access: 'admin' | 'service' = isValidAccess ? dashboardAccess as 'admin' | 'service' : 'admin';

          return {
            id: `imported-${Date.now()}-${index}`,
            name: item.name?.trim() || `Unnamed-${index + 1}`,
            email: item.email?.trim() || `unknown-${index + 1}@example.com`,
            mobile: item.mobile?.trim() || '',
            role,
            status,
            region: item.region?.trim() || '',
            timezone: item.timezone?.trim() || '',
            language: item.language?.trim() || 'English',
            joined_date: item.joined_date?.trim() || now.split('T')[0],
            last_active: item.last_active?.trim() || now,
            profile_image: '',

            permissions: {
              full_access: item.full_access === 'true',
              can_manage_users: item.can_manage_users === 'true',
              can_manage_orders: item.can_manage_orders === 'true',
              can_manage_products: item.can_manage_products === 'true',
              can_manage_finances: item.can_manage_finances === 'true',
              can_manage_roles: item.can_manage_roles === 'true',
            },

            security: {
              two_factor_enabled: item.two_factor_enabled === 'true',
              last_password_change: item.last_password_change?.trim() || '',
              login_devices: item.login_devices?.split(';').map(d => d.trim()) || [],
            },

            activity_logs: [],

            // ✅ Fixed types
            skills: item.skills?.split(',').map(skill => skill.trim()) || [],
            dashboard_access,
          };
        });

        onImport(newData);
        setImportedCount(newData.length);
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError('⚠️ Failed to import CSV. Please check the format.');
      }
    },
    error: () => setError('⚠️ Error parsing CSV file.'),
  });
};

  return (
    <Container className="my-4">
      <Card className="shadow-sm p-4">
        <h5 className="fw-bold mb-3">📄 Team Data Export/Import</h5>

        {importedCount > 0 && (
          <Alert variant="success">✅ Successfully imported {importedCount} members.</Alert>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        <div className="d-flex flex-wrap align-items-center gap-3">
          <Button variant="outline-success" onClick={handleExport}>
            📤 Export Team CSV
          </Button>

          <Form.Group controlId="import-csv" className="mb-0">
            <Form.Label className="btn btn-outline-primary mb-0">
              📥 Import CSV
              <Form.Control
                type="file"
                accept=".csv"
                onChange={handleImport}
                hidden
              />
            </Form.Label>
          </Form.Group>
        </div>

        <p className="mt-3 text-muted" style={{ fontSize: '0.9rem' }}>
          Imported users will have default permissions and statuses applied unless specified in CSV.
        </p>
      </Card>
    </Container>
  );
};

export default Exportmanager;


// const [teamMembers, setTeamMembers] = useState<TeamMember[]>(admindummydata);

//   const handleImport = (newData: TeamMember[]) => {
//     setTeamMembers(prev => [...prev, ...newData]);
//   };


{/* <Exportmanager teamMembers={teamMembers} onImport={handleImport} /> */}