import { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import Pagination from './Pagination';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${currentPage}`);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (err) {
        setMessage('Failed to fetch users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, [currentPage]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      setMessage('User deleted successfully');
    } catch (err) {
      setMessage('Failed to delete user');
    }
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, updatedData);
      setUsers(users.map(user => 
        user.id === id ? { ...user, ...updatedData } : user
      ));
      setMessage('User updated successfully');
    } catch (err) {
      setMessage('Failed to update user');
    }
  };

  return (
    <div className="user-list">
      <h2>User List</h2>
      {message && <div className="message">{message}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <UserTable 
            users={users} 
            onDelete={handleDelete} 
            onUpdate={handleUpdate} 
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default UserList;