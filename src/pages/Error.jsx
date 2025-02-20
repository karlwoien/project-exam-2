import { useTitle } from '../hooks/useTitle';

export default function Error() {
  useTitle('404');
  return <p>Error</p>;
}
