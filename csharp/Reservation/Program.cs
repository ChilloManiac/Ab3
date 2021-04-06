using System;
using System.Text;
using System.Text.Json;
using RabbitMQ.Client;

namespace Reservation
{
    class Program
    {
        private static string welcome_message = "------------------------" + "\n" +
                                                "Johns Reservation System" + "\n" +
                                                "Enter one of the following commands:" +
                                                "\n" + "    'q': Quite" + "\n" + "    'n': New Reservation" + "\n";

        static void Main(string[] args)
        {
            var factory = new ConnectionFactory() {HostName = "localhost"};
            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    var terminate = false;
                    while (!terminate)
                    {
                        Console.Write(welcome_message);
                        var input = Console.ReadLine();
                        switch (input)
                        {
                            case "n":
                            {
                                Console.WriteLine("Creating new reservation...");
                                Console.WriteLine("Enter a hotel name:");
                                var hotelName = Console.ReadLine();
                                Console.WriteLine("Enter a room number");
                                var roomNumber = Console.ReadLine();
                                SendMessage(channel, new ReservationMessage(hotelName, roomNumber));

                                break;
                            }
                            case "q":
                            {
                                Console.WriteLine("Terminating...");
                                terminate = true;
                                break;
                            }
                            default:
                            {
                                Console.WriteLine("Unknown command. Try again.");
                                break;
                            }
                        }
                    }
                }
            }
        }

        private static void SendMessage(IModel channel, ReservationMessage reservationMessage)
        {
            channel.QueueDeclare(queue: "reservations",
                durable: false,
                exclusive: false,
                autoDelete: false,
                arguments: null);
            var message = JsonSerializer.Serialize(reservationMessage);
            var body = Encoding.UTF8.GetBytes(message);
            channel.BasicPublish(exchange: "",
                routingKey: "reservation",
                basicProperties: null,
                body: body);
            Console.WriteLine("Sent {0}", message);
        }
    }
}