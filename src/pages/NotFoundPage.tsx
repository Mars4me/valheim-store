import { Alert } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(-1 as any, { replace: true });
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  });
  return (
    <>
      <Alert variant="danger" className="d-flex flex-column justify-content-center align-items-center" >
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <Alert.Heading>Redirect to Home</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio
          sem nec elit. Cras mattis consectetur purus sit amet fermentum. Redirect to home in 5 seconds.
        </p>
        <CountdownCircleTimer
          isPlaying
          duration={5}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </Alert>
    </>
  );
};

export default NotFoundPage;
