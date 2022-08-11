/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { Collapse, Text, Button, Input, Loading } from '@nextui-org/react';
import './scss/accounts-styles.css';
import { AccountCardNext } from '../../Components/AccountCardNext';
import NewAccountModal from './NewAccountModal';
import NewAccountCardButtonNext from '../../Components/AccountCardNext/NewAccountCardButton';
// import { indexAccounts } from '../../api';
import { useDispatch, useSelector } from 'react-redux';

import { GetAccounts } from '../../redux/AccountsStore/Actions';

function Accounts() {
  const { Accounts: accounts, Loading: loading } = useSelector(
    (state) => state.accountsStore
  );
  const dispatch = useDispatch();

  const [newAccountVisible, setNewAccountVisible] = useState(false);

  //const [accounts, setAccounts] = useState({})
  //const [accountsLoaded,setAccountsLoaded] = useState(false)

  const newAccountHandler = () => setNewAccountVisible(true);
  const closeNewAccountHandler = () => {
    setNewAccountVisible(false);
  };

  // const [listView, setListView] = useState(false);
  // console.log(listView)

  useEffect(() => {
    dispatch(GetAccounts());
    // indexAccounts()
    //   .then((data) => setAccounts(data))
    //   .then(() => setAccountsLoaded(true));
  }, [dispatch]);

  // console.log(accounts);

  return (
    <>
      <div className="accounts-container">
        <div className="accounts-main">
          <Collapse.Group css={{ width: '100%' }}>
            <Collapse title="Instagram" expanded>
              <div className="instagram-container">
                <div className="options">
                  <Button
                    type="button"
                    // onPress={() => setListView(!listView)}
                    size="sm"
                    color="warning"
                    rounded
                  >
                    List View
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    color="warning"
                    rounded
                    onClick={newAccountHandler}
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
                <div className="instagram-cards">
                  {loading ? (
                    <div className="loading" style={{ height: '13rem' }}>
                      <Loading />
                    </div>
                  ) : (
                    accounts.map((account, index) => (
                      <AccountCardNext
                        path={'/account/' + account.id}
                        username={account.username}
                        key={index}
                      />
                    ))
                  )}
                  <NewAccountCardButtonNext newAccountHandler={newAccountHandler}/>
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
