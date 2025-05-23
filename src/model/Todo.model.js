import Joi from "joi";

const TodoModel = Joi.object({
  title: Joi.string().required(true),
  description: Joi.string().required(true),
  completed: Joi.boolean().optional().default(false),
});

export { TodoModel };

