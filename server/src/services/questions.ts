import Question from "../models/Question";

const findById = async (id: string) => {
  const question = await Question.findById(id);
  return question;
};

const getAll = async () => {
  const questions = await Question.find({});
  return questions;
};

const getNearBy = async (longitude: number, latitude: number) => {
  const questions = await Question.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
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
