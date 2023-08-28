import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import '../styles/Button.css'

function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

const LoadingButton = ({ buttonText, onClick }) => {

    const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      simulateNetworkRequest().then(() => {
        setLoading(false);
      });
    }}, [isLoading]);

  const handleClick = async () => {
    setLoading(true);
   await onClick();
  }

  return (
    <Button
      className='color-button mb-3'
      type="submit"
      disabled={isLoading}
      onClick={!isLoading ? handleClick : null}>
      {isLoading ? 'Cargando…' : buttonText}
    </Button>
  )
}

export default LoadingButton