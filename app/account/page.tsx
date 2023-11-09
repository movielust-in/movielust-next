'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { FaEdit } from 'react-icons/fa';
import { signOut, useSession } from 'next-auth/react';
import Modal from 'react-modal';

import modalStyles from '../../styles/avatar_modal.module.scss';
import Loading from '../loading';

import styles from './account.module.scss';

function Account() {
  const router = useRouter();
  const [openAvatarModal, setOpenAvatarModal] = useState(false);
  const [avatars, setAvatars] = useState<any>([]);
  const [isUpdating, setUpdating] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const openModal = () => setOpenAvatarModal((state) => !state);

  const closeModal = () => setOpenAvatarModal(false);

  const { status, data, update: updateSession } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/signin');
    }
  }, [status]);

  const user = data?.user;

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(1,1,1,0.6)',
    },
  };

  useEffect(() => {
    document.title = 'Account | Movielust';
    if (avatars?.length && avatars?.length > 0) return;
    fetch('/api/avatars')
      .then((res) => res.json())
      .then((res) => {
        if (res && res.data.avatars && res.data.avatars.length > 0)
          setAvatars(res.data.avatars);
      });
  }, [avatars?.length]);

  const changeAvatar = async (link: string) => {
    setUpdating(true);
    await fetch('/api/user/avatar', {
      method: 'PUT',
      body: JSON.stringify({ avatar_url: link }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    await updateSession({ image: link });
    setUpdating(false);
  };

  const logout = () => signOut();

  const confirmDelete = () => {
    setDeleteModal((state) => !state);
  };

  const deleteUserAccount = async () => {
    if (user) {
      const res = await fetch('/api/user/account', { method: 'DELETE' });
      if (res.status === 204) {
        await signOut({ redirect: true });
        router.push('/');
      }
    }
  };

  if (status === 'loading') return <Loading />;

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
        <div
          className={styles.ProfilePicture}
          style={{
            backgroundImage: `url(${user?.image})`,
          }}
        >
          {isUpdating ? (
            <Image
              alt=""
              src="/images/svgs/spinner.svg"
              width={100}
              unoptimized
              height={100}
              style={{
                maxWidth: '100%',
                height: 'auto',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
              }}
            />
          ) : (
            <div className={styles.Edit}>
              <FaEdit className="accountProfileEdit" onClick={openModal} />
            </div>
          )}
        </div>

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
            avatars.map((adata: { link: any }) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                role="presentation"
                onClick={() => {
                  changeAvatar(adata.link);
                  openModal();
                  setUpdating(true);
                }}
                key={adata.link}
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
