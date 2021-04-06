using System;
using System.Text;
using System.Text.Json.Serialization;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

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
                    var confirmation = JsonConvert.DeserializeObject<IConformation>(message);
                    var status = confirmation.success ? "succeded" : "failed";
                    Console.WriteLine("Reserving room {0} in {1} {2}",confirmation.roomNumber, confirmation.hotelName, status);
                };
                channel.BasicConsume(queue: CONFIRMATIONS_Q,
                    autoAck: true,
                    consumer: consumer);
            }
        }
    }
}
