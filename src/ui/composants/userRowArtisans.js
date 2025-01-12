// UserRow.js
import React from "react";
import ActionButton from "./actionButton";

const UserRowArtisan = ({ user }) => {
  return (
    <tr>
      <td>{user.order}</td>
      <td>{user.pict}</td>
      <td>{user.name}</td>
      <td>{user.lastName}</td>
      <td>{user.storeName}</td>
      <td>{user.contact}</td>
      <td>{user.email}</td>
      <td>{user.status}</td>
      <td>{user.delay}</td>
      <td>{user.subscriptionDate}</td>
      <td>{user.endDate}</td>
      <td>
        <ActionButton
          onEdit={() => handleEdit(user)}
          onDelete={() => handleDelete(user.id)}
        />
      </td>
    </tr>
  );
};

export default UserRowArtisans;
