import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
import 'views/Accounts/accounts-styles.scss';

// * STYLED COMPONENTS
import { Tr, Eye, Trash, Task, Username } from 'components/styled.js';

// * UTILS IMPORTS
import { platformIcon } from 'utils';

// * ICON IMPORTS
import { AiOutlineMessage } from 'react-icons/ai';
import { FaRegEnvelopeOpen } from 'react-icons/fa';
import { FiHeart, FiUserPlus, FiUserMinus } from 'react-icons/fi';
/**
 * @function AccountsRow
 * @description Renders a row for each account
 * @param user object, handleDeleteConfirmVisible and setUserToDelete function
 * @returns row for user account
 */
function AccountsRow({ user, handleDeleteConfirmVisible, setUserToDelete, i }) {
  const navigate = useNavigate();
  return (
    <Tr
      key={user.id}
      role="row"
      aria-rowindex={i}
      onClick={() => {
        navigate(`/accounts/${user.id}`);
      }}
    >
      <td className="username-column" aria-label="username-cell" role="cell">
        <Avatar
          name={user.username}
          round
          value="25%"
          size="35"
          textSizeRatio={2}
        />
        <Link to={`/accounts/${user.id}`}>
          <Username>@{user.username}</Username>
        </Link>
      </td>
      <td aria-label="platform-cell" role="cell">
        {platformIcon(user.platform)}
      </td>
      <td aria-label="tags-cell" role="cell">
        {user.tags}
      </td>
      <td aria-label="active-cell" role="cell">
        {user.active ? 'Active' : 'Idle'}
      </td>
      <td className="config-column" aria-label="config-cell" role="cell">
        {user.allow_like && <FiHeart title="Liking enabled" />}
        {user.allow_comment && <AiOutlineMessage title="Commenting enabled" />}
        {user.allow_dm && <FaRegEnvelopeOpen title="Messaging enabled" />}
        {user.allow_follow && <FiUserPlus title="Following enabled" />}
        {user.allow_unfollow && <FiUserMinus title="Unfollowing enabled" />}
      </td>
      <td
        className="actions-column"
        aria-label="actions-cell"
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <Link to={`/accounts/${user.id}`}>
          <Eye title="View account" size="20" />
        </Link>
        <Link to={`/accounts/${user.id}/tasks`}>
          <Task title="View Tasks" size="20" />
        </Link>
        <Trash
          title="Delete account"
          onClick={() => {
            handleDeleteConfirmVisible();
            setUserToDelete(user);
          }}
          size="20"
        />
      </td>
    </Tr>
  );
}

export default AccountsRow;
