import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const crimeSchema = new Schema(
	{
		id: { type: String, required: true },
		len: { type: Number, required: true },
		data: { type: Array, required: true },
	},
	{ versionKey: false },
);

const Crime = mongoose.model('Crime', crimeSchema);

export default Crime;
