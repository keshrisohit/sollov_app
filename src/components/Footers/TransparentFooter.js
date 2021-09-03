/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

function TransparentFooter() {
  return (
    <footer className="footer">
      <Container>
        <nav>
          <ul>
            <li>
              @solove
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/sohit-kumar/"
                target="_blank"
              >
                About Me
              </a>
            </li>
            <li>
              {/* <a
                href="http://blog.creative-tim.com?ref=nukr-transparent-footer"
                target="_blank"
              >
                Blog
              </a> */}
            </li>
          </ul>
        </nav>
        <div className="copyright" id="copyright">
          © {new Date().getFullYear()}, 
          
          . Coded by{" "}
          <a
            href="https://www.linkedin.com/in/sohit-kumar/"
            target="_blank"
          >
            Sohit
          </a>
          .
        </div>
      </Container>
    </footer>
  );
}

export default TransparentFooter;
