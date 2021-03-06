import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  TextField,
  withStyles,
} from "@material-ui/core";
import {
  ChevronRight as ChevronRightIcon,
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { getTopics } from "../../../store/actions/topicAction";
import {
  getQuestion,
  getTopicQuestions,
} from "../../../store/actions/questionAction";

const styles = {
  questionContainer: {
    background: "#FB8503",
    color: "#000062 !important",
  },
};

function PickQuestions({ classes }) {
  const dispatch = useDispatch();
  const { topics } = useSelector((state) => state.topics);
  const { topicQuestions } = useSelector((state) => state.questions);
  const [selectedId, setSelectedId] = useState();
  const [search, setSearch] = useState();
  //const topicId = localStorage.getItem('topicId');

  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch]);

  const listen = useCallback(() => {
    window.Echo.channel(`question`).listen(
      ".App\\Events\\ActiveQuestion",
      () => {
        if (selectedId) dispatch(getTopicQuestions(selectedId));
      }
    );
  }, [dispatch, selectedId]);

  useEffect(() => {
    listen();
  }, [listen]);

  const handleTopicQuestion = (topicId) => {
    setSelectedId(topicId);
    dispatch(getTopicQuestions(topicId));
    //localStorage.setItem("topicId", topicId);
  };

  const handleQuestion = (questionId) => {
    dispatch(getQuestion(questionId));
  };

  const handleSearch = (e) => {
    const keyword = Number(e.target.value);
    setSearch(keyword);
  };

  const filteredQuestions =
    topicQuestions &&
    topicQuestions.filter(
      (question) =>
        search && question.question_order === search && question.status === 0
    );

  return (
    <Card className={classes.questionContainer}>
      <CardContent>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Pick Questions
        </Typography>

        {topics.length > 0 ? (
          topics.map(({ id, title }, topicIndex) => (
            <List key={topicIndex}>
              <ListItem
                key={title}
                button
                onClick={() => handleTopicQuestion(id)}
              >
                <ListItemIcon>
                  <ChevronRightIcon />
                </ListItemIcon>
                <ListItemText primary={title} />
                {id === selectedId ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItem>
              <Collapse
                key={selectedId}
                component="li"
                in={id === selectedId}
                timeout="auto"
                unmountOnExit
              >
                <TextField
                  fullWidth
                  type="number"
                  min={1}
                  name="search"
                  placeholder="Search by question no."
                  onKeyUp={handleSearch}
                />

                {search > 0 &&
                  (filteredQuestions.length > 0 ? (
                    filteredQuestions.map(
                      ({ id, question, question_order }, questionIndex) => (
                        <List
                          key={questionIndex}
                          component="div"
                          disablePadding
                        >
                          <ListItem
                            key={question}
                            button
                            onClick={() => handleQuestion(id)}
                          >
                            <ListItemText
                              primary={`Question No.${question_order}`}
                            />
                          </ListItem>
                        </List>
                      )
                    )
                  ) : (
                    <Typography>No questions exists!!</Typography>
                  ))}
              </Collapse>
            </List>
          ))
        ) : (
          <Typography>Please create topics!!</Typography>
        )}
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(PickQuestions);
