using System;
using System.Text;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text.Json.Serialization;
using System.Text.Json;


namespace confirmation_consumer
{
    class Program
    {
        private const string CONFIRMATIONS_Q = "confirmations";
        static void Main(string[] args)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };
            using var connection = factory.CreateConnection();
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: CONFIRMATIONS_Q,
                    durable: false,
                    exclusive: false,
                    autoDelete: false,
                    arguments: null);
                var consumer = new EventingBasicConsumer(channel);
                consumer.Received += (model, ea) =>
                {
                    var message = Encoding.UTF8.GetString(ea.Body.ToArray());
                    Confirmation confirmation = null;
                    try
                    {
                        confirmation = JsonSerializer.Deserialize<Confirmation>(message);
                    }
                    catch (System.Exception e)
                    {
                    Console.WriteLine(e.Message);
                    }
                    Console.WriteLine(confirmation.success);
                    var status = confirmation.success ? "succeded" : "failed";
                    Console.WriteLine("Reserving room {0} in {1} {2}", confirmation.roomNumber, confirmation.hotelName, status);
                };
                channel.BasicConsume(queue: CONFIRMATIONS_Q,
                    autoAck: true,
                    consumer: consumer);
                while (true)
                {
                }
            }
        }
    }
}
