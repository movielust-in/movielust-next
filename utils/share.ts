import { toast } from 'react-toastify';

import dashedTitle from './dashedTitle';

interface ShareProps {
  title: string;
  text?: string;
  url?: string;
  imageUrl?: string;
}

export const nativeShare = async ({
  title,
  text,
  url,
  imageUrl,
}: ShareProps) => {
  try {
    if (!navigator.share) {
      toast.warning('Not supported on current platform');
      return;
    }

    let shareOptions: any = {
      title,
      text: text ?? `Checkout ${title} on Movielust`,
      url: url ?? window.location.href,
    };

    if (imageUrl && navigator.canShare) {
      const imageRes = await fetch(imageUrl);
      const imageBlob = await imageRes.blob();

      const imageFile = new File([imageBlob], `${dashedTitle(title)}.png`, {
        type: 'image/png',
      });

      if (navigator.canShare({ files: [imageFile] })) {
        shareOptions = { ...shareOptions, files: [imageFile] };
      }
    }

    await navigator.share(shareOptions);
  } catch (err) {
    toast.error(err instanceof Error ? err.message : 'Something went wrong!');
  }
};
