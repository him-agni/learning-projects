import React from "react";

const Video = () => {
  return (
    <div className="h-full w-full">
      <video
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        src="https://download-video-ak.vimeocdn.com/v3-1/playback/36bc59b8-6671-4358-abc2-15555fc6ae59/69496b2d?__token__=st=1767200897~exp=1767204497~acl=%2Fv3-1%2Fplayback%2F36bc59b8-6671-4358-abc2-15555fc6ae59%2F69496b2d%2A~hmac=59889bf9c0e2aa2e5a80544a1c0f8f17c2c5435564aec1ccde81c3cc7fe0851b&r=dXMtZWFzdDE%3D"
      />
    </div>
  );
};

export default Video;
