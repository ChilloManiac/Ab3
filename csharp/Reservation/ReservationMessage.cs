using System;

// ReSharper disable InconsistentNaming

namespace Reservation
{
    [Serializable]
    public class ReservationMessage
    {
        public string hotelName { get; private set; }
        public string roomNumber { get; private set; }

        public ReservationMessage(string hotelName, string roomNumber)
        {
            this.hotelName = hotelName;
            this.roomNumber = roomNumber;
        }
    }
}