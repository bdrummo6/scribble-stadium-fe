import React, { useState, useEffect } from 'react';
import { getGallerySubmissionsById, getPrompt } from '../../../api/index';
import { connect } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { arrow_down } from '../../../assets/icons/arrow_down.svg';

const WeeklySubmissions = props => {
  const { authState } = useOktaAuth();
  const [data, setDataInfo] = useState([
    {
      WritingUrl: '',
      DrawingUrl: '',
      children_id: 0,
    },
  ]);

  const [promptData, setPromptData] = useState({
    drawingPrompt: '',
    writingPrompt: '',
  });

  //fetching the response from the axios call, and setting it to state
  useEffect(() => {
    getGallerySubmissionsById(authState).then(res => {
      setDataInfo(res);
      console.log('this is res: ', res);
    });

    getPrompt().then(res => {
      setPromptData(res);
      console.log('this is prompt data: ', res);
    });
  }, [authState]);

  console.log('this is data: ', data);

  data.map(item => {});

  return (
    <>
      <div className="weekly-sub-container">
        <h3 className="h3">Week {data[0].ID}</h3>

        <span className="submissions">
          <div className="sub-container">
            <div className="frame">
              <img className="gallery-submission" src={data[0].DrawingUrl} />
            </div>

            <div className="prompt">
              <span>
                <h5>Prompt</h5>
                <img scr={arrow_down} />
              </span>
              <h4>prompt description</h4>
            </div>
          </div>

          <div className="sub-container">
            <div className="frame">
              <img className="gallery-submission" src={data[0].WritingUrl} />
            </div>
            <div className="prompt">
              <h5>Prompt</h5>
              <h4>prompt description</h4>
            </div>
          </div>
        </span>
      </div>
    </>
  );
};

export default connect(state => ({
  child: state.child,
}))(WeeklySubmissions);
