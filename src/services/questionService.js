import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const getQuestionTopics = async () => {
  const res = await axios.get(`${apiUrl}/admin/questions/topics`);
  return res;
};

const getAllQuestions = async () => {
  const res = await axios.get(`${apiUrl}/admin/questions`);

  return res;
};

const getQuestions = async (topicId) => {
  const res = await axios.get(`${apiUrl}/admin/questions/topics/${topicId}`);

  return res;
};

const getActiveQuestion = async () => {
  const res = await axios.get(`${apiUrl}/questions/active`);

  return res;
};

const getQuestion = async (questionId) => {
  const res = await axios.get(`${apiUrl}/admin/questions/${questionId}`);

  return res;
};

const createQuestion = async (topicId, request) => {
  const res = await axios.post(
    `${apiUrl}/admin/questions/topics/${topicId}`,
    request
  );

  return res;
};

const importQuestion = async (topicId, request) => {
  const res = await axios.post(
    `${apiUrl}/admin/questions/import/${topicId}`,
    request
  );

  return res;
};

const updateQuestion = async (questionId, request) => {
  const res = await axios.put(
    `${apiUrl}/admin/questions/${questionId}`,
    request
  );

  return res;
};

const updateQuestionStatus = async (questionId) => {
  const res = await axios.put(
    `${apiUrl}/admin/questions/${questionId}/updateStatus`
  );

  return res;
};

const deleteQuestion = async (questionId) => {
  const res = await axios.delete(`${apiUrl}/admin/questions/${questionId}`);
  return res;
};

export const questionService = {
  getQuestionTopics,
  getQuestions,
  getAllQuestions,
  getActiveQuestion,
  getQuestion,
  createQuestion,
  importQuestion,
  updateQuestion,
  updateQuestionStatus,
  deleteQuestion,
};
