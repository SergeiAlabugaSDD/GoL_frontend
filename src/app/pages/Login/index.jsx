import { BGvideo } from '../../components';

// styles
import './styles.css';

// components
import { LoginForm } from '../../bus/login';

// background video
import videoSource from '../../assets/video/bg_video.mp4';

export const Login = () => {
  return (
    <>
      <div className="content_wrapper">
        <LoginForm />
      </div>
      <BGvideo source={videoSource} />
    </>
  );
};
