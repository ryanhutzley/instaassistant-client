import React, { Suspense, useState, useTransition } from 'react';
import './accounts-styles.scss';

// * NEXTUI IMPORTS
import { Text, Button, Input } from '@nextui-org/react';

// * COMPONENT IMPORTS
import NewAccountModal from './NewAccountModal';
import DeleteConfirm from '../../components/Modals/DeleteConfirm';
import Loader from 'components/Loader';
import AccountsTable from 'components/Tables/AccountsTable';

function Accounts() {
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [isUpdating, startUpdating] = useTransition();

  const handleDeleteConfirmVisible = () => setDeleteConfirmVisible(true);
  const closeDeleteConfirmHandler = () => {
    setDeleteConfirmVisible(false);
  };

  const [newAccountVisible, setNewAccountVisible] = useState(false);
  const newAccountHandler = () => setNewAccountVisible(true);
  const closeNewAccountHandler = () => {
    setNewAccountVisible(false);
  };

  function updateSearchTerm(newVal) {
    startUpdating(() => {
      setSearchTerm(newVal);
    });
  }

  return (
    <>
      <div className="accounts-container">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '0',
            padding: '1rem',
            maxHeight: '10%',
          }}
        >
          {' '}
          <Text
            h1
            size={60}
            css={{
              textGradient: '45deg, $blue600 -20%, $pink600 50%',
              height: 'fit-content',
            }}
            weight="bold"
          >
            Account Management
          </Text>
          {/* <Dropdown>
            <Dropdown.Button flat color="secondary" css={{ tt: 'capitalize' }}>
              {selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selected}
              onSelectionChange={setSelected}
            >
              <Dropdown.Item key="All">All</Dropdown.Item>
              <Dropdown.Item key="Instagram">Instagram</Dropdown.Item>
              <Dropdown.Item key="Twitter">Twitter</Dropdown.Item>
              <Dropdown.Item key="TikTok">TikTok</Dropdown.Item>
              <Dropdown.Item key="Facebook">Facebook</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          <Input
            clearable
            underlined
            placeholder="Search"
            aria-label="search"
            color="secondary"
            size="xl"
            onChange={(e) => {
              updateSearchTerm(e.target.value);
            }}
          />
          <Button
            type="button"
            // size="sm"
            color="secondary"
            rounded
            onPress={newAccountHandler}
          >
            Add Account
          </Button>
        </div>
        {isUpdating ? (
          <Loader />
        ) : (
          <Suspense fallback={<Loader />}>
            <AccountsTable
              isUpdating={isUpdating}
              searchTerm={searchTerm}
              setUserToDelete={setUserToDelete}
              setDeleteConfirmVisible={setDeleteConfirmVisible}
              handleDeleteConfirmVisible={handleDeleteConfirmVisible}
            />
          </Suspense>
        )}
      </div>
      <NewAccountModal
        newAccountHandler={newAccountHandler}
        closeNewAccountHandler={closeNewAccountHandler}
        newAccountVisible={newAccountVisible}
      />
      <DeleteConfirm
        deleteConfirmVisible={deleteConfirmVisible}
        closeDeleteConfirmHandler={closeDeleteConfirmHandler}
        userInfo={userToDelete}
      />
      {/* <Base64Test/> */}
    </>
  );
}

export default Accounts;
