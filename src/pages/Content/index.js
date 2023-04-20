
const rootElement = document.createElement("div");
rootElement.id = "react-chrome-app";

const globalStyles = document.createElement("style");
globalStyles.innerHTML = `
  #${rootElement.id} {
  position: absolute;
  left: 100px;
  top: 100px;
  width: 150px;
  height: 100px;
  background: red;
  border-right: 1px solid #c2c2c2;
  z-index: 999999999;
  }
`;
document.body.appendChild(rootElement);
document.body.appendChild(globalStyles);
