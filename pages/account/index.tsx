import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { FaEdit } from 'react-icons/fa';

import { useSelector, useDispatch } from '../../redux';
import { setSignOut, setUserLogin } from '../../redux/reducers/user.reducer';
import { fetchAvatars, updateAvatar, deleteUser } from '../../helpers/user';

import styles from '../../styles/avatar_modal.module.scss';

import { Avatar } from '../../types/avatar';

const Modal = dynamic(() => import('react-modal'));

function Account() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user);
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [isUpdating, setUpdating] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openModal = useCallback(() => {
    setOpenAvatarModal((state) => !state);
  }, []);

  const closeModal = useCallback(() => {
    setOpenAvatarModal(false);
  }, []);

  useEffect(() => {
    if (!user.isLoggedIn) {
      router.push('/signin');
    }
  }, [router, user]);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(1,1,1,0.6)',
    },
  };

  useEffect(() => {
    if (avatars.length > 0) return;
    fetchAvatars().then((data) => setAvatars(data));
  }, [avatars]);

  const changeProfile = (avatarId: number, link: string) => {
    if (user.id) {
      updateAvatar(avatarId).then(() => {
        const userObj = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: link,
          isLoggedIn: true,
          token: user.token,
        };
        dispatch(setUserLogin(userObj));
        localStorage.setItem('user', JSON.stringify(userObj));
        setUpdating(false);
      });
    }
  };

  const logout = () => dispatch(setSignOut());

  const confirmDelete = () => {
    setDeleteModal((state) => !state);
  };

  const deleteUserAccount = () => {
    if (user.id) {
      deleteUser(user.id);
      dispatch(
        setUserLogin({
          id: null,
          name: null,
          email: null,
          avatar: null,
          isLoggedIn: false,
          token: null,
        })
      );
      localStorage.removeItem('movielust_user');
      router.push('/');
    }
  };

  return (
    <Container className="header_padding">
      <Head>
        <title>Account - Movielust</title>
      </Head>
      <Index>
        <List>
          <li>
            <IndexItem>Details</IndexItem>
          </li>
          <li>
            <IndexItem style={{ color: 'gray', cursor: 'not-allowed' }}>
              Settings
            </IndexItem>
          </li>
          <li>
            <IndexItem
              role="presentation"
              onClick={() => {
                confirmDelete();
              }}
            >
              Delete Account
            </IndexItem>
          </li>
        </List>
      </Index>

      <Information>
        {user.avatar ? (
          <ProfilePicture src={user.avatar}>
            {isUpdating ? (
              <Image
                src="/images/player_loading.svg"
                width={100}
                unoptimized
                height={100}
              />
            ) : (
              <Edit id="accountProfileEdit" onClick={openModal} />
            )}
          </ProfilePicture>
        ) : (
          <ProfilePicture src="/images/login.png">
            {isUpdating ? (
              <Image
                src="/images/player_loading.svg"
                width={100}
                height={100}
              />
            ) : (
              <Edit onClick={openModal} />
            )}
          </ProfilePicture>
        )}

        <List>
          <li>
            <h6>Name</h6>
            <span>{user.name} </span>
          </li>
          <li>
            <h6>Email</h6>
            <span>{user.email}</span>
          </li>
          <li>
            <LogOut onClick={logout}>Log out</LogOut>
          </li>
        </List>
      </Information>

      <div>
        <Modal
          isOpen={openAvatarModal}
          onRequestClose={closeModal}
          style={customStyles}
          className={styles.avatar_modal}
          contentLabel="profile"
          ariaHideApp={false}
        >
          {avatars &&
            avatars.length > 0 &&
            avatars.map((data) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                role="presentation"
                onClick={() => {
                  changeProfile(data.id, data.link);
                  openModal();
                  setUpdating(true);
                }}
                key={data.id}
                src={data.link}
                alt="Profile"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src =
                    'https://occ-0-2482-2186.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAAFAx0vpY-2wMoKq6NB86jynopBLEWBi4jkOR6n3A1-bSFo7edA95Qkn5-LVZad5km8LWJ_xqMz67rHxY1SVKXxf17Ng.png';
                }}
              />
            ))}
        </Modal>
        <Modal
          isOpen={deleteModal}
          onRequestClose={confirmDelete}
          style={customStyles}
          className={styles.delete_modal}
          contentLabel="profile"
          ariaHideApp={false}
        >
          <Sadimg src="/images/sad.png" alt="Sad" />
          <DeletePrompt>Are you sure?</DeletePrompt>
          <div>
            <No onClick={confirmDelete}>No</No>
            <Yes onClick={deleteUserAccount}>Yes</Yes>
          </div>
          <Info>
            *This action will permanantely delete all your account data.
          </Info>
        </Modal>
      </div>
    </Container>
  );
}

export default Account;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  margin-bottom: 51px;
  margin-top: 90px;
  min-height: 100%;
  padding: 0 100px;

  @media (max-width: 724px) {
    flex-direction: column-reverse;
    margin-top: 30px;
    padding: 0 30px;
  }

  @media (max-width: 724px) and (display-mode: standalone),
    (max-width: 870px) and (display-mode: standalone) {
    margin-top: 65;
  }
`;

const slideInL = keyframes`
from{transform:translateX(-100%);}
to{transform:translateX(0);}
`;

const slideInU = keyframes`
from{transform:translateY(-100px);}
to{transform:translateY(0);}
`;

const slideInR = keyframes`
from{transform:translateX(100%);}
to{transform:translateX(0);}
`;

const LogOut = styled.button`
  background-color: rgba(120, 0, 0, 1);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  margin: 0 15px 10px 85%;
  padding: 8px 20px;
  &:hover {
    background-color: rgba(250, 0, 0, 1);
  }
  @media (max-width: 870px) {
    margin: 0 15px 10px 70%;
  }
  @media (max-width: 724px) {
    padding: 8px 20px;
    margin: 0 15px 10px 60%;
  }
`;

const DeletePrompt = styled.h2`
  /* animation: ${slideInU} 400ms ease 1; */
  color: white;
  margin: 10px;
  text-align: center;
`;

const PromptButton = styled.button`
  border: 1px solid silver;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: medium;
  font-weight: bold;
  margin: 10px;
  padding: 10px 20px;
`;

const Yes = styled(PromptButton)`
  /* animation: ${slideInR} 400ms ease 1; */
  background-color: rgba(255, 0, 0, 0.8);
`;

const No = styled(PromptButton)`
  /* animation: ${slideInL} 400ms ease 1; */
  background-color: rgba(128, 128, 128, 0.8);
`;

const IndexItem = styled.div`
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
`;

const Index = styled.div`
  background-color: #090c14;
  background-image: linear-gradient(315deg, #090c14 0%, #031d30 79%);
  border: 2px solid silver;
  border-radius: 22px;
  display: flex;
  flex: 1;
  height: 40%;
  justify-content: center;
  max-width: 380px;
  position: sticky;
  top: 60px;
  width: 300px;
  ul {
    width: 100%;
    li {
      h6 {
        font-size: 20px;
        font-weight: bold;
        margin: 12px;
      }

      border-bottom: 1px solid silver;
      text-align: center;
    }
    li:last-child {
      border: none;
    }
  }
  @media (max-width: 724px) {
    margin-bottom: 10px;
    width: 100%;
    position: relative;
    top: 0;
    ul {
      li {
        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
`;

const List = styled.ul`
  border-top: 0.1px solid rgba(192, 192, 192, 0.2);
  list-style: none;
  margin: 2px;
  padding: 0;
`;
const Info = styled.div`
  color: rgba(255, 0, 0, 1);
  font-size: 12px;
  padding: 10px;
  text-align: center;
`;

const Sadimg = styled.img`
  /* animation: ${slideInU} 500ms ease 1; */
  margin: 20px 0 0 0;
  width: 80px;
`;

const Information = styled.div`
  background-color: #090c14;
  background-image: linear-gradient(315deg, #090c14 0%, #031d30 79%);
  border: 2px solid silver;
  border-radius: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 10px;

  ul {
    /* stylelint-disable-next-line no-descending-specificity */
    li {
      h6 {
        font-size: 1rem;
        font-weight: 300;

        margin: 15px;
        opacity: 0.6;
      }
      span {
        display: inline-block;
        font-size: 1.2rem;
        font-weight: 400;
        margin: 10px;
        opacity: 1;
        padding: 5px;
        transition: all 250ms;
      }
      border-bottom: 0.1px solid rgba(192, 192, 192, 0.2);

      margin: 25px 5px;

      &:last-child {
        border-bottom: none;
      }
    }
  }
  @media (max-width: 724px) {
    margin-left: 0;
    margin-bottom: 20px;
    div {
      img {
        width: 70px;
        height: 70px;
      }
    }
  }
`;

const Edit = styled(FaEdit)`
  background-color: rgba(1, 1, 1, 0.3);
  border-radius: 100%;
  display: none;
  height: 100%;
  padding: 60px;
  width: 100%;
`;

const ProfilePicture = styled.div<{ src: string }>`
  align-items: center;
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  /* align-self: flex-end; */
  background-size: cover;
  border-radius: 100%;
  cursor: pointer;
  display: flex;
  height: 150px;
  justify-content: center;
  margin: 10px 30px;
  transition: all 200ms ease;

  &:hover {
    #accountProfileEdit {
      display: flex;
    }
  }
  width: 150px;
`;
