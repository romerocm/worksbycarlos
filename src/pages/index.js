import React from "react"
import Layout from "../components/layout/Layout"

import Hero from "../components/hero/Hero"
import Projects from "../components/projects/Projects"

//import bootstrap styles
import "../bootstrap/css/bootstrap.min.css"

//import my custom styles
import "./index.css"


export default () => (
  <div className="App">
    <Layout>
      <Hero />
      <hr />
      <Projects />
      <hr />
    </Layout>
  </div>
)
