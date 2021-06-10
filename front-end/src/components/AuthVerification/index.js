import { useHistory } from 'react-router-dom';

export default function AuthVerification() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  if (!currentUser) history.push('/login');
}
