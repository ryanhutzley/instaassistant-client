import React, { useEffect, useState } from 'react';
import './scss/profile-styles.css';
import { UserIcon } from '../../Components/UserIcon';
import { Button, Text } from '@nextui-org/react';
import { GetUserInfo } from '../../api';
import EditProfile from './EditProfile';

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  // console.log(userInfo)
  const [userLoaded, setUserLoaded] = useState(false);
  const [editProfileVisible, setEditProfileVisible] = useState(false);

  const editProfileHandler = () => setEditProfileVisible(true);
  const closeEditProfileHandler = () => {
    setEditProfileVisible(false);
  };

  useEffect(() => {
    GetUserInfo()
      .then((data) => setUserInfo(data))
      .then(() => setUserLoaded(true));
  }, []);

  return (
    <div className="profile-main">
      <div className="profile">
        <div className="profile-header">
          <UserIcon
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            name={userInfo.username}
            size="xl"
          />

          <Button variant="primary" onPress={editProfileHandler} rounded>Edit</Button>
        </div>
        <div className="profile-content">
          <Text>
            Thank you for becoming a Marcus Bot user. make sure your billing
            information is up to date or change your email/pass word form this
            page.
          </Text>
          <Text
            css={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
              gap: '1rem',
            }}
          >
            {userLoaded && (
              <>
                <span>Company Email: {userInfo.email}</span>
                <span>Company Phone: {userInfo.phone}</span>
                <span>Company Address: {userInfo.address}</span>
                <span>Company Website: {userInfo.website}</span>
                <span>Accounts Managed: {userInfo.accountsManaged}</span>
                <span>Billing Information: {userInfo.billing}</span>
                <span>Payment Status: {userInfo.billStatus}</span>
                <span>Company Logo: {userInfo.logo}</span>
              </>
            )}
          </Text>
        </div>
      </div>
      <EditProfile
        editProfileVisible={editProfileVisible}
        closeEditProfileHandler={closeEditProfileHandler}
      />
    </div>
  );
}

export default Profile;
