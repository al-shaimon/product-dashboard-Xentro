'use client';
import { useState, useEffect } from 'react';
import { FiSearch, FiEye, FiArrowUp, FiArrowDown, FiUsers } from 'react-icons/fi';
import { TableRowSkeleton } from '@/components/ui/Skeleton';
import UserDetailsModal from '@/components/dashboard/users/UserDetailsModal';
import { User } from '@/types/user';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'name' | 'email' | 'city'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.address.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let valueA = sortField === 'city' ? a.address[sortField] : a[sortField];
    let valueB = sortField === 'city' ? b.address[sortField] : b[sortField];

    valueA = valueA.toLowerCase();
    valueB = valueB.toLowerCase();

    if (sortDirection === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const handleSort = (field: 'name' | 'email' | 'city') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: 'name' | 'email' | 'city' }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? (
      <FiArrowUp className="inline ml-1" />
    ) : (
      <FiArrowDown className="inline ml-1" />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Search Bar */}
      <div className="p-4 border-b">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Name <SortIcon field="name" />
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => handleSort('email')}
              >
                Email <SortIcon field="email" />
              </th>
              <th
                className="px-6 py-3 text-left text-sm font-medium text-gray-500 cursor-pointer"
                onClick={() => handleSort('city')}
              >
                City <SortIcon field="city" />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td colSpan={4} className="px-6 py-4">
                    <TableRowSkeleton />
                  </td>
                </tr>
              ))
            ) : sortedUsers.length !== 0 ? (
              // Users data
              sortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.address.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <FiEye className="mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // No users found message
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <FiUsers className="w-12 h-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No Users Found</h3>
                    <p className="text-gray-500">
                      We couldn&apos;t find any users matching your search criteria.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal user={selectedUser} onClose={() => setSelectedUser(null)} />
    </div>
  );
}
