import { useState } from 'react';
import EditUserForm from './EditUserForm';

const UserTable = ({ users, onDelete, onUpdate }) => {
  const [editUser, setEditUser] = useState(null);

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleSubmit = (updatedData) => {
    onUpdate(editUser.id, updatedData);
    setEditUser(null);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <img 
                  src={user.avatar} 
                  alt={`${user.first_name} ${user.last_name}`} 
                  className="avatar"
                />
              </td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editUser && (
        <EditUserForm 
          user={editUser} 
          onSubmit={handleSubmit} 
          onCancel={() => setEditUser(null)}
        />
      )}
    </div>
  );
};

export default UserTable;