import React, { useState } from 'react';
import { Modal, Input, Button, Text, Spacer, Loading } from '@nextui-org/react';
import { CreateAccount, GetTask } from 'api';
import DropDown from 'components/DropDown';
import { platforms } from './constants';

const NewAccountModal = ({ newAccountVisible, closeNewAccountHandler }) => {
  const [pwd, setPwd] = useState('');
  const [pwdConf, setPwdConf] = useState('');
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('');
  const [newAccountSetup, setNewAccountSetup] = useState(null);
  const [tryingLogin, setTryingLogin] = useState(null);

  const HandleSubmit = (e) => {
    e.preventDefault();
    if (pwd !== pwdConf) {
      alert(
        'Passwords do not match. Double check your password is correct, then try again.'
      );
    } else {
      const payload = { username, password: pwd, platform };
      CreateAccount(payload).then((data) => {
        if (data.success) {
          alert('we got a success');
          setInterval(() => {
            GetTask(data.task_id).then((data) => {
              if (data.error) {
                alert('failed');
              } else if (data.status === 'COMPLETED') {
                clearInterval();
                window.location.replace('/accounts/' + data.account_id);
              } else if (data.status === 'IN_PROGRESS') {
                setTryingLogin(true);
              } else if (data.status === 'SCHEDULED') {
                setNewAccountSetup(true);
              }
            });
          }, 1000);
          setNewAccountSetup(false);
        } else if (data.error) {
          alert(data.error);
        }
      });
    }
  };

  return (
    <Modal
      blur
      closeButton
      preventClose
      aria-labelledby="modal-title"
      open={newAccountVisible}
      onClose={closeNewAccountHandler}
    >
      {newAccountSetup === null && (
        <>
          <Modal.Header>
            <Text id="modal-title" size={18}>
              <Text b size={18}>
                Add New Account
              </Text>
            </Text>
          </Modal.Header>
          <form onSubmit={HandleSubmit}>
            <Modal.Body>
              <DropDown
                options={platforms}
                name={'Platform'}
                setter={setPlatform}
              />
              <Input
                label="Username"
                labelLeft="@"
                underlined
                css={{ width: '100%' }}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Spacer />
              <Input.Password
                label="Password"
                type="password"
                underlined
                css={{ width: '100%' }}
                onChange={(e) => setPwd(e.target.value)}
              />
              <Spacer />
              <Input.Password
                label="Confirm password"
                type="password"
                underlined
                css={{ width: '100%' }}
                onChange={(e) => setPwdConf(e.target.value)}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button type="submit" color="secondary" rounded>
                Add Account
              </Button>
            </Modal.Footer>
          </form>
        </>
      )}

      {newAccountSetup === true && (
        <>
          <h2>Completing first time account setup</h2>
          <p>This could take up to 60s</p>
          <Loading size="xl" />
          {tryingLogin ? (
            <>
              <p>grabbing follower information for analytics</p>
            </>
          ) : (
            <>Establishing connection...</>
          )}
        </>
      )}
      <br />
    </Modal>
  );
};

export default NewAccountModal;
