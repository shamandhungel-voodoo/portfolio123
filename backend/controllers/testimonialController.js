import Testimonial from '../models/Testimonial.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find().sort({
    featured: -1,
    createdAt: -1,
  });

  res.json(testimonials);
});

// @desc    Create a testimonial
// @route   POST /api/testimonials
// @access  Private
export const createTestimonial = asyncHandler(async (req, res) => {
  const {
    name,
    role,
    company,
    content,
    avatar,
    rating,
    featured,
  } = req.body;

  const testimonial = await Testimonial.create({
    name,
    role,
    company,
    content,
    avatar,
    rating: rating ?? 5,
    featured: featured ?? false,
  });

  res.status(201).json(testimonial);
});

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private
export const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }

  const updatedTestimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json(updatedTestimonial);
});

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    res.status(404);
    throw new Error('Testimonial not found');
  }

  await testimonial.deleteOne();
  res.json({ message: 'Testimonial removed' });
});
