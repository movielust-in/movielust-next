'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import Modal from 'react-modal';

import { fetchAvatars, updateAvatar, deleteUser } from '../../helpers/user';

import styles from './account.module.scss';
import modalStyles from '../../styles/avatar_modal.module.scss';

function Account() {
  const router = useRouter();
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [avatars, setAvatars] = useState<any>();
  const [isUpdating, setUpdating] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openModal = () => setOpenAvatarModal((state) => !state);

  const closeModal = () => setOpenAvatarModal(false);

  const { data } = useSession();

  const user = data?.user;

  // useEffect(() => {
  //   if (!user) {
  //     router.push('/signin');
  //   }
  // }, [router, user]);

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(1,1,1,0.6)',
    },
  };

  useEffect(() => {
    if (avatars?.avatars?.length && avatars?.avatars?.length > 0) return;
    fetchAvatars().then((res) => {
      if (res && res.data && (res.data as any).length > 0)
        setAvatars(res.data as any);
    });
  }, [avatars?.avatars]);

  const changeProfile = (avatarId: number, link: string) => {
    if (user?.id) {
      updateAvatar(avatarId).then(() => {
        const userObj = {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: link,
          isLoggedIn: true,
        };
        // dispatch(setUserLogin(userObj));
        localStorage.setItem('user', JSON.stringify(userObj));
        setUpdating(false);
      });
    }
  };

  const logout = () => signOut();

  const confirmDelete = () => {
    setDeleteModal((state) => !state);
  };

  const deleteUserAccount = () => {
    if (user?.id) {
      deleteUser(user.id);
      localStorage.removeItem('movielust_user');
      router.push('/');
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Index}>
        <ul className={styles.List}>
          <li>
            <div className={styles.IndexItem}>Details</div>
          </li>
          <li>
            <div
              className={styles.IndexItem}
              style={{ color: 'gray', cursor: 'not-allowed' }}
            >
              Settings
            </div>
          </li>
          <li>
            <div
              className={styles.IndexItem}
              role="presentation"
              onClick={() => {
                confirmDelete();
              }}
            >
              Delete Account
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.Information}>
        {user?.image ? (
          <div
            className={styles.ProfilePicture}
            style={{
              backgroundImage: `url(${user.image})`,
            }}
            // src={user.image}
          >
            {isUpdating ? (
              <Image
                alt=""
                src="/images/player_loading.svg"
                width={100}
                unoptimized
                height={100}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            ) : (
              <div className={styles.Edit}>
                <FaEdit id="accountProfileEdit" onClick={openModal} />
              </div>
            )}
          </div>
        ) : (
          <div
            className={styles.ProfilePicture}
            style={{
              backgroundImage: `url(${user?.image})`,
            }}
            // src="/images/login.png"
          >
            {isUpdating ? (
              <Image
                alt=""
                src="/images/player_loading.svg"
                width={100}
                height={100}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            ) : (
              <FaEdit className={styles.Edit} onClick={openModal} />
            )}
          </div>
        )}

        <ul className={styles.List}>
          <li>
            <h6>Name</h6>
            <span>{user?.name} </span>
          </li>
          <li>
            <h6>Email</h6>
            <span>{user?.email}</span>
          </li>
          <li>
            <button className={styles.LogOut} type="button" onClick={logout}>
              Log out
            </button>
          </li>
        </ul>
      </div>

      <div>
        <Modal
          isOpen={openAvatarModal}
          onRequestClose={closeModal}
          style={customStyles}
          className={modalStyles.avatar_modal}
          contentLabel="profile"
          ariaHideApp={false}
        >
          {avatars &&
            avatars.length > 0 &&
            avatars.map((adata: { id: any; link: any }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                role="presentation"
                onClick={() => {
                  changeProfile(adata.id, adata.link);
                  openModal();
                  setUpdating(true);
                }}
                key={adata.id}
                src={adata.link}
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
          className={modalStyles.delete_modal}
          contentLabel="profile"
          ariaHideApp={false}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={styles.Sadimg} src="/images/sad.png" alt="Sad" />
          <h2 className={styles.DeletePrompt}>Are you sure?</h2>
          <div>
            <button
              type="button"
              className={`${styles.PromtButton} ${styles.No}`}
              onClick={confirmDelete}
            >
              No
            </button>
            <button
              type="button"
              className={`${styles.PromtButton} ${styles.Yes}`}
              onClick={deleteUserAccount}
            >
              Yes
            </button>
          </div>
          <div className={styles.Info}>
            *This action will permanantely delete all your account data.
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Account;
