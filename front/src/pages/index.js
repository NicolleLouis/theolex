import styled from "styled-components";
import Head from "../components/head";
import Nav from "../components/nav";

const Wrapper = styled.div`
  text-align: center;
  img {
    width: 630px;
  }
`;

function Index() {
  return (
    <div>
      <Head title="Theolex" />
      <Nav />
      <Wrapper>
        Bienvenue
      </Wrapper>
    </div>
  );
}

export default Index;
