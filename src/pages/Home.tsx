import React, { FC, Suspense } from "react";
import { Button, Container } from "react-bootstrap";
const VideoBack = React.lazy(() => import("../components/VideoBackground/VideoBackground"));
import { Portal } from "react-portal";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container className="d-flex align-items-center justify-content-center" style={{ zIndex: 1, height: "80vh" }}>
        <Container className="text-center text-white">
          <h1 className="display-1 mb-1">Valheim</h1>
          <h5 className="mb-4 ">start your journey</h5>
          <Button variant="outline-light" onClick={() => navigate("/store")} className="btn-lg m-2 mw-50">
            <span>go to store</span>
          </Button>
          <Button variant="outline-light" onClick={() => navigate("/about")} className="btn-lg m-2 mw-50">
            <span>about service</span>
          </Button>
        </Container>
      </Container>
      <Portal node={document.getElementById("background")}>
        <Suspense fallback={<span>Loading...</span>}>
          <VideoBack />
        </Suspense>
      </Portal>
    </>
  );
};

export default Home;
