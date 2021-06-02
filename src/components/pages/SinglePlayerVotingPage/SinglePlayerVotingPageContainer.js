import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import RenderSinglePlayerVotingPage from './RenderSinglePlayerVotingPage';

const SinglePlayerVotingPageContainer = props => {
  const { push } = useHistory();
  const { authState, authService } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [memoAuthService] = useMemo(() => [authService], []);
  const [votes, setVotes] = useState();

  return (
    <div>
      <RenderSinglePlayerVotingPage />
    </div>
  );
};

export default SinglePlayerVotingPageContainer;
