import logo from "./logo.svg";
import "antd";
import "./styles.css";
import { Layout, Menu, Breadcrumb } from "antd";
import { Typography } from "antd";
import { Input, Space } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button } from "./constants.js";
const { Search } = Input;

const { Title } = Typography;
const { Header, Content, Footer } = Layout;
function App() {
  return (
    <div
      style={{
        backgroundColor: "#F6F6F6",
        position: "fixed",
        padding: 0,
        margin: 0,

        top: 0,
        left: 0,

        width: "100%",
        height: "100%",
      }}
    >
      <Header style={{ backgroundColor: "white" }}>
        <p
          style={{
            fontFamily: "-apple-system",
            fontSize: "40px",
            color: "#D1D3D4",
            paddingTop: "5px",
          }}
        >
          ALAN
        </p>
      </Header>
      <div
        style={{
          width: "80%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          margin: "auto",
          paddingTop: "10%",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            height: "50%",
            justifyContent: "space-between",
          }}
        >
          <Title
            style={{
              fontFamily: "-apple-system",
              fontSize: "60px",
              color: "#2D2D2D",
            }}
          >
            Get up to a{" "}
            <span
              style={{
                borderBottom: "10px solid #8F9CC1",
              }}
            >
              $5,000
            </span>{" "}
            refund in{" "}
            <span
              style={{
                borderBottom: "10px solid #8F9CC1",
              }}
            >
              10 minutes
            </span>{" "}
          </Title>
          <div style={{ margin: "5px", position: "relative", height: "100px" }}>
            {/* <Input
              size="large"
              placeholder="Enter your email address"
              style={{
                height: "75px",
                position: "absolute",
                border: "1px solid #2D2D2D",
                backgroundColor: "F6F6F6",
              }}
            ></Input> */}

            <button class="btn">Calculate my refund</button>
          </div>
          <p
            style={{
              fontFamily: "-apple-system",
              fontSize: "16px",
              paddingTop: "10px",
              color: "#2D2D2D",
              lineHeight: "20px",
            }}
          >
            Get what you’re owed. We are focused on helping you understand and
            quickly file for credits you’re uniquely qualified for.
          </p>
        </div>
        <div style={{ width: "50%" }}></div>
      </div>
    </div>
  );
}

export default App;
