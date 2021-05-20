import React, { useState } from 'react';
import { Header, VotingForm, EmojiPicker } from '../../common';
import { Row, Col } from 'antd';

const RenderVotingPage = props => {
  const [subEmojis1, setSubEmojis1] = useState('');
  const [subEmojis2, setSubEmojis2] = useState('');

  return (
    <>
      <Header title="VOTE FOR YOUR FAVORITE STORY" displayMenu={true} />
    </>
  );
};
