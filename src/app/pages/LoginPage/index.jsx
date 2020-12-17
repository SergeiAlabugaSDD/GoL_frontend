import React, { useState } from 'react';
import { Motion, spring, presets } from 'react-motion';

import { Link } from 'react-router-dom';

// components
import { BGvideo, Logo, Button } from '../../components';

// styles
import './styles.css';

// components
import { LoginForm } from '../../bus/login';
import { RegistrationForm } from '../../bus/registration';

// background video
import videoSource from '../../assets/video/bg_video.mp4';

export const LoginPage = () => {
  const [displayReg, setDisplayReg] = useState(false);

  const regDisplayHandle = () => {
    setDisplayReg(true);
  };

  const loginDisplayHandle = () => {
    setDisplayReg(false);
  };

  return (
    <>
      <div className="content_wrapper">
        <div className="form_wrapper flex d_column relative">
          <Logo title="Game of Life" />
          {displayReg ? (
            <div>
              <Motion
                defaultStyle={{ x: -100 }}
                style={{
                  x: spring(0, presets.stiff),
                }}
              >
                {(value) => (
                  <div style={{ transform: `translateX(${value.x}px)` }}>
                    <div className="flex d_column">
                      <RegistrationForm />
                      <Button
                        type="button"
                        className="button_primary"
                        onClick={loginDisplayHandle}
                      >
                        back
                      </Button>
                    </div>
                  </div>
                )}
              </Motion>
            </div>
          ) : (
            <Motion
              defaultStyle={{ y: -100 }}
              style={{
                y: spring(0, presets.wobbly),
              }}
            >
              {(value) => {
                return (
                  <div
                    style={{ transform: `translateX(${value.y}px)` }}
                    className="flex d_column"
                  >
                    <LoginForm />
                    <Button
                      className="button_primary"
                      type="button"
                      onClick={regDisplayHandle}
                    >
                      registration
                    </Button>
                  </div>
                );
              }}
            </Motion>
          )}

          <span className="or_insert">or</span>
          <Link className="button_primary" to="/game">
            Try it Now!
          </Link>
        </div>
      </div>
      <BGvideo source={videoSource} />
    </>
  );
};
