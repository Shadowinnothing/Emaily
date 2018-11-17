import React from 'react';

import Youtube from 'react-youtube';

const NotFoundPage = () => {

  const options = {
    height: '400',
    width: '700',
    playerVars: {
      autoplay: 1
    }
  };

  return (
    <div style={{
        textAlign: 'center',
        margin: '0 auto'
    }}>
      <h2>404! Page Not Found!</h2>
      <Youtube
        videoId={'ZJCO8ruxXuU'}
        opts={options}
      />
    </div>
  );
};

export default NotFoundPage;
