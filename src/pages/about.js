import React from "react"
import Layout from "../components/layout/Layout"
import MyJumbo from "../components/myJumbo/MyJumbo"
import MyButton from "../components/myButton/MyButton"

import "../fontawesome/css/all.min.css"
import "./index.css"

import { Container, Row, Col } from "react-bootstrap"

import CV from "/" //Import you CV file here!
import other from "/" //Import other downloadable here

export default () => (
  <div className="App">
    <Layout>
      <MyJumbo
        body={
          "Work In Progress"
        }
        body2={"ask me anything though."}
        title={"WHO'S THIS DUDE? THE MAN, THE LEGEND?"}
      />
      <hr />
      <Container fluid>
        <Row style={{ marginTop: "2rem", marginBottom: "1.5rem" }}>
          <MyButton text={"CV download"} URL={CV} />
          <MyButton text={"Other Downloadable"} URL={other} />
        </Row>
        <Row>
          <Col>
            <h3>Summary</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h5> Let's just say that I'd like to make the world a better place, but they won't give me the source code...</h5>
            <br />
            <p>
            Jokes aside, I am full-stack developer and a passionate innovator. I am constantly developing myself further in my niches and expanding my knowledge of other areas. 
            I test out, select, and implement strategies that work best with clients and myself. This applies to my coding, business development, and creative work.
              <br />
              <br />
            </p>
          </Col>
        </Row>
        <hr />
        {/* This is the beginning of the career section*/}
        <Row>
          <Col>
            <h3>Past work experience</h3>
          </Col>
        </Row>
        {/* Position number 1*/}
        <Row>
          <Col>
            <h5>Creaciones 3D / Digital Consultancy & Web Design</h5>
          </Col>
        </Row>
        <Row>
          <Col>El Salvador, San Salvador | Remote</Col>
          <Col>2019.02 - 2019.08</Col>
        </Row>
        <Row>
          <Col>
            <p style={{ marginTop: "1rem" }}>
            ↳ Interviewed client to get a grasp of what they were looking for as a brand, sketched out, and defined the company’s logo.<br></br>
            ↳ Delivered consultancy on how to build their social presence on Instagram & Facebook.<br></br>
            ↳ Coordinated closely with UI/UX and Design. Prototyped and Wireframed.<br></br>
            ↳ Integrated Chabot and linked to client’s Facebook page.

            </p>
          </Col>
        </Row>
        <hr />
        {/* SW intern Position*/}
        {/* <Row>
          <Col>
            <h5>Software Engineer Intern</h5>
          </Col>
        </Row>
        <Row>
          <Col>Mip Mip Co LTD, Roadrunner City, US&A</Col>
          <Col>2014.06 - 2014.09</Col>
        </Row>
        <Row>
          <Col>
            <p style={{ marginTop: "1rem" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              ullam eius nihil porro itaque nobis facere. Impedit eos minima
              porro. Culpa, laboriosam! Qui quo provident aperiam et ullam odio
              ex.
            </p>
          </Col>
        </Row>
        <hr /> */}
        {/* This is the beginning of the education section*/}
        <Row>
          <Col>
            <h3>Education</h3>
          </Col>
        </Row>
        {/* Masters Degreee*/}
        <Row>
          <Col>
            <h5>Universidad Evangélica de El Salvador / Computer Systems Engineer</h5>
          </Col>
        </Row>
        <Row>
          <Col>Universidad Evangélica, San Salvador, El Salvador</Col>
          <Col>2016.01 - Current</Col>
        </Row>
        <Row>
          <Col>
            <p style={{ marginTop: "1rem" }}>
              {/* <strong>Specialization:</strong>
              <br /> Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Tenetur quasi fugit accusamus officia sequi optio nulla,
              cupiditate in vitae natus odit nihil commodi corrupti mollitia
              necessitatibus iure eius praesentium? Fugit! */}
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  </div>
);
