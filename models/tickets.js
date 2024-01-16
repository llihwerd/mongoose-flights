import mongoose from "mongoose"

const Schema = mongoose.Schema


const ticketSchema = new Schema({
  seat: {type: String, match: /[A-F][1-9]\d?/}
,
  price: {
  type: Number,
  min: 10,
  max: 999,
}
},{
  timestamps: true
}
)

const Performer = mongoose.model('Performer', performerSchema)

export {
  Performer
}