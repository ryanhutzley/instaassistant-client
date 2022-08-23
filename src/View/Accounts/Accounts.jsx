/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { Collapse, Text, Button, Input, Loading } from '@nextui-org/react';
import './scss/accounts-styles.css';
import { AccountCardNext } from 'Components/AccountCardNext';
import NewAccountModal from './NewAccountModal';
import NewAccountCardButtonNext from 'Components/AccountCardNext/NewAccountCardButton';
// import { indexAccounts } from '../../api';
import { useDispatch, useSelector } from 'react-redux';

import { GetAccounts } from 'redux/AccountsStore/Actions';

function Accounts() {

  const { Accounts: accounts, Loading: loading } = useSelector(
    (state) => state.accountsStore
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAccounts());
  }, [ dispatch]);

  const [newAccountVisible, setNewAccountVisible] = useState(false);
  const newAccountHandler = () => setNewAccountVisible(true);
  const closeNewAccountHandler = () => {
    setNewAccountVisible(false);
  };

  return (
    <>
      <div className="accounts-container">
        <div className="accounts-main">
          <Collapse.Group css={{ width: '100%' }}>
            <Collapse title="Instagram" expanded>
              <div className="instagram-container">
                <div className="options">
                  <Button type="button" size="sm" color="warning" rounded>
                    List View
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    color="warning"
                    rounded
                    onPress={newAccountHandler}
                  >
                    Add Account
                  </Button>
                  <Input
                    clearable
                    underlined
                    labelPlaceholder="Search"
                    color="secondary"
                    size="xl"
                  ></Input>
                </div>
                <div
                  className="instagram-cards"
                  style={{
                    minHeight: '15rem',
                  }}
                >
                  {loading && (
                    <Loading style={{ margin: 'auto' }} />
                  ) }
                  { accounts.length > 0 && (
                    accounts.map((account, index) => (
                      <AccountCardNext
                        path={'/instagram/account/' + account.id}
                        username={account.username}
                        key={index}
                      />
                    ))
                  )}
                  <NewAccountCardButtonNext handler={newAccountHandler} />
                </div>
              </div>
            </Collapse>
            <Collapse title="TikTok">
              <Text>Coming soon!</Text>
            </Collapse>
            <Collapse title="Twitter">
              <Text>Coming soon!</Text>
            </Collapse>
            <Collapse title="Facebook">
              <Text>Coming soon!</Text>
            </Collapse>
            <Collapse title="Youtube">
              <Text>Coming soon!</Text>
            </Collapse>
          </Collapse.Group>
        </div>
      </div>
      <NewAccountModal
        newAccountHandler={newAccountHandler}
        closeNewAccountHandler={closeNewAccountHandler}
        newAccountVisible={newAccountVisible}
      />
    </>
  );
}

export default Accounts;
