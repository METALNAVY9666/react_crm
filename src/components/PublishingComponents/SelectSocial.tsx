import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";

interface Props {
  socialName: string;
  src: string;
  social: boolean;
  setSocial: Dispatch<SetStateAction<boolean>>;
}

export default function SelectSocial({
  socialName,
  src,
  social,
  setSocial,
}: Props) {
  const [state, setState] = useState<boolean>();

  useEffect(() => {
    setState(social);
  }, []);

  return (
    <>
      <Container
        className={
          state ? "rounded bg-primary btn" : "rounded bg-secondary btn"
        }
        onClick={() => {
          setState(!state);
          setSocial(!state);
        }}
      >
        <Row>
          <Col>
            <h4>{socialName}</h4>
          </Col>
          <Col>
            <img src={src} width="32px" height="32px" />
          </Col>
        </Row>
      </Container>
    </>
  );
}
