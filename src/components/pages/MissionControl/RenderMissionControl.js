import React, { useEffect } from 'react';
import { Header } from '../../common';
import { Row, Col } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import draw_icon from '../../../assets/icons/draw_icon.svg';
import read_icon from '../../../assets/icons/read_icon.svg';
import write_icon from '../../../assets/icons/write_icon.svg';
import Checkbox from './Checkbox';

import { useOktaAuth } from '@okta/okta-react/dist/OktaContext';
import { getChildTasks } from '../../../api';
import { tasks } from '../../../state/actions';

const RenderMissionControl = props => {
  console.log(props);
  const { push } = useHistory();
  const { authState } = useOktaAuth();

  const readCompleted = true;
  const writeCompleted = false;
  const drawCompleted = false;

  useEffect(() => {
    getChildTasks(authState, props.child.id, 10).then(res => {
      console.log(res);
    });
  });

  // Will be for when we are checking whether or not the child has completed a task
  function handleChecked(e) {
    return `checked=${e.target.checked}`;
  }

  // redirects the user to the pdf of the story
  const handleReadStory = e => {
    e.stopPropagation();
    push('/child/story');
  };

  return (
    <>
      <Header />
      <div className="mission-container">
        <Row className="main-row">
          <Col className="read" span={12} onClick={handleReadStory}>
            <Checkbox
              className="checking-box"
              defaultChecked={false}
              onChange={handleChecked}
              isCompleted={readCompleted}
            />

            <Col className="image-and-text-container">
              <img src={read_icon} alt="reading icon" />
              <p className="mission-control-text">Read</p>
            </Col>
          </Col>
          <Col className="write-and-draw" span={12}>
            <Row className="write">
              <Checkbox
                className="checking-box"
                defaultChecked={false}
                onChange={handleChecked}
                isCompleted={writeCompleted}
              />

              <Col className="image-and-text-container">
                <img src={write_icon} alt="writing icon" />
                <p className="mission-control-text">Write</p>
              </Col>
            </Row>
            <Row className="draw">
              <Checkbox
                className="checking-box"
                defaultChecked={false}
                onChange={handleChecked}
                isCompleted={drawCompleted}
              />
              <Col className="image-and-text-container">
                <img src={draw_icon} alt="drawing icon" />
                <p className="mission-control-text">Draw</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default connect(
  state => ({
    child: state.child,
    setTasks: tasks.setTasks,
  }),
  {}
)(RenderMissionControl);
