'use strict'
const amqp = require('amqplib/callback_api');
const roomService = require("../routes/room/room.service");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
const RESERVATIONS_QUEUE = 'reservations'
const CONFIRMATIONS_QUEUE = 'confirmations'

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to " + process.env.DB_CONNECT);
});

mongoose.connection.on("error", function (err) {
  console.log(err);
});

amqp.connect('amqp://localhost', (err, conn) => {
  if (err)
    throw err

  conn.createChannel((err, channel) => {
    if (err)
      throw err

    const resConfig = {
      durable: false,
    }
    const confConfig = {
      durable: false
    }
    setupQueue(channel, RESERVATIONS_QUEUE, resConfig);
    setupQueue(channel, CONFIRMATIONS_QUEUE, confConfig);
    channel.consume(RESERVATIONS_QUEUE, handleReservation(channel))
  })
})


const setupQueue = (channel, queue, config) => {
  channel.assertQueue(queue, config, (err, _) => {
    if (err)
      throw err
  });
  channel.prefetch(1);
  console.log(`Connected to queue: ${queue}`);
}

const handleReservation = (channel) => async (msg) => {
  const {hotelName, roomNumber} = JSON.parse(msg.content.toString())
  let success;
  try {
    await roomService.reserveRoom(hotelName, roomNumber);
    success = true
  } catch (e) {
    console.log(e)
    success = false
  }
  const response = {
    roomNumber,
    hotelName,
    success
  }
  console.log(response)
  channel.sendToQueue(CONFIRMATIONS_QUEUE, Buffer.from(JSON.stringify(response)));
}


