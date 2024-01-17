import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req, res) {
  let flightData = req.body
  // If departs is empty or an invalid date, delete it from flightData
  if (!flightData.departs || isNaN(Date.parse(flightData.departs))) {
    delete flightData.departs
  }
  Flight.create(flightData)
  .then(() => {
    res.redirect('/flights');
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}



function edit(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    let formattedDate = flight.departs.toISOString().split('T')[0]
    res.render('flights/edit', {
      flight: flight,
      departsDate: formattedDate,
      title: 'Edit Flight'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}




function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


function show(req, res) {
  Flight.findById(req.params.flightId)
  .populate('menu')
  .then(flight => {
    Meal.find({_id: {$nin: flight.menu}})
    .then(meals => {
      res.render('flights/show', {
        flight: flight,
        title: 'Flight Detail',
        meals: meals
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}


// function show(req, res) {
//   Movie.findById(req.params.movieId)
//   .populate('cast')
//   .then(movie => {
//     Performer.find({_id: {$nin: movie.cast}})
//     .then(performers => {
//       res.render('movies/show', {
//         movie: movie,
//         title: 'Movie Detail',
//         performers: performers
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.redirect('/')
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/')
//   })
// }




function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.flightId)
  .then(flight => {
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}



function update(req, res) {
  let flightData = req.body
  // If departs is empty or an invalid date, delete it from flightData
  if (!flightData.departs || isNaN(Date.parse(flightData.departs))) {
    delete flightData.departs
  }
  Flight.findByIdAndUpdate(req.params.flightId, flightData, { new: true })
  .then(flight => {
    res.redirect(`/flights/${flight._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}



function createTicket(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.tickets.push(req.body)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}



function addToMenu(req, res) {
  Flight.findById(req.params.flightId)
  .then(flight => {
    flight.menu.push(req.body.mealId)
    flight.save()
    .then(() => {
      res.redirect(`/flights/${flight._id}`)
    })
    .catch(err => {
      console.log(err)
      res.redirect('/flights')
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}




export {
  newFlight as new,
  create,
  index,
  show,
  deleteFlight as delete,
  edit,
  update,
  createTicket,
  addToMenu
}



// let flightData = req.body
// // If departs is empty or an invalid date, delete it from flightData
// if (!flightData.departs || isNaN(Date.parse(flightData.departs))) {
//   delete flightData.departs
// }
// Flight.findByIdAndUpdate(req.params.flightId, flightData, { new: true })