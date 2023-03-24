import Joi from 'joi';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const schema = Joi.object({
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number()
    .min(1886)
    .max(new Date().getFullYear() + 1),
  miles: Joi.number().min(0),
  city: Joi.string().min(2).required(),
  numberOfSeats: Joi.number().min(1).max(1000),
  features: Joi.array().items(Joi.string()).required(),
  image: Joi.string().required(),
  listerId: Joi.string().required(),
  price: Joi.number().min(0),
  name: Joi.string().required(),
  description: Joi.string().min(20).required(),
});

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { value, error } = schema.validate(body);

  if (error) {
    throw createError({
      statusCode: 412,
      statusMessage: error.message,
    });
  }

  const {
    image,
    name,
    numberOfSeats,
    miles,
    price,
    features,
    description,
    listerId,
    city,
    make,
    model,
  } = value;

  const car = await prisma.car.create({
    data: {
      image,
      name,
      numberOfSeats,
      miles,
      price,
      features,
      description,
      listerId,
      city: city.toLowerCase(),
      make,
      model,
    },
  });

  return car;
});
