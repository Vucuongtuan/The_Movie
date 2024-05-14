import { useContext } from 'react';
import { ProfileContext } from '../pages/Profile/layout';

export function useProfileData() {
  return useContext(ProfileContext);
}
