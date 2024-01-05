import { useEffect, useState } from 'react';
import StorageHelper, { StorageKeys } from '../../utils/StorageHelper';

export const useFirstTimeAppOpen = () => {
    const [isFirstTime, setIsFirstTime] = useState(true);

    useEffect(() => {
        const checkFirstTime = async () => {
            try {
                const isFirstTimeValue = await StorageHelper.getItem(StorageKeys.IS_APP_OPEND_FIRSTTIME);

                if (!isFirstTimeValue) {
                    setIsFirstTime(true);
                    await StorageHelper.saveItem(StorageKeys.IS_APP_OPEND_FIRSTTIME, 'false');
                } else {
                    setIsFirstTime(false);
                }
            } catch (error) {
                console.error('Error while checking first-time status:', error);
            }
        };

        checkFirstTime();
    }, []);

    return isFirstTime;
};
