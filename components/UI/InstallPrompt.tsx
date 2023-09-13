import { MutableRefObject } from 'react';
import { Id, toast } from 'react-toastify';

import BeforeInstallPromptEvent from '../../types/beforeInstallPrompt';

import styles from './ui.module.scss';

export default function InstallPrompt({
  beforeInstallPrompt,
  toastId,
  listnerRef,
}: {
  beforeInstallPrompt: BeforeInstallPromptEvent;
  toastId: MutableRefObject<Id>;
  listnerRef: MutableRefObject<(e: BeforeInstallPromptEvent) => void>;
}) {
  const dismiss = () => {
    toast.dismiss(toastId.current);
    window.removeEventListener(
      'beforeinstallprompt',
      listnerRef.current as any
    );
  };

  const prompt = async () => {
    beforeInstallPrompt.prompt();
    dismiss();
  };

  return (
    <div className={styles.InstallPromptContainer}>
      <div>Install Movielust on your device</div>
      <div className={styles.InstallPromptContainer_button_container}>
        <button
          onClick={dismiss}
          type="button"
          className={styles.InstallPromptContainer_button}
        >
          Not now
        </button>{' '}
        <button
          onClick={prompt}
          type="button"
          className={styles.InstallPromptContainer_button}
        >
          Install
        </button>
      </div>
    </div>
  );
}
