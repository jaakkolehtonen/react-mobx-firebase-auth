import * as React from "react";

const style: any = {
  animation: "loading-spinner 0.5s infinite linear",
  borderBottom: "3px solid rgba(0, 0, 0, 0.1)",
  borderLeft: "3px solid #818a91",
  borderRadius: "50%",
  borderRight: "3px solid rgba(0, 0, 0, 0.1)",
  borderTop: "3px solid rgba(0, 0, 0, 0.1)",
  height: "40px",
  margin: "90px auto",
  position: "relative",
  transform: "translateZ(0)",
  width: "40px"
};

class LoadingSpinner extends React.Component<any, any> {
  public render() {
    return (
      <div className="loading-spinner" style={style}>
        <style>
          {`
        @keyframes loading-spinner {
          0% { transform : rotate(0deg); }
          100% { transform : rotate(360deg); }
        }
        `}
        </style>
      </div>
    );
  }
}

export default LoadingSpinner;
