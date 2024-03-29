import mongoose from 'mongoose'


const Schema = mongoose.Schema


const ticketSchema = new Schema({
  seat: {type: String, match: /[A-F][1-9]\d?/}
,
  price: {
  type: Number,
  min: 0,
  }
})


const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', '']
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 999,
  },
  departs: {
    type: Date,
    default: () => {
      const today = new Date()
      return new Date(today.setFullYear(today.getFullYear() + 1))
    }
  },
  tickets: [ticketSchema],
  menu: [{type: Schema.Types.ObjectId, ref: 'Meal'}]
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}

