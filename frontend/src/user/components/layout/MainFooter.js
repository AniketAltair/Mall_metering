import React from "react";
import { Container, Row, Col } from "shards-react";
import jivasslogo from "../../assets/logo/jivasslogo.jpg";
class MainFooter extends React.Component {
  render() {
    return(
      <footer className="main-footer d-flex bg-white mb-0">
      <Container fluid={false} className=" flex" >
      <Row>
        <Col>
        <span className="copyright ml-auto my-auto mr-0">Copyright @ MallMeterings 2021</span>
        </Col  >
        <Col>
        </Col>
        <Col >
        Brought to you by Jivass Technologies   <img src={jivasslogo} alt="jivass logo"
        
        style={{
          maxWidth:"30px"
        }}
        className="footer-logo logo mt-1"/>

        </Col>
     
 
      </Row>
    </Container>
  </footer>

    )
  }
}

export default MainFooter;

