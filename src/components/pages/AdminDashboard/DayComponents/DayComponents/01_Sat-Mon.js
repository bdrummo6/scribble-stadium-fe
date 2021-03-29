import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { Layout, Button, Radio } from 'antd';

import { date, tasks } from '../../../../../state/actions/index';
import { setAllTasks, getChildTasks } from '../../../../../api/index';
import {
  setHasDrawn,
  setHasRead,
  setHasWritten,
} from '../../../../../state/actions/taskActions';

const { Header, Content, Footer } = Layout;

const SatMon = ({
  setDate,
  hasRead,
  hasDrawn,
  hasWritten,
  submissionID,
  storyId,
  childId,
}) => {
  const { authState } = useOktaAuth();
  const { push } = useHistory();

  const adminDash = () => {
    push('/admin');
  };

  const gameStageUrl = '/child/mission-control';

  const findDayOfWeekReference = 1;

  // const handleSim = () => {
  //   push(`${gameStageUrl}`);
  // };

  const findNextDayOfWeek = selectedDay => {
    let date = new Date();
    let resultDate = new Date(date.getTime());
    resultDate.setDate(
      //.setDate is a JS date function NOT the setDate() action used by Redux
      date.getDate() + ((7 + selectedDay - date.getDay()) % 7)
    );
    return resultDate;
  };

  useEffect(() => {
    setDate(findNextDayOfWeek(findDayOfWeekReference));
  }, [findDayOfWeekReference]);

  const handleGetChildTasks = e => {
    getChildTasks(authState, childId, storyId);
  };

  const handleAllTasks = e => {
    setAllTasks(authState, submissionID, hasRead, hasWritten, hasDrawn);
  };

  const onSimulate = e => {
    if (handleAllTasks() !== []) {
      handleGetChildTasks();
    }
  };

  const completeOneTask = e => {
    setHasRead(true);
    setHasDrawn(false);
    setHasWritten(false);
  };

  const completedTwoTasks = e => {
    setHasRead(true);
    setHasDrawn(true);
    setHasWritten(false);
  };

  const completedAllTasks = e => {
    setHasRead(true);
    setHasDrawn(true);
    setHasWritten(true);
  };

  return (
    <Layout>
      <Header className="ant-page-header">
        <h1>Story Squad</h1>
        <Button onClick={adminDash}>Back to Admin Dashboard</Button>
      </Header>
      <div className="dev-tools-day">
        <h2>Saturday / Sunday / Monday</h2>
        <h3>Game Play Days: 1, 2, and 3</h3>
        <h4>The Reading, Writing, and Drawing Stages</h4>
        <Content>
          <p>
            <b>Saturday:</b> At 11AM every Saturday, the game is reset. A kid
            user reads the excerpt from the story for the week. Only when the
            kid user is finished reading the story for the week they are able to
            proceed to the next stage of the game.
          </p>
          <p>
            <b>Sunday:</b> Kid users are instructed to draw a picture of one
            sentence from the excerpt of the story of the week. When the kid
            user uploads the image, they proceed to the next stage in the game.
          </p>
          <p>
            <b>Monday:</b> Kid users are instructed to write a side quest
            (story) based off of the prompt given in the app. When the kid user
            uploads the image, they proceed to the next stage in the game.
            Monday at 11:59PM is the deadline for submissions. The image of the
            uploaded side quest is translated by a 3rd Party API implemented by
            DS.
          </p>
          <p>Select the game state you would like to see in play:</p>
          <div className="state-buttons">
            <Radio.Group>
              <Radio className="radio-buttons" onClick={completeOneTask}>
                User has read
              </Radio>
              <Radio className="radio-buttons" onClick={completedTwoTasks}>
                User has read and drawn
              </Radio>
              <Radio className="radio-buttons" onClick={completedAllTasks}>
                User has read, drawn, and written
              </Radio>
            </Radio.Group>
            <Button
              className="simulate-button"
              onClick={onSimulate}
              disabled={gameStageUrl == null}
            >
              Simulate Game Play
            </Button>
          </div>
        </Content>
      </div>
      <Footer></Footer>
    </Layout>
  );
};

export default connect(
  state => ({
    date: state.date,
    tasks: state.tasks,
    childId: state.tasks.child_id,
    storyId: state.tasks.story_id,
    hasRead: state.tasks.hasRead,
    hasDrawn: state.tasks.hasDrawn,
    hasWritten: state.tasks.hasWritten,
    submissionID: state.tasks.id,
  }),
  {
    setDate: date.setDate,
    setTasks: tasks.setTasks,
    setHasRead: tasks.setHasRead,
    setHasWritten: tasks.setHasWritten,
    setHasDrawn: tasks.setHasDrawn,
  }
)(SatMon);
