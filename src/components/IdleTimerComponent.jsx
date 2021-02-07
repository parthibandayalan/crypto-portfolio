import React, { useState, useRef } from "react";
import IdleTimer from "react-idle-timer";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

Modal.setAppElement("#root");

const useStyles = makeStyles(() => ({
  modal: {
    position:
      "fixed" /* Stay in place front is invalid - may break your css so removed */,
    paddingTop:
      "100px" /* Location of the box - don't know what this does?  If it is to move your modal down by 100px, then just change top below to 100px and remove this*/,
    left: 0,
    right: 0 /* Full width (left and right 0) */,
    top: 0,
    bottom: 0 /* Full height top and bottom 0 */,
    overflow: "auto" /* Enable scroll if needed */,
    backgroundColor: "rgb(0, 0, 0)" /* Fallback color */,
    backgroundColor: "rgba(0, 0, 0, 0.4)" /* Black w/ opacity */,
    zIndex: 9999 /* Sit on top - higher than any other z-index in your site*/,
  },
}));

function IdleTimerContainer() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const idleTimerRef = useRef(null);
  const sessionTimeoutRef = useRef(null);
  const classes = useStyles();
  const onIdle = () => {
    console.log("User is idle");
    setModalIsOpen(true);
    sessionTimeoutRef.current = setTimeout(logOut, 5000);
  };

  const logOut = () => {
    setModalIsOpen(false);
    setIsLoggedIn(false);
    clearTimeout(sessionTimeoutRef.current);
    console.log("User has been logged out");
  };
  const stayActive = () => {
    setModalIsOpen(false);
    clearTimeout(sessionTimeoutRef.current);
    console.log("User is active");
  };
  return (
    <div>
      {/* {isLoggedIn ? <h2>Hello Vishwas</h2> : <h2>Hello Guest</h2>} */}
      <IdleTimer ref={idleTimerRef} timeout={1000 * 5} onIdle={onIdle} />
      <Modal open={modalIsOpen} className={classes.modal}>
        <h2>You've been idle for a while!</h2>
        <p>You will be logged out soon</p>
        <div>
          <button onClick={logOut}>Log me out</button>
          <button onClick={stayActive}>Keep me signed in</button>
        </div>
      </Modal>
    </div>
  );
}

export default IdleTimerContainer;
