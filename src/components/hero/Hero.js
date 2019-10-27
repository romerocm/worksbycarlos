import React from "react"
import {Jumbotron} from "react-bootstrap"

//import custom styles
import "./hero.css"

const Hero = () => (
    <Jumbotron style={jumbo_styles} className="jumbo" fluid>
        <div className="jumbo_content">
            <h1>Hey, my name is Carlos.
                <span role="img" description="wave hand emoji">👋</span><br/>
                I am full-stack developer and I craft digital experiences. 🚀</h1>
            <br/>

            <span className="typed-animation" id="typed"></span>

            <p>Have a project you'd like to discuss?</p>
            <p>
                Let's talk:{" "}
                <a href="mailto:cmromero.dev@gmail.com">
                    <span style={{
                        color: "#b52e31"
                    }}>cmromero.dev@gmail.com</span>
                </a>
            </p>
        </div>
    </Jumbotron>

)

const jumbo_styles = {
    backgroundColor: "#f5f5f5",
    paddingLeft: "1rem"
}

export default Hero
