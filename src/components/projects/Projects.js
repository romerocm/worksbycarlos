import React from "react"
import { Link } from "gatsby"
import { Container } from "react-bootstrap"
import "./projects.css"

import ProjectCard from "../portProjectCard/ProjectCard"

import image from "../../images/portfolio/budgetReactApp.png"

const Projects = () => (
  <React.Fragment>
    <Container fluid>
      <h3 style={{ marginBottom: "1rem" }}> Latest Projects</h3>
      {/*/Props: 
      //imageSrcPath: the path to the image used 
      //title: The title of the card/App 
      //date: The date of the card
      //description: Short description of the card 
      //sourceURL: URL to the source code of the project 
      //hostedURL: URL to the hosted version of the app*/}
      <ProjectCard
        imageSrcPath={image}
        title={"Budget React app"}
        date={"2019-03-28"}
        description={
          "Built a Web Based application using React to keep track of user expenses. The application is hosted on Heroku and is using Firebase as its database to keep track of user data and its account creation using Google's login API. "
        }
        sourceURL={"https://github.com/romerocm/control-de-gastos-react"}
        hostedURL={"https://control-gastos-react-2.herokuapp.com/"}
      />
      <Link to="/projects" className="redCarlos">
        Go to Projects page ---->
      </Link>
    </Container>
  </React.Fragment>
)

export default Projects
