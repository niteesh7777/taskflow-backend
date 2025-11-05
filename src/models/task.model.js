import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Task title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title must be less than 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description can't exceed 500 characters"],
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    dueDate: {
      type: Date,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Task must belong to a user'],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

taskSchema.index({ createdBy: 1 });
taskSchema.index({ status: 1, priority: 1 });

taskSchema.pre(/^find/, function (next) {
  if (!this.getFilter().includeDeleted) {
    this.where({ deleted: false });
  }
  next();
});

const Task = mongoose.model('Task', taskSchema);
export default Task;
