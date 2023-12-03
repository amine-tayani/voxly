import Question from "../models/Question";

const findById = async (id: string) => {
  const question = await Question.findById(id);
  return question;
};

const getAll = async () => {
  const questions = await Question.find({});
  return questions;
};

const getNearBy = async (longitude: string, latitude: string) => {
  const questions = await Question.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        $maxDistance: 5000,
      },
    },
  });
  return questions;
};

const QuestionService = {
  findById,
  getAll,
  getNearBy,
};

export default QuestionService;
